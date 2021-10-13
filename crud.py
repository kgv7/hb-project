"""CRUD Operations"""

from model import db, connect_to_db, User, ElectricVehicle, ChargingStation, ChargingStationLevel, Review

def create_user(first_name, last_name, email, password, ev_id):
    """Creates a new user."""

    user = User(first_name=first_name, last_name=last_name, email=email, password=password, ev_id=ev_id)

    db.session.add(user)
    db.session.commit()

    return user

def create_electric_vehicle(make, model, year, ev_range, ev_charging_speed):
    """Creates a new electric vehicle."""

    electric_vehicle = ElectricVehicle(make=make, model=model, year=year, ev_range=ev_range, ev_charging_speed=ev_charging_speed)

    db.session.add(electric_vehicle)
    db.session.commit()

    return electric_vehicle

def create_charging_station(station_name, address, city, state, zip_code, connection_type, access,
                            cost, payment_type, charging_level_id, user_id):
    """Creates a new charging station submitted by a user."""

    charging_station = ChargingStation(station_name=station_name, address=address, city=city, state=state, zip_code=zip_code, 
                                        connection_type=connection_type, access=access, cost=cost, payment_type=payment_type, 
                                        charging_level_id=charging_level_id, user_id=user_id)
    db.session.add(charging_station)
    db.session.commit()

    return charging_station

def create_charging_station_level(charging_level, charging_station_speed, volt):
    """Creates the different levels a charging station can have."""

    charging_station_level = ChargingStationLevel(charging_level=charging_level, charging_station_speed=charging_station_speed, volt=volt)

    db.session.add(charging_station_level)
    db.session.commit()

    return charging_station_level

def create_review(user_id, station_id, rating, review_content):
    """Creates a new review submitted by a user."""

    review = Review(user_id=user_id, station_id=station_id, rating=rating, review_content=review_content)

    db.session.add(review)
    db.session.commit()

    return review

if __name__ == '__main__':
    from server import app
    connect_to_db(app)