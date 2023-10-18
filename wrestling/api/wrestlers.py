"""Fantasy Wrestling API"""
import flask
import wrestling

@wrestling.app.route('/')
def display_wrestlers():
    """Display wrestler data"""
    connection = wrestling.model.get_db()
    cur = connection.execute(
        "SELECT * FROM wrestlers"
    )
    print("DEBUG", cur.fetchall())
    return "<p>Hello</p>"