"""
Fantasy Wrestling index (main) view.

URLs include:
/
"""
import flask
import wrestling

@wrestling.app.route('/')
def show_index():
    """Display index."""
    return flask.render_template("index.html")