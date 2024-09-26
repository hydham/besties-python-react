from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['DEBUG'] = True

db = SQLAlchemy(app)

# save frontend static files
dist_folder = os.path.join(os.getcwd(), "..", "frontend", "dist")

# Server static files from the "dist" folder under the "frontend" directory
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if filename and os.path.exists(os.path.join(dist_folder, filename)):
        return send_from_directory(dist_folder, filename)
    return send_from_directory(dist_folder, "index.html")

# once app and db is defined, import the routes - routes uses the models.py
import routes

# once the routes and models are defined, you initialize the tables and create it if not already created.
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
