"""Utility script to POST sample payloads to the onehos raw-data API."""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any, Dict

import requests

DEFAULT_ENDPOINT = os.environ.get(
    "ONEHOS_RAW_DATA_ENDPOINT",
    "http://localhost:3000/api/onehos/raw-data",
)

DEFAULT_PAYLOAD: Dict[str, Any] = {
    "schema": "drgs_sum",
    "hoscode": "11251",
    "year": 2569,
    "mon": 2,
    "data": {"case": 512, "rw": 1.05, "cmi": 0.98},
    "send_at": "2026-02-12T00:09:00Z",
}


def load_payload(path: Path | None) -> Dict[str, Any]:
    if path is None:
        return DEFAULT_PAYLOAD
    try:
        text = path.read_text(encoding="utf-8")
        return json.loads(text)
    except OSError as exc:
        raise RuntimeError(f"Failed to read payload file: {exc}") from exc
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Invalid JSON payload file: {exc}") from exc


def post(endpoint: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    response = requests.post(endpoint, json=payload, timeout=10)
    response.raise_for_status()
    return response.json()


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="POST test payload to raw-data API")
    parser.add_argument(
        "payload",
        nargs="?",
        type=Path,
        help="Path to JSON payload file. Defaults to built-in sample.",
    )
    parser.add_argument(
        "--endpoint",
        default=DEFAULT_ENDPOINT,
        help=f"Target endpoint URL (default: {DEFAULT_ENDPOINT})",
    )
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    args = parse_args(argv)
    try:
        payload = load_payload(args.payload)
        result = post(args.endpoint, payload)
    except requests.HTTPError as exc:
        print(
            f"HTTP error {exc.response.status_code}: {exc.response.text}",
            file=sys.stderr,
        )
        return 2
    except requests.RequestException as exc:
        print(f"Request error: {exc}", file=sys.stderr)
        return 3
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
