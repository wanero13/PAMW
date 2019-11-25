from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length, Regexp

class RegisterForm(FlaskForm):
    firstname = StringField('Name')
    lastname = StringField('Surname')
    login = StringField('Login')
    password = PasswordField('Password')


class LoginForm(FlaskForm):
    loginl = StringField('Login', validators=[InputRequired()])
    passwordl = PasswordField('Password', validators=[InputRequired()])
