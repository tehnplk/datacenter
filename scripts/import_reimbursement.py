"""
import_reimbursement.py
เรียก API /reimbursement สำหรับทุก hoscode ใน c_hos ปีงบ 2567, 2568, 2569
แล้ว insert ลงตาราง reimbursement_transactions (ON CONFLICT DO NOTHING)
"""

import json
import subprocess
import sys
import urllib.request
import urllib.error

# --- CONFIG ---
API_URL = "http://61.19.112.242:8000/reimbursement"
API_TOKEN = "v3ry-s3cr3t-jwt-t0k3n"
FIN_YEARS = ["2567", "2568", "2569"]

PGHOST = "localhost"
PGPORT = "5433"  # host port ที่ map จาก docker (ถ้า docker expose 5432 ให้ใส่ 5432)
PGDB = "datacenter"
PGUSER = "admin"
PGPASS = "112233"


def psql(sql: str) -> str:
    """รัน SQL ผ่าน docker exec postgres psql (สำหรับ SELECT)"""
    result = subprocess.run(
        [
            "docker", "exec", "postgres",
            "psql", "-U", PGUSER, "-d", PGDB,
            "-t", "-A",
            "-c", sql,
        ],
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    if result.returncode != 0:
        print("psql error:", result.stderr)
    return result.stdout.strip()


def psql_insert(sql: str) -> int:
    """รัน INSERT SQL แล้วคืนจำนวนแถวที่ insert จริง (0 = conflict/skip)"""
    result = subprocess.run(
        [
            "docker", "exec", "postgres",
            "psql", "-U", PGUSER, "-d", PGDB,
            "-c", sql,
        ],
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    if result.returncode != 0:
        print("psql error:", result.stderr)
        return 0
    for line in result.stdout.splitlines():
        line = line.strip()
        if line.startswith("INSERT"):
            parts = line.split()
            try:
                return int(parts[2])
            except (IndexError, ValueError):
                return 0
    return 0


def call_api(hoscode: str, fin_year: str) -> list | None:
    payload = json.dumps({"hoscode": hoscode, "fin_year": fin_year}).encode()
    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_TOKEN}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        print(f"  HTTP {e.code}: {body[:200]}")
        return None
    except Exception as e:
        print(f"  Error: {e}")
        return None


def insert_rows(rows: list, hoscode: str, fin_year: str) -> tuple[int, int]:
    inserted = 0
    skipped = 0
    for row in rows:
        sql = """
INSERT INTO public.reimbursement_transactions
  (hoscode, fiscal_year, transfer_date, batch_no, ref_doc_no,
   fund_group_descr, fund_descr, efund_desc,
   amount, wait_amount, bond_amount, vat_amount, deduct_amount, total_amount,
   bank_name, budget_source, moph_id, moph_desc, payment_status)
VALUES
  ('{hoscode}', '{fiscal_year}', '{transfer_date}', '{batch_no}', '{ref_doc_no}',
   {fund_group_descr}, {fund_descr}, {efund_desc},
   {amount}, {wait_amount}, {bond_amount}, {vat_amount}, {deduct_amount}, {total_amount},
   {bank_name}, {budget_source}, {moph_id}, {moph_desc}, {payment_status})
ON CONFLICT (hoscode, fiscal_year, transfer_date, batch_no, ref_doc_no,
  COALESCE(fund_group_descr,''), COALESCE(fund_descr,''), COALESCE(efund_desc,''),
  amount, wait_amount, bond_amount, vat_amount, deduct_amount, total_amount,
  COALESCE(bank_name,''), COALESCE(budget_source,''), COALESCE(moph_id,''),
  COALESCE(moph_desc,''), COALESCE(payment_status,'')) DO NOTHING;
""".format(
            hoscode=row.get("hoscode", hoscode).replace("'", "''"),
            fiscal_year=str(row.get("fiscal_year", fin_year)).replace("'", "''"),
            transfer_date=str(row.get("transfer_date", "")).replace("'", "''"),
            batch_no=str(row.get("batch_no", "")).replace("'", "''"),
            ref_doc_no=str(row.get("ref_doc_no", "")).replace("'", "''"),
            fund_group_descr=("'" + str(row.get("fund_group_descr", "")).replace("'", "''") + "'") if row.get("fund_group_descr") is not None else "NULL",
            fund_descr=("'" + str(row.get("fund_descr", "")).replace("'", "''") + "'") if row.get("fund_descr") is not None else "NULL",
            efund_desc=("'" + str(row.get("efund_desc", "")).replace("'", "''") + "'") if row.get("efund_desc") is not None else "NULL",
            amount=row.get("amount", 0) or 0,
            wait_amount=row.get("wait_amount", 0) or 0,
            bond_amount=row.get("bond_amount", 0) or 0,
            vat_amount=row.get("vat_amount", 0) or 0,
            deduct_amount=row.get("deduct_amount", 0) or 0,
            total_amount=row.get("total_amount", 0) or 0,
            bank_name=("'" + str(row.get("bank_name", "")).replace("'", "''") + "'") if row.get("bank_name") is not None else "NULL",
            budget_source=("'" + str(row.get("budget_source", "")).replace("'", "''") + "'") if row.get("budget_source") is not None else "NULL",
            moph_id=("'" + str(row.get("moph_id", "")).replace("'", "''") + "'") if row.get("moph_id") is not None else "NULL",
            moph_desc=("'" + str(row.get("moph_desc", "")).replace("'", "''") + "'") if row.get("moph_desc") is not None else "NULL",
            payment_status=("'" + str(row.get("payment_status", "")).replace("'", "''") + "'") if row.get("payment_status") is not None else "NULL",
        )
        n = psql_insert(sql.strip())
        if n > 0:
            inserted += 1
        else:
            skipped += 1
    return inserted, skipped


def main():
    # ดึง hoscode ทั้งหมดจาก c_hos
    raw = psql("SELECT hoscode FROM public.c_hos ORDER BY hoscode;")
    hoscodes = [h.strip() for h in raw.splitlines() if h.strip()]
    print(f"พบ {len(hoscodes)} รพ.: {hoscodes}")

    total_inserted = 0
    total_skipped = 0
    total_api_err = 0

    for hoscode in hoscodes:
        for fin_year in FIN_YEARS:
            print(f"\n[{hoscode}] ปีงบ {fin_year} - กำลังเรียก API...", end=" ", flush=True)
            rows = call_api(hoscode, fin_year)
            if rows is None:
                print("API ERROR")
                total_api_err += 1
                continue
            if not rows:
                print("ไม่มีข้อมูล")
                continue
            print(f"ได้ {len(rows)} รายการ", end=" → ", flush=True)
            ins, skip = insert_rows(rows, hoscode, fin_year)
            print(f"insert={ins}, skip(ซ้ำ)={skip}")
            total_inserted += ins
            total_skipped += skip

    print("\n" + "="*60)
    print(f"สรุป: insert ใหม่ = {total_inserted} | ซ้ำ(skip) = {total_skipped} | API error = {total_api_err}")

    # ทดสอบ insert ซ้ำ (รัน hoscode แรก ปีแรก อีกรอบ)
    if hoscodes:
        test_hos = hoscodes[0]
        test_year = FIN_YEARS[-1]
        print(f"\n[ทดสอบ duplicate] รัน {test_hos} ปี {test_year} ซ้ำอีกรอบ...")
        rows2 = call_api(test_hos, test_year)
        if rows2:
            ins2, skip2 = insert_rows(rows2, test_hos, test_year)
            print(f"  → insert={ins2}, skip(ซ้ำ)={skip2}")
            if skip2 == len(rows2):
                print("  ✅ Composite key ทำงานถูกต้อง: ข้อมูลซ้ำถูก skip ทั้งหมด")
            else:
                print(f"  ⚠️  มีข้อมูลที่ insert ซ้ำผ่านได้ ({ins2} รายการ)")

    # นับข้อมูลในตาราง
    count = psql("SELECT COUNT(*) FROM public.reimbursement_transactions;")
    print(f"\nจำนวนแถวในตาราง reimbursement_transactions: {count}")


if __name__ == "__main__":
    main()
