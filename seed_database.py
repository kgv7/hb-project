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
    pulled_data = json.loads(f.read())
    charging_level_data = pulled_data["result"]


charging_level_db = []
for data in charging_level_data:

    charging_level = data["charging_level"]
    charging_station_speed = data["charging_station_speed"]
    volt = data["volt"]
    create_level = crud.create_charging_station_level(charging_level, charging_station_speed, volt)
    charging_level_db.append(create_level)

# create EVs from json
    # Load ev data from JSON file
with open('data/ev.json') as f:
    data = json.loads(f.read())
    ev_data = data["result"]

ev_db = []
for ev in ev_data:
    make = ev["manufacturer_name"]
    model = ev["model"]
    model_year = ev["model_year"]
    ev_range = ev["electric_range"]

    ev_created = crud.create_electric_vehicle(make, model, model_year, ev_range)
    ev_db.append(ev_created)


# create users
user_db = []
for i in range(10):
    fname = fake.first_name()
    lname = fake.last_name()
    email = fake.email()
    password = "password123"
    ev_id = i+1
    new_user = crud.create_user(fname, lname, email, password, ev_id)
    user_db.append(new_user)


