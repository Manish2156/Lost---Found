from fileinput import filename
from struct import Struct
import bcrypt
from dotenv import load_dotenv
load_dotenv()
from flask import Flask , request , redirect , render_template ,session
from extentions import db
from config import Config
import os
from models import Student, Item, Question, Answer
from werkzeug.utils import secure_filename

app = Flask(__name__,static_folder="statics")
app.config.from_object(Config)
print("DATABASE URL:", os.getenv("DATABASE_URL"))
print(app.config.get("SQLALCHEMY_DATABASE_URI"))
db.init_app(app)

# basic code 
# templates folder is for the html pages 
# statics folder is for css 
# do not merge html and css in one .
# make separate branch everyone and work then merge into a third branch .
# do not merge into main branch in any circumstances untill everything is completed.

# with app.app_context():
#     with db.engine.connect() as connection:
#         print("Database connected successfully!")

# Home Route

@app.route("/" , methods=["GET"])
def home():
    return render_template("home.html")

# Report Route

@app.route("/report" , methods=["GET" , "POST"])
def report():
    return render_template("report.html")

# Inventory Route

@app.route("/inventory" , methods=["GET"])
def inventory():
    return render_template("inventory.html")

# About Route

@app.route("/about")
def about():
    return render_template("about.html")

# Contact Route

@app.route("/contact")
def contact():
    return render_template("contact.html")

#  Profile Route

@app.route("/profile/<username>")
def profile(username):
    return render_template("profile.html")

# Sign up Route

@app.route("/signup" , methods=["POST", "GET"])
def signup():
    if request.method=="GET":
        return render_template("signup.html")

    name=request.form.get("name")
    roll_no=request.form.get("roll_no")
    existing = Student.query.filter(Student.roll_no == roll_no).first()
    if existing :
        return "Student already registered"
    course=request.form.get("course")
    year=request.form.get("year")
    phone=request.form.get("phone")
    image=request.files.get("image")
    if image and image.filename:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config["UPLOAD_FOLDER"],filename))
        image_path = "statics/uploads/" + filename
    else :
        image_path = None

    password=request.form.get("password")
    conf_pass=request.form.get("conf_pass")
    if password == conf_pass:
        hashedpass = bcrypt.hashpw(password.encode("utf-8") , bcrypt.gensalt()).decode("utf-8")
        student = Student(
            name=name,
            roll_no=roll_no,
            course=course,
            year=year,
            phone_no=phone,
            profile_picture=image_path,
            password=hashedpass

        )
        db.session.add(student)
        db.session.commit()
        return redirect("/login")

    else :
        return redirect("/signup")

#  Login Route

@app.route("/login" , methods=["POST", "GET"])
def login():
    if request.method == "GET" :
        return render_template("login.html")
    roll_no = request.form.get("roll_no")
    password = request.form.get("password")
    student = Student.query.filter_by(roll_no=roll_no).first()
    if student is None :
        return redirect("/login")
    else :
        if bcrypt.checkpw(password.encode("utf-8"), student.password.encode("utf-8")):
            session["ss_id"] = Student.id
            return redirect("/")


if __name__ == "__main__" :
    app.run(debug=True)