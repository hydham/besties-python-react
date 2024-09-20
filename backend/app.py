from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['DEBUG'] = True

db = SQLAlchemy(app)

# once app and db is defined, import the routes - routes uses the models.py
import routes

# once the routes and models are defined, you initialize the tables and create it if not already created.
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
