from flask import Flask
from flask_cors import CORS
from flask_dance.contrib.google import make_google_blueprint, google
from dotenv import load_dotenv
import os

load_dotenv()

from models.db import db


# Environment variables for database connection
AIVEN_USER = os.getenv("AIVEN_USER")
AIVEN_PASSWORD = os.getenv("AIVEN_PASSWORD")
AIVEN_HOST = os.getenv("AIVEN_HOST")
AIVEN_PORT = os.getenv("AIVEN_PORT")
AIVEN_DB = os.getenv("AIVEN_DB")

if not all([AIVEN_USER, AIVEN_HOST, AIVEN_PASSWORD, AIVEN_DB, AIVEN_PORT]):
    raise ValueError("Missing database credentials")

app=Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
google_bp = make_google_blueprint(
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    scope=[
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]
)
app.register_blueprint(google_bp, url_prefix="/login")


app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+pymysql://{AIVEN_USER}:{AIVEN_PASSWORD}@{AIVEN_HOST}:{AIVEN_PORT}/{AIVEN_DB}"

# SSL Configuration for Aiven Cloud MySQL
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "connect_args": {
        "ssl": {
            "ssl-mode": "REQUIRED",
        }
    }
}

db.init_app(app)


from models.auth import User
from routes.auth_routes import auth_bp
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(debug=True)