import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv("SECRET_KEY")
    UPLOAD_FOLDER = os.path.join("statics", "uploads")
    SQLALCHEMY_TRACK_MODIFICATIONS = False