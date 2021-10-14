"""Seeds the database with users, electric vehicles, charging stations, reviews, ."""

import os, json
from random import choice, randint
from datetime import datetime
import crud, model, server
from faker import Faker

os.system('dropdb evchargers')
os.system('createdb evchargers')

model.connect_to_db(server.app)
model.db.create_all()


