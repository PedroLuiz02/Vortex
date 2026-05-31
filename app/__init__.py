from flask import Flask
from .db import db
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

from . import routes