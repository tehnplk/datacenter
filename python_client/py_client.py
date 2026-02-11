import json
import os
import sys
from dataclasses import dataclass
from typing import Any, Dict

import requests

DEFAULT_ENDPOINT = os.environ.get(
    "ONEHOS_RAW_DATA_ENDPOINT",
    "http://localhost:3000/api/onehos/raw-data",
)


@dataclass
class DrgPayload:
    hoscode: str = "111251"
    target_table: str = "drg"
    year: int = 2569
    mon: int = 1
    case: int = 512
    rw: float = 1.01
    cmi: float = 1.02

    def to_dict(self) -> Dict[str, Any]:
        return {
            "hoscode": self.hoscode,
            "target_table": self.target_table,
            "year": self.year,
            "mon": self.mon,
            "case": self.case,
            "rw": self.rw,
            "cmi": self.cmi,
        }


def post_payload(payload: Dict[str, Any], endpoint: str = DEFAULT_ENDPOINT) -> Dict[str, Any]:
    response = requests.post(endpoint, json=payload, timeout=10)
    response.raise_for_status()
    return response.json()


def cli(argv: list[str]) -> int:
    if len(argv) >= 2:
        payload_path = argv[1]
        try:
            with open(payload_path, "r", encoding="utf-8") as f:
                payload = json.load(f)
        except (OSError, json.JSONDecodeError) as exc:
            print(f"Failed to read payload file: {exc}", file=sys.stderr)
            return 1
    else:
        payload = DrgPayload().to_dict()

    endpoint = argv[2] if len(argv) >= 3 else DEFAULT_ENDPOINT

    try:
        data = post_payload(payload, endpoint)
    except requests.HTTPError as exc:
        print(f"HTTP error: {exc.response.status_code} {exc.response.text}", file=sys.stderr)
        return 2
    except requests.RequestException as exc:
        print(f"Request error: {exc}", file=sys.stderr)
        return 3

    print(json.dumps(data, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(cli(sys.argv))
