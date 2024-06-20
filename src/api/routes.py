"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
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
        return jsonify({"messagge": "Email es requerido."}), 400
    
    if not password:
        return jsonify({"messagge": "Password es requerido."}), 400
    
    found= User.query.filter_by(email= email).first()
    if found:
        return jsonify({"messagge": "Este correo existe."}), 400
    
    #Preparación del insert:
    user= User()
    user.email= email
    user.password= generate_password_hash(password)#Encripta el el password que pase el usuaeio.

    #Agrega los datos y se guardan:
    db.session.add(user)
    db.session.commit()

    return jsonify({"success": "Registro satisfactorio. Por favor hacer click en inicia sesión"}), 200

@api.route('/login', methods=['POST'])
def login_user():

    print(request.get_json())
    email= request.json.get('email')
    password= request.json.get('password')

    #Validadciones:
    if not email:
        return jsonify({"messagge": "Email es requerido."}), 400
    
    if not password:
        return jsonify({"messagge": "Password es requerido."}), 400
    
    #Valida si el email y password son incorrectos.
    user= User.query.filter_by(email= email).first()
    if not user:
        return jsonify({"messagge": "Email/Password son incorrectos."}), 401
    
    if not check_password_hash(user.password, password):
         return jsonify({"messagge": "Email/Password son incorrectos"}), 401
    
    expirate_token = datetime.timedelta(days = 1)
    access_token = create_access_token(identity = user.id, expires_delta = expirate_token)

    datos = {
        "success": "Inicio de sesión exitoso",
        "access_token":access_token,
        "user": user.serialize()
    }

    return jsonify(datos), 200

#Ruta privada que solicita el token
@api.route('private')
@jwt_required()
def private():
    id= get_jwt_identity() #Accede a la info que se guarda en el token.
    user= User.query.get(id) #Almacena la búsqueda del usuario por el id.
    return jsonify(user.serialize()), 200

