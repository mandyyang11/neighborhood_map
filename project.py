from flask import (Flask, render_template,
                   request, redirect, jsonify, url_for, flash)
from flask import make_response

from yelp.client import Client
from yelp.oauth1_authenticator import Oauth1Authenticator

# store the keys on the backend for security reason
auth = Oauth1Authenticator(
    consumer_key="CNz73XdjtuKvXnZJ5jxvzg",
    consumer_secret="ipU9M4rIQTI2vTavepWzyLPskEU",
    token="Oc6wCJqbknQcS7U4JOg6CXB8GuxCbGMv",
    token_secret="CE1OzTScrvFH_CnxFsXPfekJl1w"
)
client = Client(auth)


app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

# endpoint for the front end to access with query Yelp information 
@app.route('/yelp_api/<yelp_id>')
def yelp_api(yelp_id):
    params = {
        'lang': 'fr'
    }

    # store the information as json
    response = client.get_business(yelp_id, **params)
    j = {"name": response.business.name,
    "rating": response.business.rating,
    "address": response.business.location.address[0],
    "city": response.business.location.city
    }
    return jsonify(j)

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')
