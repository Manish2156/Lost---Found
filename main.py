from flask import Flask , request , redirect , render_template
app = Flask(__name__)

# basic code 
# templates folder is for the html pages 
# statics folder is for css 
# do not merge html and css in one .
# make separate branch everyone and work then merge into a third branch .
# do not merge into main branch in any circumstances untill everything is completed.
@app.route("/" , methods=["GET"])
def home():
    return "Hello World"

if __name__ == "__main__" :
    app.run(debug=True)