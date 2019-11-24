from flask import Flask
from flask import request
from flask import make_response

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Serwer REST PAMW!'


@app.route('/register', methods=['POST'])
def registration():
    return 'REGISTERED'


@app.route('/user/<username>', methods=['GET'])
def get(username):
    response = make_response('', 404)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    if username == 'janek':
        response.status_code = 200
    return response


if __name__ == '__main__':
    app.run(debug=True)
