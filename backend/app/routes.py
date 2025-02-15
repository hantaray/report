from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app.models import User, Report
from app import db

def register_routes(app):
    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        if User.query.filter_by(username=data['username']).first():
            return jsonify({"message": "Username already exists"}), 400
        new_user = User(username=data['username'])
        new_user.password = data['password']
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if user and user.verify_password(data['password']):
            access_token = create_access_token(identity={'username': user.username})
            return jsonify(access_token=access_token), 200
        return jsonify({"message": "Invalid credentials"}), 401

    @app.route('/report', methods=['POST'])
    def report():
        data = request.get_json()
        new_report = Report(description=data['description'], user_id=data['user_id'])
        db.session.add(new_report)
        db.session.commit()
        return jsonify({"message": "Report submitted successfully"}), 201