from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField


class RegisterForm(FlaskForm):
    firstname = StringField('Name')
    lastname = StringField('Surname')
    login = StringField('Login')
    password = PasswordField('Password')


class LoginForm(FlaskForm):
    loginl = StringField('Login')
    passwordl = PasswordField('Password')
