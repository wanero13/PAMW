from flask import Flask, make_response, request, send_from_directory
from flasgger import Swagger
from flasgger.utils import swag_from

app = Flask(__name__)
app.config["SWAGGER"] = {"title": "Swagger-UI", "uiversion": 2}
swagger_config={
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

SECRET_KEY='12345678'

@app.route('/')
@swag_from("swagger_config.yml")
def hello_world():
    return 'Serwer REST PAMW!'


@app.route('/register', methods=['POST'])
def registration():
    return 'REGISTERED'


@app.route('/user/<username>', methods=['GET'])
def get(username):
    response = make_response('', 404)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    if username == 'janek':
        response.status_code = 200
    return response


if __name__ == '__main__':
    app.run(debug=True)
