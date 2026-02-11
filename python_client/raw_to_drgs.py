import argparse
import os
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Dict, List, Optional

import psycopg2
from psycopg2 import sql
from psycopg2.extras import RealDictCursor


@dataclass
class RawRecord:
    id: str
    hoscode: str
    year: int
    month: int
    cases: int
    rw: float
    cmi: float
    tranform_datetime: Optional[datetime]
    updated_at: datetime


@dataclass
class InsertResult:
    processed: int = 0
    inserted: int = 0
    skipped_missing_hospital: int = 0


def build_connection_kwargs() -> Dict[str, Any]:
    return {
        "host": os.getenv("ONEHOS_DB_HOST", "localhost"),
        "port": int(os.getenv("ONEHOS_DB_PORT", "5433")),
        "dbname": os.getenv("ONEHOS_DB_NAME", "onehos"),
        "user": os.getenv("ONEHOS_DB_USER", "admin"),
        "password": os.getenv("ONEHOS_DB_PASSWORD", "112233"),
    }


def fetch_hospital_map(conn) -> Dict[str, str]:
    with conn.cursor() as cur:
        cur.execute("SELECT hoscode, hosname FROM c_hospital")
        return {row[0]: row[1] for row in cur.fetchall()}


def fetch_raw_records(
    conn,
    *,
    year: Optional[int],
    month: Optional[int],
    limit: Optional[int],
) -> List[RawRecord]:
    # Only transfer payloads already marked for the DRGs target table
    conditions = ["payload->>'target_table' = 'drgs'"]
    params: List[Any] = []

    if year is not None:
        conditions.append("(payload->>'year')::int = %s")
        params.append(year)
    if month is not None:
        conditions.append("(payload->>'mon')::int = %s")
        params.append(month)

    where_clause = " WHERE " + " AND ".join(conditions)
    limit_clause = " LIMIT %s" if limit is not None else ""
    if limit is not None:
        params.append(limit)

    query = f"""
        SELECT
            id,
            payload,
            tranform_datetime,
            updated_at
        FROM raw_data
        {where_clause}
        ORDER BY updated_at DESC
        {limit_clause}
    """

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(query, params)
        rows = cur.fetchall()

    records: List[RawRecord] = []
    for row in rows:
        payload: Dict[str, Any] = row["payload"]
        try:
            record = RawRecord(
                id=row["id"],
                hoscode=str(payload["hoscode"]),
                year=int(payload["year"]),
                month=int(payload["mon"]),
                cases=int(payload.get("case") or payload.get("cases") or 0),
                rw=float(payload.get("rw") or 0),
                cmi=float(payload.get("cmi") or 0),
                tranform_datetime=row["tranform_datetime"],
                updated_at=row["updated_at"],
            )
        except (KeyError, TypeError, ValueError) as exc:
            raise ValueError(f"Invalid payload for raw_data id={row['id']}: {payload}") from exc
        records.append(record)

    return records


def insert_into_drgs(
    conn,
    records: List[RawRecord],
    hospital_map: Dict[str, str],
    *,
    dry_run: bool,
) -> InsertResult:
    result = InsertResult(processed=len(records))

    if not records:
        return result

    with conn.cursor() as cur:
        for record in records:
            hosname = hospital_map.get(record.hoscode)
            if not hosname:
                result.skipped_missing_hospital += 1
                continue

            delete_query = sql.SQL(
                "DELETE FROM drgs WHERE hoscode=%s AND year=%s AND mon=%s"
            )
            cur.execute(delete_query, (record.hoscode, record.year, record.month))

            insert_query = sql.SQL(
                """
                INSERT INTO drgs
                    (hoscode, hosname, year, mon, ipd_case, sum_adjrw, cmi, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """
            )
            cur.execute(
                insert_query,
                (
                    record.hoscode,
                    hosname,
                    record.year,
                    record.month,
                    record.cases,
                    record.rw,
                    record.cmi,
                    record.tranform_datetime or record.updated_at,
                ),
            )
            result.inserted += 1

    if dry_run:
        conn.rollback()
    else:
        conn.commit()

    return result


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Transfer DRG payloads from raw_data into drgs table",
    )
    parser.add_argument(
        "--year",
        type=int,
        default=None,
        help="Only transfer rows for the given Buddhist calendar year",
    )
    parser.add_argument(
        "--month",
        type=int,
        default=None,
        help="Only transfer rows for the given month",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Maximum raw rows to process (omit for all)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Execute reads but skip writing to drgs",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    conn = psycopg2.connect(**build_connection_kwargs())
    try:
        hospital_map = fetch_hospital_map(conn)
        raw_records = fetch_raw_records(
            conn, year=args.year, month=args.month, limit=args.limit
        )
        result = insert_into_drgs(
            conn,
            raw_records,
            hospital_map,
            dry_run=args.dry_run,
        )
    except psycopg2.Error as exc:
        print(f"Database error: {exc}")
        return 1
    finally:
        conn.close()

    verb = "would insert" if args.dry_run else "inserted"
    print(
        f"Processed {result.processed} raw rows, {verb} {result.inserted} records, "
        f"skipped {result.skipped_missing_hospital} due to missing hospital info."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
