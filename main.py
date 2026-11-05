from datetime import time

import bcrypt
import datetime as date,time
from dotenv import load_dotenv
load_dotenv()
from flask import Flask , request , redirect , render_template ,session
from extentions import db
from config import Config
import os
from models import Student, Item, Question, Answer
from werkzeug.utils import secure_filename
from functools import wraps

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

def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get("ss_id"):
            return redirect("/login")
        return f(*args, **kwargs)

    return wrapper

# Home Route

@app.route("/" , methods=["GET"])
def home():
    return render_template("home.html")

# Report Route

@app.route("/report" , methods=["GET" , "POST"])
@login_required
def report():
    if request.method == "GET" :
        return render_template("report.html")

    item_title = request.form.get("item_title")
    item_description = request.form.get("item_description")
    category = request.form.get("category")
    itemimage = request.files.get("image")
    location = request.form.get("location")
    report_type = request.form.get("report_type")
    if itemimage and itemimage.filename:
        filename = secure_filename(itemimage.filename)
        itemimage.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        itemimage_path = "statics/uploads/" + filename
    else:
        itemimage_path = None
    item_date = date.fromisoformat(request.form.get("rep_date"))
    item_time = time.fromisoformat(request.form.get("rep_time"))

    item = Item(
        student_id = session["ss_id"],
        item_title=item_title,
        description = item_description,
        report_type = report_type,
        category = category,
        location = location,
        item_image = itemimage_path,
        item_time = item_time,
        item_date = item_date
    )

    db.session.add(item)
    db.session.commit()

    if repor_type =="Found":
        for i in range(1,4):
            question = request.form.get(f"question_{i}")
            rep_quest = Question(
                item_id = item.item_id,
                question_text = question
            )
            db.session.add(rep_quest)
        db.session.commit()

    return redirect("/inventory")





# Inventory Route

@app.route("/inventory" , methods=["GET"])
def inventory():
    items = Item.query.order_by(Item.item_date.desc()).all()
    return render_template("inventory.html", items=items)

# Inventory/Item Route
@app.route("/inventory/<item_id>" , methods=["GET"])
def spec_item(item_id):
    item = Item.query.get_or_404(item_id)
    return render_template("specific_item.html", item=item)

# Answer submiting Route
@app.route("/inventory/<item_id>/answer_submit")
@login_required
def answer_submit(item_id):
    for i in range(1,4):
        answer = request.form.get(f"answer_{i}")
        ans = Answer(
            student_id = session["ss_id"],
            question_id = question.question_id,
            answer_text = answer
        )
        db.session.add(ans)
    db.session.commit()
    return redirect("/inventory")


# About Route

@app.route("/about")
def about():
    return render_template("about.html")

# Contact Route

@app.route("/contact")
def contact():
    return render_template("contact.html")

#  Profile Route

@app.route("/profile/<student_id>")
@login_required
def profile(student_id):
    student=Student.query.filter_by(student_id=student_id).first()
    return render_template("profile.html" , student=student)


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
            session["ss_id"] = student.student_id
            return redirect("/")
        else :
            return redirect("/login")


@app.route("/logout")
@login_required
def logout():
    session.pop("ss_id",None)
    return redirect("/")

if __name__ == "__main__" :
    app.run(debug=True)