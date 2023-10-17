"""Fantasy Wrestling API"""
import flask
import wrestling

@wrestling.app.route('/')
def display_wrestlers():
    """Display wrestler data"""
    return "<p>Hello</p>"