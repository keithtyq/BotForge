import psycopg2
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
SEED_PATH = BASE_DIR / "sql" / "seed.sql"


conn = psycopg2.connect(
    os.environ["DATABASE_URL"],
    sslmode="require"
)
cur = conn.cursor()

# Run seed
with open(SEED_PATH, "r", encoding="utf-8") as f:
    cur.execute(f.read())

print("Seed data loaded")

conn.commit()

cur.execute("SELECT * FROM subscription;")
for row in cur.fetchall():
    print(row)
    
cur.execute("SELECT * FROM app_user;")
for row in cur.fetchall():
    print(row)

cur.close()
conn.close()

