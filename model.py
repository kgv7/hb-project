"""Define data tables"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """Data model for a user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    ev_id = db.Column(db.Integer, db.ForeignKey('electric_vehicles.ev_id'))

    ev = db.relationship('ElectricVehicle', back_populates='user')
    station = db.relationship('ChargingStation' back_populates='user')
    review = db.relationship('Review', back_populates='user')

    def __repr__(self):
        return f"<User user_id={self.user_id} full_name={self.first_name} {self.last_name}>"


class ElectricVehicle(db.Model):
    """Data model for a electric vehicle."""

    __tablename__ = 'electric_vehicles'

    ev_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    make = db.Column(db.String(30), nullable=False)
    model = db.Column(db.String(30), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    ev_range = db.Column(db.Integer, nullable=False)
    ev_charging_speed = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='ev')

    def __repr__(self):
        return f"<ElectricVehicle ev_id={self.ev_id} car={year} {make} {model}>"


class ChargingStation(db.Model):
    """Data model for a charging station."""

    __tablename__ = 'charging_stations'

    station_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    station_name = db.Column(db.String(30), nullable=False)
    address = db.Column(db.String(30), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    connection_type = db.Column(db.String(30), nullable=False)
    access = db.Column(db.String(7), nullable=False)
    cost = db.Column(db.Float)
    payment_type = db.Column(db.String(30))
    charging_level_id = db.Column(db.Integer, db.ForeignKey('charging_station_levels.charging_level_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    user = db.relationship('User', back_populates='station')
    station_level = db.relationship('ChargingStationLevel', back_populates='station')
    review = db.relationship('Review', back_populates='station')
    

    def __repr__(self):
        return f"<ChargingStation station_id={self.ev_id} station_name={self.station_name}>"

class ChargingStationLevel(db.Model):
    """Data model for a charging station levels."""

    __tablename__ = 'charging_station_levels'

    charging_level_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    charging_level = db.Column(db.String(30), nullable=False)
    charging_station_speed = db.Column(db.String(30), nullable=False)
    volt = db.Column(db.String(30), nullable=False)

    station = db.relationship('ChargingStation' back_populates='station_level')

    def __repr__(self):
        return f"<ChargingStationLevel charging_level_id={self.charging_level_id} charging_level={self.charging_level}>"


class Review(db.Model):
    """Data model for a reviews."""

    __tablename__ = 'reviews'

    review_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    station_id = db.Column(db.Integer, db.ForeignKey('charging_stations.station_id'))
    rating = db.Column(db.Integer, nullable=False)
    review_content = db.Column(db.Text)

    user = db.relationship('User', back_populates='review')
    station = db.relationship('ChargingStation' back_populates='review')


    def __repr__(self):
        return f"<Review review_id={self.review_id} rating={self.rating}>"


def connect_to_db(app):
    """Connect the database to our Flask app."""

    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///evchargers"
    app.config["SQLALCHEMY_ECHO"] = False
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    print("Connected to db!")


if __name__ == "__main__":
    from flask import Flask

    app = Flask(__name__)
    connect_to_db(app)