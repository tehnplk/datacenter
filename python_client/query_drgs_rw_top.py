import json
import os
import psycopg2

SQL = """
SELECT
  id,
  payload->>'hoscode' AS hoscode,
  elem->>'drgs_code'  AS drgs_code,
  elem->>'adj_rw'     AS adj_rw,
  payload->>'send_at' AS send_at
FROM public.raw_data
     CROSS JOIN LATERAL jsonb_array_elements((payload->'data')::jsonb) AS elem
WHERE payload->>'schema' = 'drgs_rw_top'
  AND elem->>'drgs_code' = '0300'
ORDER BY payload->>'hoscode';
"""


def get_conn_kwargs():
    return {
        "host": os.getenv("ONEHOS_DB_HOST", "localhost"),
        "port": int(os.getenv("ONEHOS_DB_PORT", "5433")),
        "dbname": os.getenv("ONEHOS_DB_NAME", "onehos"),
        "user": os.getenv("ONEHOS_DB_USER", "admin"),
        "password": os.getenv("ONEHOS_DB_PASSWORD", "112233"),
    }


def main() -> int:
    conn = psycopg2.connect(**get_conn_kwargs())
    try:
        with conn.cursor() as cur:
            cur.execute(SQL)
            cols = [c[0] for c in cur.description]
            rows = [dict(zip(cols, r)) for r in cur.fetchall()]
    finally:
        conn.close()

    print(json.dumps(rows, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
