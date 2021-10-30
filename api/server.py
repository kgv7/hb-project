"""Server for project web app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db
import crud, json, requests, os

# JWT for token creation
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined
# EVKEY = os.environ['EVCHARGERS']

# for token
app.config["JWT_SECRET_KEY"] = os.environ["JWTKEY"]  # Change this!
jwt = JWTManager(app)

@app.route('/')
def create_homepage():
    """View homepage."""

    return render_template('index.html')

@app.route('/<path>')
def route(path):
    """View any path on website"""

    return render_template('index.html')

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
    }
    res = requests.get('https://developer.nrel.gov/api/alt-fuel-stations/v1.json?', params=payload)

    stations = res.json()

    station_results = stations["fuel_stations"]

    for result in station_results:
        longitude = result["longitude"]
        latitude = result["latitude"]
        # print(longitude, latitude)

    return jsonify(station_results)


@app.route('/register', methods=['POST'])
def create_account():
    """Creates account from user input."""

    # pull info from form
    
    register_form = request.json
    
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
        return redirect('/register')
    else:
        user = crud.create_user(first_name, last_name, email, password, ev_id)
        # create a session with the registered user
        session['logged_user_id'] = user.user_id
        input(f"Thank you for registering! {session['logged_user_id']}, you're loggged in!")
        return redirect('/')

@app.route('/login', methods=['POST'])
def login_user():
    """Login user into account"""

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = crud.get_user_by_email(email)

    if user == None:
        return jsonify({"msg": "Bad username or password"}), 401
    else:
        access_token = create_access_token(identity=user.user_id)
        return jsonify(access_token=access_token)


    # login_form = request.json
    # email = login_form['email']
    # password = login_form['password']


    # user = crud.get_user_by_email(email)
    # if user:
    #     if password == user.password:
    #         session['logged_user_id'] = user.user_id
    #         input(f"{session['logged_user_id']}, you're logged in!")
    #         return redirect('/')
    #     else:
    #         input("Your password doesn't match our records")
    #         return redirect('/login')
    # else:
    #     input('No account with that email')
    #     return redirect('/login')

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



if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=5001)