from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/history")
def history():
    return render_template("history.html")

@app.route("/fashion-houses")
def fashion_houses():
    return render_template("fashion_houses.html")

@app.route("/paris-fashion-week")
def paris_fashion_week():
    return render_template("paris_fashion_week.html")
@app.route('/quiz')
def test_french():
    return render_template('Quiz.html')

if __name__ == "__main__":
    app.run(debug=True)
