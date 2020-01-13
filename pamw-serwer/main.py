from flask import Flask, make_response, request, send_from_directory, send_file, jsonify
from flasgger import Swagger
from flasgger.utils import swag_from
from jwt import decode, InvalidTokenError
import os, sys, json
from flask_marshmallow import Marshmallow

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
ma = Marshmallow(app)
biblioX = set()
biblioList = []
fileList = set()


class biblioPos:
    def __init__(self, name):
        self.position = name
        self.pos = []

    def addPos(self, pos):
        self.pos.append(pos)


biblioX.add('sample_position')
fileList.add('dummy.pdf')
fileList.add('sample.pdf')


# app.config['WTF_CSRF_ENABLED'] = False

@app.route('/test')
def test():
    print(json.dumps(list(biblioX)))
    return 'a'


@app.route('/')
@swag_from("swag/swagger_basic.yml")
def hello_world():
    return 'Serwer REST PAMW!'


@app.route('/upload', methods=['POST'])
@swag_from("swag/swagger_upload.yml")
def upload():
    f = request.files.get('file')
    t = request.cookies.get("jwt")
    c = request.form.get('name')
    response = make_response('', 401)
    if f is None:
        return response
    if t is None:
        return response
    if not valid(t):
        return response

    if not os.path.exists('./tmp/'):
        os.mkdir('./tmp/')
    if not os.path.exists('./tmp/docs'):
        os.mkdir('./tmp/docs')

    f.save(os.path.join('./tmp/docs', c))
    f.close()
    fileList.add(c)
    response = status_code = 200
    return response


@app.route('/download/<fid>', methods=['GET'])
@swag_from("swag/swagger_download.yml")
def download(fid):
    token = request.cookies.get("jwt")
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
        return send_file("./tmp/docs" + '/' + fid + '.pdf')
    except Exception as e:
        return '<h1> BRAK PLIKU </h1>'


@app.route('/pdfs', methods=['GET'])
def pdfs():
    return json.dumps(list(fileList))


@app.route('/biblio', methods=['GET', 'POST', 'DELETE'])
def biblio():
    token = request.cookies.get('jwt')
    if token is None:
        return '<h1>CDN</h1> No token', 401
    if not valid(token):
        return '<h1>CDN</h1> Invalid token', 401
    response = make_response('', 200)
    if request.method == 'GET':
        return json.dumps(list(biblioX))
    if request.method == 'POST':
        data = json.loads(request.data)
        if data['name'] not in biblioX:
            biblioX.add(data['name'])
        return response
    if request.method == 'DELETE':
        data = json.loads(request.data)
        if data['name'] in biblioX:
            biblioX.remove(data['name'])
        return response


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
