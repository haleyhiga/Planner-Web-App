from flask import Flask, request, g
from planner import Planner
from passlib.hash import bcrypt
from session_store import SessionStore

app = Flask(__name__)
session_store = SessionStore()

def load_session_data():
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        session_id = auth_header.removeprefix("Bearer ")
    else:
        session_id = None
    
    if session_id:
        session_data = session_store.get_session_data(session_id)
        print("loaded session data", session_data)

    # if the session ID is either missing or session data is invalid
    if session_id == None or session_data == None:
        # create a new session and session ID
        session_id = session_store.create_session()
        # load the session with the new session ID
        session_data = session_store.get_session_data(session_id)
        print("created session data", session_data)

    g.session_id = session_id
    g.session_data = session_data


# @app.route("/homework/<int:homework_id>",methods=["OPTIONS"])
# def handle_cors_options(homework_id):
#     return "",204,{
#         "Access-Control-Allow-Origin":"*",
#         "Access-Control-Allow-Methods":"DELETE,PUT",
#         "Access-Control-Allow-Headers":"Content-Type"
#     }

@app.before_request
def before_request_func():
    if request.method == "OPTIONS":
        response = app.response_class("", status=204)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content, Authorization"
        return response
    load_session_data()

@app.after_request
def after_request_func(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content, Authorization"
    return response


@app.route("/sessions", methods=["GET"])
def retrieve_session():
    return {
        'id': g.session_id,
        'data': g.session_data
    }

@app.route("/homework", methods=["GET"])
def retrieve_homework():
    # i need to add this to more places
    if "user_id" not in g.session_data:
        return "Unauthenticated", 401

    db = Planner("planner_db.db")
    homework = db.getHomework()
    return homework, 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/homework/<int:homework_id>",methods=["GET"])
def retrieveSingleHomework(homework_id):
    db = Planner("planner_db.db")
    homework = db.getSingleHomework(homework_id)
    return homework, 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/homework", methods=["POST"])
def create_homework():
    db = Planner("planner_db.db")
    name = request.form["name"]
    date = request.form["date"]
    desc = request.form["desc"]
    course = request.form["course"]
    notes = request.form["notes"]
    db.createHomework(name,date,desc,course,notes)
    return "Created", 201, {"Access-Control-Allow-Origin":"*"}

@app.route("/homework/<int:homework_id>",methods=["PUT"]) 
def update_homework(homework_id):
    db = Planner("planner_db.db")
    homework = db.getSingleHomework(homework_id)
    print("homework",homework)
    if homework: 
        print("update homework with ID", homework_id)
        name = request.form["name"]
        date = request.form["date"]
        desc = request.form["desc"]
        course = request.form["course"]
        notes = request.form["notes"]

        db.updateHomework(homework_id,name,date,desc,course,notes)
        return "Update", 200, {"Access-Control-Allow-Origin":"*"}
    else:
        return f"Homework {homework_id}  not found", 404, {"Access-Control-Allow-Origin":"*"}
    
@app.route("/homework/<int:homework_id>",methods=["DELETE"])
def delete_homework(homework_id):
    db = Planner("planner_db.db")
    homework = db.getSingleHomework(homework_id)
    print("homework_id",homework)
    print("deleted homework with ID:",homework_id)
    if homework:
        db.deleteHomework(homework_id)
        return "Deleted", 200,{"Access-Control-Allow-Origin":"*"}
    else:
        return f"Homework {homework_id} not found", 404, {"Access-Control-Allow-Origin":"*"}



"""
USERS LOGIN
"""

@app.route("/users", methods=["GET"])
def retrieve_users():
    db = Planner("planner_db.db")
    users = db.getAllUsers()
    print(users)
    return users, 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/users", methods=["GET"])
def retrieve_single_user(user_id):
    db = Planner("planner_db.db")
    user = db.getSingleUser(user_id)
    return user, 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/users", methods=["POST"])
def create_in_users_collection():
    db = Planner("planner_db.db")
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    email = request.form["email"]
    password = request.form["password"]
    # need to encrypt password before storing in DB
    # need to check if email has already been used
    if db.get_user_by_email(email):
        return f"User with email {email} already exists", 422, {"Access-Control-Allow-Origin": "*"}
    else:
        encrypted_password = bcrypt.hash(password)
        db.createUser(first_name, last_name, email, encrypted_password)
        # db.createUser(first_name, last_name, email, password)
        return "User Created", 201, {"Access-Control-Allow-Origin":"*"}



@app.route("/sessions/auth", methods=["POST"])
def login():
    print("The request data is:", request.form)
    # extract email and password from the request.form
    db = Planner("planner_db.db")
    email = request.form["email"]
    password = request.form["password"]
    # create a new db thread
    
    # try to get the user info from DB using email
    user = db.get_user_by_email(email)
    if user:
        # check if the password is correct
        if bcrypt.verify(password, user['password']):
            g.session_data["user_id"] = user["id"]
            return "Authenticated", 200, {"Access-Control-Allow-Origin":"*"}
        else:
            return "Unauthorized", 401, {"Access-Control-Allow-Origin":"*"}
        # if user["password"] == password:
        #     return "Authenticated", 200, {"Access-Control-Allow-Origin":"*"}
        # else:
        #     return "Unauthorized", 401, {"Access-Control-Allow-Origin":"*"}
    
    else:
        return "Unauthorized", 401, {"Access-Control-Allow-Origin":"*"}
        


@app.route("/sessions/settings/colors", methods=["PUT"])
def setFavoriteColor():
    print("the request color is:", request.form)
    color = request.form["color"]
    g.session_data["fav_color"] = color
    return "Color Saved", 200


@app.route("/sessions/settings/themes", methods=["PUT"])
def setColorTheme():
    print("the request color theme is:", request.form)
    theme = request.form["theme"]
    g.session_data["theme"] = theme
    return "Color Theme Saved", 200


def run():
    app.run(port=8080, host='0.0.0.0')

if __name__ == "__main__":
    run()

