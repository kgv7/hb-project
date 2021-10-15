"""Server for project web app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect)
from model import connect_to_db
# import crud

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def create_homepage():
    """View homepage."""

    return render_template('homepage.html')

@app.route('/find-charger')
def create_find_charger_page():
    """View find charger page with map."""

    return render_template('find-charger.html')

@app.route('/add-station')
def create_add_station_page():
    """View add station page."""

    return render_template('add-station.html')

@app.route('/login')
def create_login_page():
    """View login page."""

    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login_user():
    """Login user into account"""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)
    if user:
        if password == user.password:
            session['logged_user_id'] = user.user_id
            flash(f"{session['logged_user_id']}, you're loggged in!")
        else:
            flash("Your password doesn't match our records")
    else:
        flash('No account with that email')
    
    return redirect('/')


@app.route('/register')
def create_register_page():
    """View register page."""

    return render_template('register.html')

@app.route('/register', methods=[POST])
def create_account():
    """Creates account from user input."""
    
    first_name = request.form.get('fname')
    last_name = request.form.get('lname')
    email = request.form.get('email')
    password = request.form.get('password')

    # pull make, model, year to find ev id 
    # make a crud function
    # save it to ev_id

    user = crud.create_user(first_name, last_name, email, password, ev_id)

    # create a session with the registered user


@app.route('/profile')
def create_profile_page():
    """View profile page."""

    return render_template('profile.html')

@app.route('/about')
def create_about_page():
    """View about page."""

    return render_template('about.html')


if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)