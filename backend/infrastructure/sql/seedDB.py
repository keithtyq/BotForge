# Runs seed.sql to populate initial data

import psycopg2
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
SEED_PATH = BASE_DIR / "seed.sql"

# Connect to the database using the DATABASE_URL from .env
conn = psycopg2.connect(
    os.environ["DATABASE_URL"],
    sslmode="require"
)

cur = conn.cursor()

# Read and execute seed.sql
with open(SEED_PATH, "r", encoding="utf-8") as f:
    sql = f.read()
    cur.execute(sql)

conn.commit()

# Optional: list tables and number of rows for verification
cur.execute("""
    SELECT table_name, COUNT(*) 
    FROM information_schema.tables t
    LEFT JOIN pg_tables pgt ON t.table_name = pgt.tablename
    WHERE t.table_schema = 'public'
    GROUP BY table_name
""")
# Note: This might return all tables, counts not precise. Better to check manually per table if needed.

print("seed.sql executed successfully")

cur.close()
conn.close()
