from app import app, db
from models import Friend
from flask import jsonify, request

# Get all friends
@app.route("/api/friends", methods=["GET"])
def get_friends():
    try:
        friends = Friend.query.all()
        if not friends:
            return jsonify({"success": True, "message": "No friends found"}), 404
        
        result = [friend.to_json() for friend in friends]
        return jsonify({"success": True, "data": result}), 200
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
# Create a friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    try:
        body= request.get_json()

        # basic validation
        required_fields = ["name", "role", "gender"]
        for field in required_fields:
            if not body.get(field):
                return jsonify({"success": False, "error": f"Missing input: {field}"}), 400
        
        # extract fields from request body
        name= body.get("name")
        role= body.get("role")
        gender= body.get("gender")
        description= body.get("description")
        
        if(gender.lower() == "male"):
            img_url= f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif(gender.lower() == "female"):
            img_url= f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            return jsonify({"success": False, "error": "Invalid gender"}), 400
        
        new_friend = Friend(name=name, role=role, gender=gender, description=description, img_url=img_url)

        db.session.add(new_friend)
        db.session.commit()

        return jsonify({"success": True, "message": "Friend created", "data": new_friend.to_json()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500
    
# delete a friend
@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)

        if not friend:
            return jsonify({"success": False, "error": "ID not valid"}), 404 
        
        db.session.delete(friend)
        db.session.commit()

        return jsonify({"success": True, "message": "Friend deleted successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    

# Update a friend
@app.route("/api/friends/<int:id>", methods=["PUT"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)   

        # Check friend exists
        if not friend:
            return jsonify({"success": False, "error": "Invalid ID"}), 404
        
        # Check request body exists
        body = request.get_json()
        if not body:
            return jsonify({"success": False, "error": "Request body is empty"}), 400

        fields = ['name', 'role', 'description']
        for field in fields:
            value = body.get(field)
            if value not in [None, ""]:
                setattr(friend, field, value)
        
        db.session.commit()
        
        return jsonify({"success": True, "data": friend.to_json()}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500


