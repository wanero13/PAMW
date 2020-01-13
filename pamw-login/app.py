from flask import Flask, make_response, request, send_from_directory, send_file, redirect
import redis, json
from jwt import decode, InvalidTokenError
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import hashlib
import os
import sys

app = Flask(__name__)

# app.secret_key = "super secret key"
POST = "POST"
GET = "GET"
SESSION_ID = "session-id"
SECRET_KEY = '12345678'
app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 600
jwt = JWTManager(app)

session_db = redis.Redis(host="localhost", port=6379, decode_responses=True, db=0)
user_db = redis.Redis(host="localhost", port=6379, decode_responses=True, db=1)


@app.route('/')
def hello_world():
    return 'Mobile app autherntication server!'


@app.route('/login', methods=[POST, GET])
def login():
    if request.method == GET:
        response = make_response('', 400)
        session_id = request.cookies.get(SESSION_ID)
        if session_id is None:
            return response
        if not session_db.exists(session_id):
            return response
        response.status_code = 200
        return response
    if request.method == POST:
        data = json.loads(request.data)
        if user_db.exists(data['loginl']):
            if user_db.hget(data['loginl'], 'password') == data['passwordl']:
                username = data['loginl']
                name_hash = hashlib.sha512(username.encode()).hexdigest()
                session_db.set(username, name_hash, ex=600)
                response = make_response('', 200)
                response.set_cookie(SESSION_ID, username, max_age=600)
                token = create_access_token(identity=username)
                response.set_cookie("jwt", token, max_age=600)
                return response
    response = make_response('', 200)
    return response


@app.route('/register', methods=[POST])
def register():

    if request.method == POST:
        data = json.loads(request.data)
        if user_db.exists(data['login']):
            response = make_response('', 406)
            return response
        user_db.hmset(data['login'],
                      {'firstname': data['firstname'], 'lastname': data['lastname'], 'password': data['password']})
        response = make_response('', 200)
        return response
    response = make_response('', 400)
    return response


@app.route('/logout', methods=['DELETE'])
def logout():
    response = make_response('', 200)
    session_id = request.cookies.get(SESSION_ID)
    if session_id is None:
        return response
    if session_db.exists(session_id):
        session_db.delete(session_id)
        response.set_cookie(SESSION_ID, '', expires=0)
        response.set_cookie("jwt", '', expires=0)
    return response


if __name__ == '__main__':
    app.run()
