import { NextRequest, NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const hoscode    = sp.get("hoscode")    || undefined;
  const fiscalYear = sp.get("fiscalYear") || undefined;
  const efundDesc  = sp.get("efundDesc")  || undefined;

  const conditions: string[] = [];
  const params: unknown[] = [];
  let idx = 1;

  if (hoscode)    { conditions.push(`rt.hoscode = $${idx++}`);    params.push(hoscode); }
  if (fiscalYear) { conditions.push(`rt.fiscal_year = $${idx++}`); params.push(fiscalYear); }
  if (efundDesc)  { conditions.push(`rt.fund_descr = $${idx++}`);  params.push(efundDesc); }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const rows = await dbQuery<Record<string, unknown>>(
    `SELECT
       rt.hoscode,
       ch.hosname,
       ch.hosname_short,
       rt.fiscal_year,
       rt.transfer_date,
       rt.batch_no,
       rt.ref_doc_no,
       rt.fund_group_descr,
       rt.fund_descr,
       rt.efund_desc,
       rt.amount,
       rt.wait_amount,
       rt.bond_amount,
       rt.vat_amount,
       rt.deduct_amount,
       rt.total_amount,
       rt.bank_name,
       rt.budget_source,
       rt.moph_id,
       rt.moph_desc,
       rt.payment_status
     FROM public.reimbursement_transactions AS rt
     LEFT JOIN public.c_hos AS ch ON ch.hoscode = rt.hoscode
     ${where}
     ORDER BY rt.transfer_date DESC, rt.hoscode`,
    params,
  );

  const exportRows = rows.map((r) => ({
    "รหัส รพ.":    r.hoscode,
    "ชื่อ รพ.":    r.hosname,
    "ชื่อย่อ":     r.hosname_short,
    "ปีงบ":        r.fiscal_year,
    "วันที่โอน":   r.transfer_date,
    "Batch No.":   r.batch_no,
    "Ref Doc No.": r.ref_doc_no,
    "กองทุนกลุ่ม": r.fund_group_descr,
    "กองทุน":      r.fund_descr,
    "กองทุนย่อย":  r.efund_desc,
    "ยอดจัดสรร":   r.amount,
    "ยอดคงค้าง":   r.wait_amount,
    "หลักประกัน":  r.bond_amount,
    "ภาษี":        r.vat_amount,
    "หักออก":      r.deduct_amount,
    "ยอดโอน":      r.total_amount,
    "ธนาคาร":      r.bank_name,
    "แหล่งงบ":     r.budget_source,
    "MOPH ID":     r.moph_id,
    "MOPH Desc":   r.moph_desc,
    "สถานะ":       r.payment_status,
  }));

  const ws = XLSX.utils.json_to_sheet(exportRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reimbursement");
  const arr = XLSX.write(wb, { type: "array", bookType: "xlsx" }) as number[];
  const blob = new Blob([new Uint8Array(arr)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const fname = `reimbursement_${fiscalYear ?? "all"}_${hoscode ?? "all"}.xlsx`;

  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${fname}"`,
    },
  });
}
