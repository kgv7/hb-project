"""CRUD Operations"""

from model import db, connect_to_db, User, ElectricVehicle, ChargingStation, ChargingStationLevel, Review, SavedItinerary
from werkzeug.security import generate_password_hash, check_password_hash


def create_user(first_name, last_name, email, password, ev_id):
    """Creates a new user."""

    hashed_pw = generate_password_hash(password)

    user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_pw, ev_id=ev_id)

    db.session.add(user)
    db.session.commit()

    return user

def get_user_by_email(email):
    """Gets user from database by email address. If not in database, returns None"""

    return User.query.filter_by(email=email).first()

def get_user_by_id(email):
    """Get user ID from database by email"""

    user = User.query.filter_by(email=email).first()

    return user.user_id


def create_electric_vehicle(make, model, year, ev_range):
    """Creates a new electric vehicle."""

    electric_vehicle = ElectricVehicle(make=make, model=model, year=year, ev_range=ev_range)

    db.session.add(electric_vehicle)
    db.session.commit()

    return electric_vehicle

def get_ev_manufacturer():
    """Get list of all EV manufacturer"""
    list_of_manufacturers = []

    ev_data = ElectricVehicle.query.all()

    for ev in ev_data:
        if ev.make not in list_of_manufacturers:
            list_of_manufacturers.append(ev.make)
    
    manufacturers = sorted(list_of_manufacturers)

    return manufacturers

def get_all_evmodel_by_make(make):
    """Get list of all models by manufacturer."""

    make_list = ElectricVehicle.query.filter_by(make=make).all()

    model_list = []
    for model in make_list:
        if model.model not in model_list:
            model_list.append(model.model)

    models = sorted(model_list)

    return models

def get_all_evyear_by_model(make, model):
    """Get list of all years by model."""
    
    make_list = ElectricVehicle.query.filter_by(make=make).all()

    model_list = {}

    for car in make_list:
        if model_list.get(car.model) is None:
            model_list[(car.model)] = [car.year]
        else:
            if car.year not in model_list[car.model]:
                model_list[(car.model)].append(car.year)
    
    print(f'model list: {model_list}')
    print(f'model: {model}')
  
    year_list = model_list[model]

    return year_list

def get_ev_by_id(make, model, year):
    """Get EV by id."""

    get_id = ElectricVehicle.query.filter_by(make=make, model=model, year=year).first()
    print(get_id.ev_id)
    
    return get_id.ev_id

def get_ev_details(ev_id):
    """Use EV ID to get EV details."""

    ev = ElectricVehicle.query.filter_by(ev_id=ev_id).first()
    # ev_details = {"make": ev.make, "model": ev.model, "year": ev.year, "range": ev.range}

    return ev

def create_charging_station(station_name, address, city, state, zip_code, connection_type, access,
                            cost, payment_type, charging_level_id, num_chargers, user_id):
    """Creates a new charging station submitted by a user."""

    charging_station = ChargingStation(station_name=station_name, address=address, city=city, state=state, zip_code=zip_code, 
                                        connection_type=connection_type, access=access, cost=cost, payment_type=payment_type, 
                                        charging_level_id=charging_level_id, num_chargers=num_chargers, user_id=user_id)
    db.session.add(charging_station)
    db.session.commit()

    return charging_station

def get_all_user_charging_stations():
    """Get all charging stations added by users to put onto Google Maps."""

    stations = ChargingStation.query.all()
    return stations

def get_charging_station_by_user(user_id):
    """Creates list of charging stations created by that user."""

    station_list = ChargingStation.query.filter_by(user_id=user_id).all()
    return station_list

def create_charging_station_level(charging_level, charging_station_speed, volt):
    """Creates the different levels a charging station can have."""

    charging_station_level = ChargingStationLevel(charging_level=charging_level, charging_station_speed=charging_station_speed, volt=volt)

    db.session.add(charging_station_level)
    db.session.commit()

    return charging_station_level

def get_charging_level_by_id(charging_level):
    """Get Charging Level ID by Name"""

    charging_id = ChargingStationLevel.query.filter_by(charging_level=charging_level).first()

    return charging_id.charging_level_id


# def create_review(user_id, station_id, rating, review_content):
#     """Creates a new review submitted by a user."""

#     review = Review(user_id=user_id, station_id=station_id, rating=rating, review_content=review_content)

#     db.session.add(review)
#     db.session.commit()

#     return review

def create_saved_itinerary(station_name, station_address, station_city, station_state, station_zip, level_1, level_2, level_3,
                            charge_time, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip, user_id):
    """Creates a saved itinerary based on the user's station choice, charge time, and restaurant pick."""

    saved_itinerary = SavedItinerary(station_name=station_name, station_address=station_address, station_city=station_city,
                                    station_state=station_state, station_zip=station_zip, level_1=level_1, level_2=level_2,
                                    level_3=level_3, charge_time=charge_time, restaurant_name=restaurant_name, restaurant_address=restaurant_address,
                                    restaurant_city=restaurant_city, restaurant_state=restaurant_state, restaurant_zip=restaurant_zip, user_id=user_id)

    db.session.add(saved_itinerary)
    db.session.commit()

    return saved_itinerary

def get_saved_itinerary_list(user_id):
    """Get Saved Intinerary List by User Id."""

    saved_itinerary_list = SavedItinerary.query.filter_by(user_id=user_id).all()

    return saved_itinerary_list 

if __name__ == '__main__':
    from server import app
    connect_to_db(app)