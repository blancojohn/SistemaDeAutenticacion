"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Crea usuarios.
@api.route('/register', methods=['POST'])
def register_user():

    print(request.get_json())# Comprueba que estoy accediendo a los campos.
    email= request.json.get('email')
    password= request.json.get('password')

    #Validadciones:
    if not email:
        return ({"messagge": "Email es requerido."}), 400
    
    if not password:
        return ({"messagge": "Password es requerido."}), 400
    
    found= User.query.filter_by(email= email).first()
    if found:
        return({"messagge": "Usurio con este correo existe."}), 400
    
    #Preparación del insert:
    user= User()
    user.email= email
    user.password= generate_password_hash(password)#Encripta el el password que pase el usuaeio.

    #Agrega los datos y se guardan:
    db.session.add(user)
    db.session.commit()

    return jsonify({"messagge": "Por favor iniciar sesión"}), 200

#Ruta privada que solicita el token
@api.route('private')
@jwt_required()
def private():
    return({"messagge": "Testing route private"})

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
