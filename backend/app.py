from flask import Flask
from flask_cors import CORS
from api.routes import api_bp
from flask_login import LoginManager
from models import db, Doctor
from api.auth import auth

app = Flask(__name__)
CORS(app)  # enables cross-origin requests
# app.secret_key = 'your-secret-key'  # change this in production
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///doctors.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db.init_app(app)

# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'auth.login'

app.register_blueprint(api_bp, url_prefix="/api")
# app.register_blueprint(auth, url_prefix="/auth")

# @login_manager.user_loader
# def load_user(user_id):
#     return Doctor.query.get(int(user_id))

# @app.before_first_request
# def create_tables():
#     db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
