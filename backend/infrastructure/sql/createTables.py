# createTables from schema. Drops all tables and recreates them.

import psycopg2
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
SCHEMA_PATH = BASE_DIR / "schema.sql"

conn = psycopg2.connect(
    os.environ["DATABASE_URL"],
    sslmode="require"
)

cur = conn.cursor()

with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
    cur.execute(f.read())

conn.commit() 

cur.execute("""
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema')
    ORDER BY table_schema, table_name;
""")

tables = cur.fetchall()

print("Tables in database:")
for schema, table in tables:
    print(f"{schema}.{table}")

cur.close()
conn.close()

print("schema.sql executed successfully")
