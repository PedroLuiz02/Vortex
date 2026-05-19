from main import app
from flask import render_template, jsonify, request, redirect, url_for, flash

@app.route("/")
def index():
    return render_template("index.html")