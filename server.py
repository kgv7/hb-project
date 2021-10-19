"""Server for project web app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db
import crud, json, requests

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

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


@app.route('/register', methods=['POST'])
def create_account():
    """Creates account from user input."""

    # pull info from form
    
    first_name = request.form.get('fname')
    last_name = request.form.get('lname')
    email = request.form.get('email')
    password = request.form.get('password')

    make = request.form.get('make')
    model = request.form.get('model')
    year = request.form.get('year')

    # create user

    ev_id = crud.get_ev_by_id(make, model, year)

    if crud.get_user_by_email(email):
        flash("This account already exists")
    else:
        user = crud.create_user(first_name, last_name, email, password, ev_id)
        flash('Thanks for making an account')

    # create a session with the registered user
    session['logged_user_id'] = user.user_id
    flash(f"Thank you for registering! {session['logged_user_id']}, you're loggged in!")

    return redirect('/')

@app.route('/login', methods=['POST'])
def login_user():
    """Login user into account"""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)
    if user:
        if password == user.password:
            session['logged_user_id'] = user.user_id
            flash(f"{session['logged_user_id']}, you're logged in!")
            return redirect('/')
        else:
            flash("Your password doesn't match our records")
            return redirect('/login')
    else:
        flash('No account with that email')
        return redirect('/login')

@app.route('/api/charging-station')
def get_charging_stations():
    """Get list of charging stations from API"""
    payload = {'api_key': '2Gw1yArMB2Hx0R04ZVTgBSUIU5jvxFfHesv4vV6k',
                'fuel_type': 'ELEC',
                'access': 'public'
                }

    res = requests.get('https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1.json/', 
                    params=payload)

    charging_stations = res.json()

    return jsonify(charging_stations)




##------- Prior to REACT ------##

# @app.route('/find-charger')
# def create_find_charger_page():
#     """View find charger page with map."""

#     return render_template('find-charger.html')

# @app.route('/add-station')
# def create_add_station_page():
#     """View add station page."""

#     return render_template('add-station.html')

# @app.route('/login')
# def create_login_page():
#     """View login page."""

#     return render_template('login.html')


# @app.route('/profile')
# def create_profile_page():
#     """View profile page."""

#     return render_template('profile.html')

# @app.route('/about')
# def create_about_page():
#     """View about page."""

#     return render_template('about.html')

# @app.route('/register')
# def create_register_page():
#     """View register page."""

#     makes = crud.get_ev_manufacturer()
#     # models = crud.get_all_evmodel_by_make(makes)
#     # years = crud.get_all_evyear_by_model(models)

#     return render_template('register.html', makes = makes)


if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)