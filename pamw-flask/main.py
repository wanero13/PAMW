from flask import Flask, render_template, redirect, url_for, flash
from flask_bootstrap import Bootstrap
from flask_nav import Nav
from flask_nav.elements import Navbar, View
from forms import RegisterForm, LoginForm
from flask import request
from flask import make_response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import redis
import hashlib
import datetime

JWT_SESSION_TIME=600

app = Flask(__name__)
session_db = redis.Redis(host="localhost", port=6379, decode_responses=True, db=0)
user_db = redis.Redis(host="localhost", port=6379, decode_responses=True, db=1)

Bootstrap(app)
nav = Nav(app)
# W pzyszłości usunąć
# app.config['WTF_CSRF_ENABLED'] = False
app.secret_key = "super secret key"
POST = "POST"
GET = "GET"
SESSION_ID = "session-id"
SECRET_KEY = '12345678'
WEB = 'localhost:5000'
REST = 'localhost:8080'

app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 600
jwt = JWTManager(app)


@nav.navigation()
def mynavbar():
    return Navbar(
        'First Web App',
        View('Main page', 'index'),
        View('Sign up', 'register'),
        View('Sign in', 'login'),
    )

@nav.navigation()
def loggednavbar():
    return Navbar(
        'First Web App',
        View('Main page', 'index'),
        View('My files', 'myfiles'),
        View('Logout', 'logout'),
    )


@app.route('/')
def index():
    session_id = request.cookies.get(SESSION_ID)
    if session_id is None:
        return render_template('index.html', reg=False)
    if not session_db.exists(session_id):
        return render_template('index.html', reg=False)
    name = session_id
    return render_template('logged.html', name=name)


@app.route('/register', methods=['POST', 'GET', 'HEAD', 'OPTIONS'])
def register():
    form = RegisterForm()

    if request.method == 'POST':
        data = request.form
        if user_db.exists(data['login']) == 1:
            return render_template('register.html', form=form, istnieje=True)
        user_db.hmset(data['login'],
                      {'firstname': data['firstname'], 'lastname': data['lastname'], 'password': data['password']})
        return render_template('index.html', reg=True)

    return render_template('register.html', form=form, istnieje=False)


@app.route('/login', methods=['POST', 'GET', 'HEAD', 'OPTIONS'])
def login():
    form = LoginForm()
    if request.method == 'POST':
        data = request.form
        if user_db.exists(data['loginl']):
            if user_db.hget(data['loginl'], 'password') == data['passwordl']:
                username = data['loginl']
                name_hash = hashlib.sha512(username.encode()).hexdigest()
                session_db.set(username, name_hash, ex=600)
                response = redirect(url_for('index'))
                response.set_cookie(SESSION_ID, username, max_age=600)
                return response
            return render_template('login.html', form=form, good=True)
        return render_template('login.html', form=form, good=True)
    return render_template('login.html', form=form, good=False)


@app.route('/logout')
def logout():
    session_id = request.cookies.get(SESSION_ID)
    if session_id is None:
        return redirect(url_for('index'))
    if session_db.exists(session_id):
        session_db.delete(session_id)
    response = redirect(url_for('index'))
    response.set_cookie(SESSION_ID, '', expires=0)
    return response


@app.route('/myfiles')
def myfiles():
    session_id = request.cookies.get(SESSION_ID)
    if session_id is None:
        return redirect(url_for('index', reg=False))
    if not session_db.exists(session_id):
        return redirect(url_for('index', reg=False))
    token = create_access_token(identity=session_id)
    return render_template('myfiles.html', token=token, name=session_id)


@app.route('/callback')
def uploaded():
    return render_template('uploadgood.html')

if __name__ == '__main__':
    app.run(debug=True)
