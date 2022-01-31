<h1>Welcome to Recharge</h1>
Recharge allows a user to create a profile, find EV chargers based on zip code or address, calculate how much time they need to charge based on the number of miles needed, and then get a list of walkable coffee shops and restaurants. If users are logged in, they will also be able to add their own charging station onto the map.

<h3>Tech Stack:</h3>
React, Flask, SQLAlchemy, PostgreSQL, AJAX, Bootstrap, HTML, CSS
(dependencies are listed in requirements.txt)

<h3>APIs:</h3>
National Renewable Energy Laboratory (NREL), Google Maps, Google Places, Google Geocoding, Documenu

<h1>How to Locally Run Recharge:</h1>
<ul>
<li>Download the files</li>
<li>Create virtual environment inside of the /api folder</li>
<li>Then source env/bin/activate</li>
<li>Run <code>pip3 install -r requirements.txt</code></li>
<li>In the main folder, run <code>npm install</code></li>
<li>Create a secrets.sh folder to host API key for Google Maps, Documenu, NREL</li>
<li>Run <code>source secrets.sh</code></li>
<li>Open two terminals - run <code>npm start</code> from the main folder and <code>python3 server.py</code> from the api folder</li>
</ul>

<h1>Building Code for Production</h1>
Run <code>npx webpack</code> and the code will be compiled and added to the build folder. It can then be served by the Flask server by running <code>python3 server.py</code>

<h1>About the Developer:</h1>
Kaitlyn is a software engineer passionate about building products that increase access & level the playing field. 
LinkedIn: https://www.linkedin.com/in/kaitlyn-goodman-vojdani/ 

