from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length, Regexp

class RegisterForm(FlaskForm):
    firstname = StringField('Name', validators=[InputRequired()])
    lastname = StringField('Surname', validators=[InputRequired()])
    login = StringField('Login', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])


class LoginForm(FlaskForm):
    loginl = StringField('Login', validators=[InputRequired()])
    passwordl = PasswordField('Password', validators=[InputRequired()])
