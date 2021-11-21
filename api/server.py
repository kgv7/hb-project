"""Server for project web app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify, send_from_directory)
from model import connect_to_db
import crud, json, requests, os

# JWT for token creation
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from jinja2 import StrictUndefined

app = Flask(__name__, template_folder='../src')
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined
# EVKEY = os.environ['EVCHARGERS']

# for token
app.config["JWT_SECRET_KEY"] = os.environ["JWTKEY"]
documenu = os.environ["MENUKEY"]
google = os.environ["GOOGLE"]
jwt = JWTManager(app)


# @app.route('/')
# def create_homepage():
#     """View homepage."""

#     return render_template('index.html')

# @app.route('/<path>')
# def route(path):
#     """View any path on website"""

#     return render_template('index.html')

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def serve(path):
#     path_dir = os.path.abspath("../build") #path react build
#     if path != "" and os.path.exists(os.path.join(path_dir, path)):
#         return send_from_directory(os.path.join(path_dir), path)
#     else:
#         return send_from_directory(os.path.join(path_dir),'index.html')

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return render_template('index.html')

# @app.errorhandler(404)
# def not_found(e):
#     return render_template('index.html')

@app.route('/api/ev')
def get_ev_data():
    """Get EV data"""

    with open('data/ev.json') as f:
        data = json.loads(f.read())
        ev_data = data["result"]

    return jsonify(ev_data)

@app.route('/api/ev-makes')
def get_ev_makes():
    """List of EV Makes."""

    makes = crud.get_ev_manufacturer()

    return jsonify(makes)

@app.route('/api/<make>')
def get_ev_models(make):
    """List of EV Models based on selected manufacturer."""

    models = crud.get_all_evmodel_by_make(make)

    return jsonify(models)

@app.route('/api/<make>-<model>')
def get_ev_years(make,model):
    """List of years based on selected EV Model."""

    years = crud.get_all_evyear_by_model(make, model)

    return jsonify(years)

@app.route('/api/charging-level')
def get_charging_level():
    """List of charging station levels."""

    with open('data/charging-level.json') as f:
        data = json.loads(f.read())
        charging_station = data["result"]

    return jsonify(charging_station)

@app.route('/api/charging-locations')
def get_charging_location():
    """Grab charging locations from API for Google Maps - only in CA."""

    payload= {
        "api_key": "2Gw1yArMB2Hx0R04ZVTgBSUIU5jvxFfHesv4vV6k",
        "fuel_type": "ELEC",
        "access": "public",
        "state": "CA",
        "zip": "90012"
    }
    res = requests.get('https://developer.nrel.gov/api/alt-fuel-stations/v1.json?', params=payload)

    stations = res.json()

    station_results = stations["fuel_stations"]

    for result in station_results:
        longitude = result["longitude"]
        latitude = result["latitude"]
        # print(longitude, latitude)
    

    # add charging locations from added stations (user inputted)
        # 1. crud operation to get list of ALL stations
    user_stations = crud.get_all_user_charging_stations()
    if user_stations != None:
            # 2a. loop through each station
        for station in user_stations:
            # 2b. put info into Geocode API to get long and lat of each station
            user_station_payload = {
                "address": f'{station.address}, {station.city}, {station.state}',
                "key": google,
            }

            user_station_res = requests.get('https://maps.googleapis.com/maps/api/geocode/json?', params=user_station_payload)
            google_return = user_station_res.json()
            lat = google_return["results"][0]["geometry"]["location"]["lat"]
            lng = google_return["results"][0]["geometry"]["location"]["lng"]
            print(f'this is from geocode api: {lat} {lng}')
        # 3. format into a dictionary
            station_dict = {"access_code":station.access,
                            "station_name":station.station_name,
                            "latitude":lat,
                            "longitude":lng,
                            "street_address":station.address,
                            "city":station.city,
                            "state":station.state,
                            "zip":station.zip_code,
                            "ev_pricing":station.cost,
                            "ev_connector_types":station.connection_type,
            }
        # 4. append into station_results list (list of dictionaries)

            station_results.append(station_dict)
                            # need charging level


    return jsonify(station_results)


@app.route('/api/register', methods=['POST'])
def create_account():
    """Creates account from user input."""

    # pull info from form
    register_form = request.json
    print(register_form)

    first_name = register_form['fname']
    last_name = register_form['lname']
    email = register_form['email']
    password = register_form['password']

    make = register_form['make']
    model = register_form['model']
    year = register_form['year']

    # create user

    ev_id = crud.get_ev_by_id(make, model, year)

    if crud.get_user_by_email(email):
        input("This account already exists")
        return jsonify({"msg": "This account already exists"}), 401

    else:
        user = crud.create_user(first_name, last_name, email, password, ev_id)
        # create a session with the registered user
        access_token = create_access_token(identity=user.user_id)
        input(f"Thank you for registering! You're loggged in! access token: {user}")
        return jsonify(access_token=access_token,
                        user_fname=user.first_name,
                        user_lname=user.last_name,
                        user_ev=user.ev_id)


@app.route('/api/login', methods=['POST'])
def login_user():
    """Login user into account"""

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = crud.get_user_by_email(email)
    # print(user.first_name)

    if user is None:
        return jsonify({"msg": "This email does not have an account"}), 401
    if password != user.password:
        return jsonify({"msg": "Wrong password"})
    else:
        access_token = create_access_token(identity=user.user_id)
        return jsonify(access_token=access_token, 
                        user_fname=user.first_name,
                        user_lname=user.last_name,
                        user_email=user.email,
                        user_id=user.user_id,
                        user_ev=user.ev_id)

@app.route('/api/profile/<ev_id>')
def get_user_ev_details(ev_id):
    """Get logged in user EV details to display on calculator and profile."""

    ev = crud.get_ev_details(ev_id)

    return jsonify(make = ev.make,
                    model = ev.model,
                    range = ev.ev_range,
                    year = ev.year)

@app.route('/api/charging-station')
def get_charging_stations():
    """Get list of charging stations from API"""
    payload = {'api_key': '2Gw1yArMB2Hx0R04ZVTgBSUIU5jvxFfHesv4vV6k',
                'fuel_type': 'ELEC',
                'access': 'public',
                'state': 'CA'
                }

    res = requests.get('https://developer.nrel.gov/api/alt-fuel-stations/v1.json',
                    params=payload)

    charging_stations = res.json()

    return jsonify(charging_stations)

@app.route('/api/restaurants-<lat>&<lon>')
def get_walkable_restaurants(lat,lon):
    """Get list of walkable restaurants from API - found on InfoBox.jsx"""
    # print(f'parameter lat: {lat}')
    # print(f'parameter long: {lon}')

    payload = {'key': documenu,
                'lon': lon,
                'lat': lat,
                'mode': 'walking',
                'minutes': 5,
                'size': 5}

    res = requests.get('https://api.documenu.com/v2/restaurants/distance',
                        params=payload)
  
    restaurant_data = res.json()
    restaurant_list = restaurant_data["data"]

    return jsonify(restaurant_list)

@app.route('/api/create-station-<userid>', methods=['POST'])
def create_station(userid):
    """Create station from user input - found on AddStationPage.jsx."""

    email = request.json.get("email", None)
    station_name = request.json.get("station-name", None)
    street = request.json.get("street", None)
    city = request.json.get("city", None)
    state = request.json.get("state", None)
    zipcode = request.json.get("zip", None)
    connection = request.json.get("connection", None)
    charging_level = request.json.get("level", None)
    access = request.json.get("access", None)
    cost = request.json.get("cost", None)
    payment_type = request.json.get("payment", None)

    print(f'charging_level {charging_level}')

    charging_level_id = crud.get_charging_level_by_id(charging_level)
    
    station = crud.create_charging_station(station_name, street, city, state, zipcode, connection, access,
                            cost, payment_type, charging_level_id, userid)
    
    return jsonify(station_name = station.station_name,
                    station_street = station.address,
                    station_city = station.city,
                    station_state = station.state,
                    station_zip = station.zip_code,
                    station_connection = station.connection_type,
                    station_access = station.access,
                    station_cost = station.cost,
                    station_payment = station.payment_type,
                    charging_level = charging_level,
                    user_id = userid)

@app.route('/api/station-list-<user_id>')
def get_station_list(user_id):
    """Get list of stations created by user to show up on profile page - Profile.jsx."""

    station_list = crud.get_charging_station_by_user(user_id)

    station_dict = {"info": []}

    for station in station_list:
        print(f"station {station}")
        print(f"station.name {station.station_name}")

        station_dict["info"].append((station.station_name.title(), station.address.title(), station.city.title(), station.state.upper(), station.zip_code))

        print(station_dict)

    return jsonify(station_dict)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")

@app.errorhandler(404)
def not_found(_error):
    return render_template("index.html")

if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=5001)

    # port=5001