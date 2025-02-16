from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from app.config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        from app.routes import register_routes  # Importiere die Routen hier
        register_routes(app)
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)