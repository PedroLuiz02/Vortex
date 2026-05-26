from flask import Flask
from .db import db
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///instance/database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

os.makedirs("instance", exist_ok=True)

with app.app_context():
    db.create_all()

from . import routes