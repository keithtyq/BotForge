# connect to mongodb server.

from pymongo import MongoClient
from flask import current_app


def get_mongo_db():
    client = MongoClient(current_app.config["MONGO_URI"])
    return client[current_app.config["MONGO_DB_NAME"]]
