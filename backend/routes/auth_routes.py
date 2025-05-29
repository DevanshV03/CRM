from flask import request, jsonify, Blueprint, url_for, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from models.auth import User
from models.db import db
from flask_dance.contrib.google import google

auth_bp = Blueprint('auth', __name__)


#google auth
@auth_bp.route('/google-signup')
def google_signup():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get("/oauth2/v2/userinfo")

    if not resp.ok:
        return jsonify({"error: Failed to Fetch info from google"}),400
    
    user_info = resp.json()
    email = user_info['email']
    username = user_info.get("name") or user_info.get('given_name') or email.split('@')[0]

    user = User.query.filter_by(email = email).first()

    if not user:
        user = User(username = username, email =email, password = "")
        db.session.add(user)
        db.session.commit()

    return redirect("http://localhost:3000/?google_signup=success")


#Aiven cloud auth
@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 409

    hashed_pw = generate_password_hash(password)
    user = User(username=username, email=email, password=hashed_pw)

    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Signup successful!'}), 201


@auth_bp.route('/api/login', methods=['GET','POST'])
def login():
    data=request.get_json()
    email=data.get("email")
    password=data.get("password")

    user=User.query.filter_by(email=email).first()

    if not email or not password:
        return jsonify({"error: All Fields are required"}), 400
    
    if not email and not check_password_hash(user.password, password):
        return jsonify({"error: Invalid Credentials"}), 401
    
    return jsonify({"message: Login Successful"}),200