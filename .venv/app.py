from flask import Flask, render_template

app = Flask(__name__,
           static_folder='static',
           template_folder='templates')

@app.route('/')
def game():
    return render_template('index.html')

if __name__ == '_main_':
    app.run(host='0.0.0.0',
           port=5000,
           debug=True,
           threaded=True)


