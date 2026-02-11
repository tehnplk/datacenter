import argparse
import json
import os
from datetime import datetime
from decimal import Decimal
from typing import Any, Dict, Iterable, List, Optional

import psycopg2


def build_connection_kwargs() -> Dict[str, Any]:
    return {
        "host": os.getenv("ONEHOS_DB_HOST", "localhost"),
        "port": int(os.getenv("ONEHOS_DB_PORT", "5433")),
        "dbname": os.getenv("ONEHOS_DB_NAME", "onehos"),
        "user": os.getenv("ONEHOS_DB_USER", "admin"),
        "password": os.getenv("ONEHOS_DB_PASSWORD", "112233"),
    }


def fetch_raw_data(
    target_table: Optional[str], month: Optional[int], limit: int
) -> List[Dict[str, Any]]:
    conditions: List[str] = []
    params: List[Any] = []

    if target_table:
        conditions.append("payload->>'target_table' = %s")
        params.append(target_table)
    if month is not None:
        conditions.append("(payload->>'mon')::int = %s")
        params.append(month)

    where_clause = ""
    if conditions:
        where_clause = "WHERE " + " AND ".join(conditions)

    query = f"""
        SELECT
            payload->>'hoscode' AS hoscode,
            (payload->>'year')::int AS year,
            (payload->>'mon')::int AS month,
            (payload->>'case')::int AS cases,
            (payload->>'rw')::numeric AS rw,
            (payload->>'cmi')::numeric AS cmi,
            tranform_datetime,
            updated_at
        FROM raw_data
        {where_clause}
        ORDER BY updated_at DESC
        LIMIT %s
    """

    params.append(limit)

    conn = psycopg2.connect(**build_connection_kwargs())
    try:
        with conn.cursor() as cur:
            cur.execute(query, params)
            columns = [desc[0] for desc in cur.description]
            rows = cur.fetchall()
    finally:
        conn.close()

    return [dict(zip(columns, row)) for row in rows]


def format_table(rows: Iterable[Dict[str, Any]]) -> str:
    records = list(rows)
    if not records:
        return "No records found."

    column_order = [
        "hoscode",
        "year",
        "month",
        "cases",
        "rw",
        "cmi",
        "tranform_datetime",
        "updated_at",
    ]

    widths: Dict[str, int] = {}
    for column in column_order:
        values = [record.get(column) for record in records]
        stringified = ["" if value is None else str(value) for value in values]
        widths[column] = max(len(column), *(len(value) for value in stringified))

    def build_border(char: str = "-") -> str:
        parts = ["+" + char * (widths[col] + 2) for col in column_order]
        return "".join(parts) + "+"

    def build_row(values: List[str]) -> str:
        padded = [f" {value.ljust(widths[col])} " for value, col in zip(values, column_order)]
        return "|" + "|".join(padded) + "|"

    header = build_row(column_order)
    border = build_border()
    rows_rendered = []
    for record in records:
        row_values = [
            "" if record.get(column) is None else str(record.get(column))
            for column in column_order
        ]
        rows_rendered.append(build_row(row_values))

    return "\n".join([border, header, border] + rows_rendered + [border])


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Query raw_data records from the onehos database"
    )
    parser.add_argument(
        "--target-table",
        default="drg",
        help="Filter by payload.target_table (default: drg)",
    )
    parser.add_argument(
        "--month",
        type=int,
        default=None,
        help="Filter by payload.mon (1-12). Omit for no filter.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=20,
        help="Number of rows to return (default: 20)",
    )
    parser.add_argument(
        "--pretty",
        action="store_true",
        help="Pretty-print JSON output",
    )
    parser.add_argument(
        "--output",
        choices=["json", "table"],
        default="json",
        help="Output format: json (default) or table",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    try:
        records = fetch_raw_data(args.target_table, args.month, args.limit)
    except psycopg2.Error as exc:
        print(f"Database error: {exc}")
        return 1

    if args.output == "table":
        print(format_table(records))
        return 0

    indent = 2 if args.pretty else None

    def json_default(value: Any):
        if isinstance(value, Decimal):
            return float(value)
        if isinstance(value, datetime):
            return value.isoformat()
        raise TypeError(f"Object of type {type(value).__name__} is not JSON serializable")

    print(
        json.dumps(
            records,
            ensure_ascii=False,
            indent=indent,
            default=json_default,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
