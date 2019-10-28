from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, FileField, SelectField, IntegerField
from wtforms.validators import InputRequired, Length, Regexp
from wtforms.fields.html5 import DateField

app = Flask(__name__)
Bootstrap(app)
# W pzyszłości usunąć
app.config['WTF_CSRF_ENABLED'] = False
app.secret_key = "super secret key"

#Jak uda się wykonać synchroniczne zapytanie w pytonie to to się przyda więc na razie nie usuwam.
class RegisterForm(FlaskForm):
    firstname = StringField('Name', validators=[InputRequired(),Length(min=3, max=20, message="Your Name must be between %(min)d and %(max)d"),Regexp(regex='^[A-Z][a-z][a-zA-Z]*$',message="Firstname must tart with capital letter and be followed by at least one small letter. It cant have any numbers or special marks")])
    lastname = StringField('Surname', validators=[InputRequired(), Length(min=3, max=15, message='Your name bust be between %(min)d and %(max)d'),Regexp(regex='^[A-Z][a-z][a-zA-Z]*$',message="Lastname must tart with capital letter and be followed by at least one small letter. It cant have any numbers or special marks")])
    password = PasswordField('Password', validators=[InputRequired(),Regexp(regex='[a-zA-Z]*$', message='Only letters'), Length(min=8, max=80,message="Your Password must be between %(min)d and %(max)d")])
    birthdate = DateField('Birth date', validators=[InputRequired()],format='%Y-%m-%d')
    # sex = RadioField('Płeć',validators=[InputRequired()],choices=[('M', 'Male'),('F','Female')])
    sex = SelectField('Sex', validators=[InputRequired()], choices=[('F', 'Female'), ('M', 'Male')])
    login = StringField('Login', validators=[InputRequired(),Regexp(regex='[a-z]+$', message='Only small letters'),Length(min=3, max=12, message="Your Login must be between %(min)d and %(max)d")])
    pesel = StringField('Pesel', validators=[InputRequired(),Regexp(regex='[0-9]*$', message='Only digits'), Length(min=11,max=11,message='Pesel musi mieć długość 11 cyfr')])
    photo = FileField('Photo', validators=[InputRequired(),Regexp(regex='[0-9a-zA-Z]+\.jpg', message='Photo must be a jpg file')])

@app.route('/', methods=['GET', 'POST'])
def index():
    form = RegisterForm()
    return render_template('index.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)
