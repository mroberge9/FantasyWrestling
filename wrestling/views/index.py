"""
Fantasy Wrestling index (main) view.

URLs include:
/
"""
import flask
import wrestling
import sqlite3

def dict_factory(cursor, row):
    """Convert database row objects to a dictionary keyed on column name.

    This is useful for building dictionaries which are then used to render a
    template.  Note that this would be inefficient for large queries.
    """
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}


def get_db():
    """Open a new database connection.

    Flask docs:
    https://flask.palletsprojects.com/en/1.0.x/appcontext/#storing-data
    """
    if 'sqlite_db' not in flask.g:
        db_filename = wrestling.app.config['DATABASE_FILENAME']
        # print("DEBUG", db_filename)
        flask.g.sqlite_db = sqlite3.connect(str(db_filename))
        flask.g.sqlite_db.row_factory = dict_factory

        # Foreign keys have to be enabled per-connection.  This is an sqlite3
        # backwards compatibility thing.
        flask.g.sqlite_db.execute("PRAGMA foreign_keys = ON")

    return flask.g.sqlite_db

@wrestling.app.teardown_appcontext
def close_db(error):
    """Close the database at the end of a request.

    Flask docs:
    https://flask.palletsprojects.com/en/1.0.x/appcontext/#storing-data
    """
    assert error or not error  # Needed to avoid superfluous style error
    sqlite_db = flask.g.pop('sqlite_db', None)
    if sqlite_db is not None:
        sqlite_db.commit()
        sqlite_db.close()

@wrestling.app.route('/')
def show_index():
    """Display index."""
    connection = get_db()
    cur = connection.execute(
        "SELECT * FROM results "
        "ORDER BY matchid DESC"
    )
    results = cur.fetchall()

    cur = connection.execute(
        "SELECT * FROM wrestlers "
        "WHERE isWorldChamp = True"
    )
    world_champ = cur.fetchone()

    cur = connection.execute(
        "SELECT * FROM wrestlers "
        "WHERE isTVChamp = True"
    )
    tv_champ = cur.fetchone()

    cur = connection.execute(
        "SELECT * FROM wrestlers "
        "ORDER BY name ASC"
    )
    roster = cur.fetchall()

    context = {"results": results, "world_champ": world_champ, "tv_champ": tv_champ, "roster": roster}
    return flask.render_template("index.html", **context)