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

@app.route('/api/charging-locations')
def get_charging_location():
    """Grab charging locations from API for Google Maps - only in CA."""

    payload= {
        "api_key": "2Gw1yArMB2Hx0R04ZVTgBSUIU5jvxFfHesv4vV6k",
        "fuel_type": "ELEC",
        "access": "public",
        "state": "CA",
        # "zip": "90012"
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
            #2c. get # of chargers by level

            # set # of chargers based on user's added charger
            if station.charging_level_id == 1:
                level1 = station.num_chargers
            else:
                level1=0
            if station.charging_level_id == 2:
                level2 = station.num_chargers
            else:
                level2=0
            if station.charging_level_id == 3:
                level3 = station.num_chargers
            else:
                level3=0

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
                            "ev_level1_evse_num":level1,
                            "ev_level2_evse_num":level2,
                            "eev_dc_fast_num":level3,
            }
        # 4. append into station_results list (list of dictionaries)

            station_results.append(station_dict)
                            # need charging level


    return jsonify(station_results)


def create_token(user_id):
    """Create Access Token for Login and Register"""
    access_token = create_access_token(identity=user_id)

    return access_token


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
        # create a token with the registered user
        access_token=create_token(user.user_id)

        return jsonify(access_token=access_token,
                        user_fname=user.first_name,
                        user_lname=user.last_name,
                        user_email=user.email,
                        user_id=user.user_id,
                        user_ev=user.ev_id)


@app.route('/api/login', methods=['POST'])
def login_user():
    """Login user into account"""

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = crud.get_user_by_email(email)

    if user is None:
        return jsonify({"msg": "This email does not have an account"}), 401
    if password != user.password:
        return jsonify({"msg": "Wrong password"})
    else:
        access_token = create_token(user.user_id)
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

    payload = {'key': documenu,
                'lon': lon,
                'lat': lat,
                'mode': 'walking',
                'minutes': 15,
                'size': 5}

    res = requests.get('https://api.documenu.com/v2/restaurants/distance',
                        params=payload)
  
    restaurant_data = res.json()
    restaurant_list = restaurant_data["data"]

    return jsonify(restaurant_list)

@app.route('/api/rest-<rest_id>')
def get_restaurant_by_id(rest_id):
    """Get restaurant details by id."""
    print(f"rest_id {rest_id}")
    
    payload = {'key': documenu}
    
    res = requests.get(f'https://api.documenu.com/v2/restaurant/{rest_id}',
                        params=payload)
    
    print(f"res: {res}")
    restaurant_info = res.json()
    restaurant = restaurant_info["result"]
    print(restaurant)

    return jsonify(restaurant)

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
    num_chargers = request.json.get("num-chargers", None)
    access = request.json.get("access", None)
    cost = request.json.get("cost", None)
    payment_type = request.json.get("payment", None)

    print(f'charging_level {charging_level}')

    charging_level_id = crud.get_charging_level_by_id(charging_level)
    
    station = crud.create_charging_station(station_name, street, city, state, zipcode, connection, access,
                            cost, payment_type, charging_level_id, num_chargers, userid)
    
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
                    num_chargers = num_chargers,
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

@app.route('/api/create-itinerary-<user_id>', methods=['POST'])
def create_itinerary(user_id):
    """Create itinerary from user selections"""

    station_name = request.json.get("station-name", None)
    station_address = request.json.get("street", None)
    station_city = request.json.get("city", None)
    station_state = request.json.get("state", None)
    station_zip = request.json.get("zip", None)
    level_1 = request.json.get("level1", None)
    level_2 = request.json.get("level2", None)
    level_3 = request.json.get("level3", None)
    charge_time = request.json.get("charge_time", None)
    restaurant_name = request.json.get("restaurant-name", None)
    restaurant_address = request.json.get("restaurant_street", None)
    restaurant_city = request.json.get("restaurant_city", None)
    restaurant_state = request.json.get("restaurant_state", None)
    restaurant_zip = request.json.get("restaurant_zip", None)

    itinerary = crud.create_saved_itinerary(station_name, station_address, station_city, station_state, station_zip, level_1, level_2, level_3,
                            charge_time, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip, user_id)

    return jsonify(station_name=station_name, 
                    station_address=station_address, 
                    station_city=station_city,
                    station_state=station_state, 
                    station_zip=station_zip, 
                    level_1=level_1, 
                    level_2=level_2,
                    level_3=level_3, 
                    charge_time=charge_time, 
                    restaurant_name=restaurant_name, 
                    restaurant_address=restaurant_address,
                    restaurant_city=restaurant_city, 
                    restaurant_state=restaurant_state, 
                    restaurant_zip=restaurant_zip, 
                    user_id=user_id)

@app.route('/api/saved-itinerary-<user_id>')
def get_saved_itinerary(user_id):
    """Get list of saved itineraries by user to populate on profile page - Profile.jsx"""

    itinerary_list = crud.get_saved_itinerary_list(user_id)

    itinerary_dict = {"info": []}

    for item in itinerary_list:
        itinerary_dict["info"].append({"station_name":item.station_name, "station_address":item.station_address, "station_city":item.station_city, 
                                        "station_state": item.station_state, "station_zip": item.station_zip, "level_1": item.level_1, 
                                        "level_2": item.level_2, "level_3": item.level_3, "charge_time": item.charge_time, "restaurant_name": item.restaurant_name, 
                                        "restaurant_address": item.restaurant_address, "restaurant_city": item.restaurant_city, "restaurant_state": item.restaurant_state, 
                                        "restaurant_zip": item.restaurant_zip, "user_id": item.user_id, "itinerary_id":item.saved_itinerary_id})


    return jsonify(itinerary_dict)


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