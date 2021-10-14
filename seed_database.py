"""Seeds the database with users, electric vehicles, charging stations, reviews."""

import os, json
from random import choice, randint
from datetime import datetime
import crud, model, server
from faker import Faker

os.system('dropdb evchargers')
os.system('createdb evchargers')

model.connect_to_db(server.app)
model.db.create_all()

fake = Faker()



# Load charging level data from JSON file
with open('data/charging-level.json') as f:
    charging_level_data = json.loads(f.read())

# create users
# user_db = []
# for i in range(10):
#     fname = fake.first_name()
#     lname = fake.last_name()
#     email = fake.email()
#     password = "password123"
#     ev_id = i
#     new_user = crud.create_user(fname, lname, email, password, ev_id)
#     user_db.append(new_user)

# create EVs from json
    # Load ev data from JSON file
with open('data/ev.json') as f:
    data = json.loads(f.read())
    ev_data = data[result]

ev_db = []
for ev in ev_data:
    model = ev[model]
    print(model)
    model_year = ev[model_year]
    print(model_year)


