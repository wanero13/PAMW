from flask import Flask, render_template, redirect, url_for, flash
from flask_bootstrap import Bootstrap
from flask_nav import Nav
from flask_nav.elements import Navbar, View
from forms import RegisterForm, LoginForm
from flask import request
from flask import make_response
import redis
import hashlib

app = Flask(__name__)
session_db = redis.Redis(host="redis", port=6379, decode_responses=True, db=0)
user_db = redis.Redis(host="redis", port=6379, decode_responses=True, db=1)

Bootstrap(app)
nav = Nav(app)
# W pzyszłości usunąć
# app.config['WTF_CSRF_ENABLED'] = False
app.secret_key = "super secret key"

POST = "POST"
GET = "GET"
SESSION_ID = "session-id"
SECRET_KEY = '12345678'


@nav.navigation()
def mynavbar():
    return Navbar(
        'First Web App',
        View('Main page', 'index'),
        View('Sign up', 'register'),
        View('Sign in', 'login'),
    )


@app.route('/')
def index():
    session_id = request.cookies.get(SESSION_ID)
    print(session_id)
    if session_id is None:
        return render_template('index.html', reg=False)
    if not session_db.exists(session_id):
        return render_template('index.html', reg=False)
    name = user_db.hget(session_id, 'firstname')
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
                print("cookie")
                return response
            return render_template('login.html', form=form, good=True)
        return render_template('login.html', form=form, good=True)
    return render_template('login.html', form=form, good=False)


@app.route('/loggout', methods=['GET', 'POST'])
def loggout():
    session_id = request.cookies.get(SESSION_ID)
    if session_db.exists(session_id):
        session_db.delete(session_id)
    response = redirect(url_for('index'))
    response.set_cookie(SESSION_ID, '', expires=0)
    flash('Nastąpiło poprawne wylogowanie', 'alert-success')
    return response

if __name__ == '__main__':
    app.run(debug=True)
