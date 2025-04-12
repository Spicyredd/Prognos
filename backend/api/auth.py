from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from models import db, Doctor

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']
    
    if Doctor.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    new_doctor = Doctor(
        username=username,
        password_hash=generate_password_hash(password)
    )
    db.session.add(new_doctor)
    db.session.commit()
    return jsonify({'message': 'Registration successful'})


@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    doctor = Doctor.query.filter_by(username=username).first()
    if doctor and check_password_hash(doctor.password_hash, password):
        login_user(doctor)
        return jsonify({'message': 'Login successful', 'doctor_id': doctor.id})
    return jsonify({'message': 'Invalid credentials'}), 401


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'})
