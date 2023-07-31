import json
import pymongo
from dotenv import load_dotenv
import os

load_dotenv()
MongoUrl = os.getenv("MONGO_URl")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv('COLLECTION_NAME')
# print(MongoUrl)

client = pymongo.MongoClient(MongoUrl)
# print(client)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# Read the JSON data from the file
with open('./bse_announcements_data.json', 'r') as json_file:
    json_data_list = json.load(json_file)
    
# print(type(json_data_list))
collection.insert_many(list(json_data_list))    