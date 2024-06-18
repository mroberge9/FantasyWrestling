"""Insta485 model (database) API."""
import sqlite3
import flask
import wrestling


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

def get_all_wrestlers():
    """Get all wrestlers in db."""
    connection = get_db()
    cur = connection.execute(
        "SELECT * FROM wrestlers "
        "ORDER BY name ASC"
    )
    return cur.fetchall()

def get_world_champ():
    """Get world champ from db."""
    connection = get_db()
    cur = connection.execute(
        "SELECT * FROM wrestlers "
        "WHERE isWorldChamp = True"
    )
    return cur.fetchone()

def get_tv_champ():
    """Get tv champ from db."""
    connection = get_db()
    cur = connection.execute(
        "SELECT * FROM wrestlers "
        "WHERE isTVChamp = True"
    )
    return cur.fetchone()

def get_wrestler(name):
    """Get specific wrestler."""
    connection = get_db()
    cur = connection.execute(
        "SELECT * FROM wrestlers "
        "WHERE name = ?",
        (name, )
    )
    return cur.fetchone()

def delete_wrestler(name):
    """Delete specific wrestler."""
    connection = get_db()
    cur = connection.execute(
        "DELETE FROM wrestlers "
        "WHERE name = ?",
        (name, )
    )

def update_wins(name):
    """Add 1 win to wrestler"""
    connection = get_db()
    cur = connection.execute(
        "UPDATE wrestlers "
        "SET wins = wins + 1 "
        "WHERE name = ?",
        (name, )
    )

def update_loss(name):
    """Add 1 loss to wrestler"""
    connection = get_db()
    cur = connection.execute(
        "UPDATE wrestlers "
        "SET losses = losses + 1 "
        "WHERE name = ?",
        (name, )
    )

def new_world_champ(old_champ, new_champ):
    """Set new world champion"""
    connection = get_db()
    cur = connection.execute(
        "UPDATE wrestlers "
        "SET isWorldChamp = False "
        "WHERE name = ?",
        (old_champ, )
    )
    cur = connection.execute(
        "UPDATE wrestlers "
        "SET isWorldChamp = True, numWorldTitles = numWorldTitles + 1 "
        "WHERE name = ?",
        (new_champ, )
    )

def new_tv_champ(old_champ, new_champ):
    """Set new tv champion"""
    connection = get_db()
    cur = connection.execute(
        "UPDATE wrestlers "
        "SET isTVChamp = False "
        "WHERE name = ?",
        (old_champ, )
    )
    cur = connection.execute(
        "UPDATE wrestlers "
        "SET isTVChamp = True, numTVTitles = numTVTitles + 1 "
        "WHERE name = ?",
        (new_champ, )
    )

def singles_match_result(winner, loser):
    """Create new singles match result"""
    connection = get_db()
    cur = connection.execute(
        "INSERT INTO results(winner, loser, isSingles, isWorld, isTV, newWorldChamp, newTVChamp) "
        "VALUES (?, ?, True, False, False, False, False)",
        (winner, loser)
    )

def world_title_match_result(winner, loser, newWorldChamp):
    """Create new world title match result"""
    connection = get_db()
    cur = connection.execute(
        "INSERT INTO results(winner, loser, isSingles, isWorld, isTV, newWorldChamp, newTVChamp) "
        "VALUES (?, ?, False, True, False, ?, False)",
        (winner, loser, newWorldChamp)
    )

def tv_title_match_result(winner, loser, newTVChamp):
    """Create new tv title match result"""
    connection = get_db()
    cur = connection.execute(
        "INSERT INTO results(winner, loser, isSingles, isWorld, isTV, newWorldChamp, newTVChamp) "
        "VALUES (?, ?, False, False, True, False, ?)",
        (winner, loser, newTVChamp)
    )

def clear_results():
    """Delete results from table"""
    connection = get_db()
    cur = connection.execute(
        "DELETE FROM results "
    )

def clear_roster():
    """Delete wrestlers from table"""
    connection = get_db()
    cur = connection.execute(
        "DELETE FROM wrestlers "
    )

def add_new_wrestler(name):
    """Add new wrestler to db"""
    connection = get_db()
    cur = connection.execute(
        "INSERT INTO wrestlers(name, wins, losses, isWorldChamp, isTVChamp, numWorldTitles, numTVTitles) "
        "VALUES (?, 0, 0, False, False, 0, 0)",
        (name, )
    )
    