from flask import Flask, render_template, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_nav import Nav
from flask_nav.elements import Navbar, View
from forms import RegisterForm, LoginForm
from flask import request
from flask import make_response
import redis

app = Flask(__name__)
session_db = redis.Redis(host="localhost", port=6379, decode_responses=True, db=0)
user_db = redis.Redis(host="localhost", port=6379, decode_responses=True, db=1)

Bootstrap(app)
nav = Nav(app)
# W pzyszłości usunąć
app.config['WTF_CSRF_ENABLED'] = False
# app.secret_key = "super secret key"

POST = "POST"
GET = "GET"
SESSION_ID = "session-id"
SECRET_KEY='12345678'

@nav.navigation()
def mynavbar():
    return Navbar(
        'First Web App',
        View('Strona główna', 'index'),
        View('Rejestracja', 'register'),
        View('Logowanie', 'login'),
    )


@app.route('/', methods=['POST', 'GET', 'HEAD', 'OPTIONS'])
def index():
    return render_template('index.html', reg=False)


@app.route('/register', methods=['POST', 'GET', 'HEAD', 'OPTIONS'])
def register():
    form = RegisterForm()

    if request.method == 'POST':
        data = request.form
        if user_db.exists(data['login']) == 1:
            return render_template('register.html', form=form, istnieje=True)
        user_db.hmset(data['login'], {'firstname':data['firstname'], 'lastname':data['lastname'], 'password':data['password']})
        return render_template('index.html', reg=True)

    return render_template('register.html', form=form, istnieje=False)


@app.route('/login', methods=['POST', 'GET', 'HEAD', 'OPTIONS'])
def login():
    form = LoginForm()
    return render_template('login.html', form=form)


if __name__ == '__main__':
    app.run(debug=True)
