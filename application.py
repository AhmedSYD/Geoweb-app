from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask import Flask, render_template, request,jsonify,session
from flask_session import Session
import requests

app=Flask(__name__)


@app.route("/")
def search():
    pass