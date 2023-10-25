"""Fantasy Wrestling API"""
import flask
import wrestling

@wrestling.app.route('/api/')
def display_wrestlers():
    """Display wrestler data"""
    wrestlers = wrestling.model.get_all_wrestlers()
    return flask.jsonify(
        {'wrestlers': wrestlers}
    )

@wrestling.app.route('/api/worldchamp/')
def display_worldchamp():
    """Display world champ"""
    world_champ = wrestling.model.get_world_champ()
    return flask.jsonify(
        {'world_champ': world_champ}
    )

@wrestling.app.route('/api/tvchamp/')
def display_tvchamp():
    """Display tv champ"""
    tv_champ = wrestling.model.get_tv_champ()
    return flask.jsonify(
        {'tv_champ': tv_champ}
    )

@wrestling.app.route('/api/<string:name>')
def show_wrestler(name):
    """Display specific wrestler"""
    wrestler = wrestling.model.get_wrestler(name)
    return flask.jsonify(
        {'wrestler': wrestler}
    )