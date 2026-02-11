import json
import random
import requests

ENDPOINT = "http://localhost:3000/api/onehos/raw-data"
HOSCODE_LIST = [
    "10676",
    "11251",
    "11252",
    "11253",
    "11254",
    "11255",
    "11256",
    "11257",
    "11455",
]

results = []
for hoscode in HOSCODE_LIST:
    payload = {
        "hoscode": hoscode,
        "target_table": "drg",
        "year": 2568,
        "mon": 4,
        "case": random.randint(200, 900),
        "rw": round(random.uniform(0.7, 1.5), 2),
        "cmi": round(random.uniform(0.6, 1.6), 2),
    }
    response = requests.post(ENDPOINT, json=payload, timeout=10)
    response.raise_for_status()
    results.append(response.json())

print(json.dumps(results, ensure_ascii=False, indent=2))
