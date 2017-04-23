from flask import (Flask, render_template,
                   request, redirect, jsonify, url_for, flash)
from flask import make_response

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')
