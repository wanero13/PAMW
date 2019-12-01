from flask import Flask, make_response, request, send_from_directory, send_file
from flasgger import Swagger
from flasgger.utils import swag_from
from jwt import decode, InvalidTokenError
import os
import sys

app = Flask(__name__)
app.config["SWAGGER"] = {"title": "PAMW REST API", "uiversion": 2}
swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": "apispec_1",
            "route": "/apispec_1.json",
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/swagger/"
}

swagger = Swagger(app, config=swagger_config)

SECRET_KEY = '12345678'


# app.config['WTF_CSRF_ENABLED'] = False

@app.route('/')
@swag_from("swag/swagger_basic.yml")
def hello_world():
    return 'Serwer REST PAMW!'


@app.route('/upload', methods=['POST'])
@swag_from("swag/swagger_upload.yml")
def upload():
    f = request.files.get('file')
    t = request.form.get('token')
    c = request.form.get('callback')
    if f is None:
        return redirect(f"{c}?error=No+file+provided") if c \
            else ('<h1>Error</h1> No file provided', 400)
    if t is None:
        return redirect(f"{c}?error=No+token+provided") if c \
            else ('<h1>Error</h1> No token provided', 401)
    if not valid(t):
        return redirect(f"{c}?error=Invalid+token") if c \
            else ('<h1>Error</h1> Invalid token', 401)

    fid = decode(t, SECRET_KEY)['identity']
    if not os.path.exists('./tmp/'):
        os.mkdir('./tmp/')
    if not os.path.exists('./tmp/' + fid):
        os.mkdir('./tmp/' + fid)

    f.save(os.path.join('./tmp/' + fid, fid + '.pdf'))
    f.close()

    return redirect(f"{c}?fid={fid}") if c \
        else (f'Uploaded {fid}', 200)


@app.route('/download/<fid>', methods=['GET'])
@swag_from("swag/swagger_download.yml")
def download(fid):
    token = request.args.get('token')
    if len(fid) == 0:
        return '<h1>CDN</h1> Missing fid', 404
    if token is None:
        return '<h1>CDN</h1> No token', 401
    if not valid(token):
        return '<h1>CDN</h1> Invalid token', 401
    payload = decode(token, SECRET_KEY)
    if payload['identity'] != fid:
        return '<h1>CDN</h1> Incorrect token payload', 401
    try:
        return send_file("./tmp/" + fid + '/' + fid + '.pdf')
    except Exception as e:
        return '<h1> BRAK PLIKU </h1>'


def valid(token):
    try:
        decode(token, SECRET_KEY)
    except InvalidTokenError as e:
        app.logger.error(str(e))
        return False
    return True


def redirect(location):
    response = make_response('', 303)
    response.headers["Location"] = location
    return response


if __name__ == '__main__':
    app.run(debug=True)
