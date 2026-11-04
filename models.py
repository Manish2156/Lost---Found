from extentions import db


#  Database table of student info
class Student(db.Model):
    __tablename__ = 'student'

    student_id = db.Column(db.Integer, primary_key=True)
    roll_no = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone_no = db.Column(db.String(10), nullable=False)
    course = db.Column(db.String(50), nullable=False)
    year = db.Column(db.String(20), nullable=False)
    profile_picture = db.Column(db.String(255))
    password = db.Column(db.String(255), nullable=False)

#  Database table of items info

class Item(db.Model):
    __tablename__ = 'item'

    item_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.student_id'), nullable=False)
    item_title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    report_type = db.Column(db.String(10), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    item_date = db.Column(db.Date, nullable=False)
    item_time = db.Column(db.Time)
    item_image = db.Column(db.String(255))
    status = db.Column(db.String(20), default='Active')

#  Database table of question asked

class Question(db.Model):
    __tablename__ = 'question'

    question_id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.item_id'), nullable=False)
    question_text = db.Column(db.String(255), nullable=False)

# Database table of answers received

class Answer(db.Model):
    __tablename__ = 'answer'

    answer_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.student_id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.question_id'), nullable=False)
    answer_text = db.Column(db.Text, nullable=False)
