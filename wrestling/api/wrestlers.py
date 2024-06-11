"""Fantasy Wrestling API"""
import flask
import wrestling
import random

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
    return wrestler

@wrestling.app.route('/api/singles/')
def set_last_singles_match(winner, loser):
    """Sets last match result"""
    result = winner + " def. " + loser
    print(result)
    return flask.jsonify(
        {'result': result}
    )

@wrestling.app.route('/singles/', methods=['POST'])
def singles_match():
    """Singles Match"""
    # if flask.request.form['wrestler1'] == flask.request.form['wrestler2']:
    #     return flask.abort(405)
    wrestler1 = show_wrestler(flask.request.form['wrestler1'])
    print(wrestler1)
    wrestler2 = show_wrestler(flask.request.form['wrestler2'])
    print(wrestler2)
    winner = match_algorithm(wrestler1, wrestler2)
    if winner == 1:
        print(wrestler1['name'], "def.", wrestler2['name'])
        wrestling.model.update_wins(wrestler1['name'])
        wrestling.model.update_loss(wrestler2['name'])
        wrestling.model.singles_match_result(wrestler1['name'], wrestler2['name'])
    else:
        print(wrestler2['name'], "def.", wrestler1['name'])
        wrestling.model.update_wins(wrestler2['name'])
        wrestling.model.update_loss(wrestler1['name'])
        wrestling.model.singles_match_result(wrestler2['name'], wrestler1['name'])
    print(show_wrestler(wrestler1['name']))
    print(show_wrestler(wrestler2['name']))
    
    return flask.redirect(flask.request.referrer)

@wrestling.app.route('/worldtitle/', methods=['POST'])
def world_title_match():
    """World Title Match"""
    wrestler1 = show_wrestler(flask.request.form['wrestler1'])
    print(wrestler1)
    wrestler2 = show_wrestler(flask.request.form['wrestler2'])
    print(wrestler2)
    winner = match_algorithm(wrestler1, wrestler2)
    if winner == 1:
        print("Winner:", wrestler1['name'])
        wrestling.model.update_wins(wrestler1['name'])
        wrestling.model.update_loss(wrestler2['name'])
        wrestling.model.world_title_match_result(wrestler1['name'], wrestler2['name'], False)

    else:
        print("Winner:", wrestler2['name'], "NEW WORLD CHAMPION")
        wrestling.model.update_wins(wrestler2['name'])
        wrestling.model.update_loss(wrestler1['name'])
        wrestling.model.new_world_champ(wrestler1['name'], wrestler2['name'])
        wrestling.model.world_title_match_result(wrestler2['name'], wrestler1['name'], True)
    print(show_wrestler(wrestler1['name']))
    print(show_wrestler(wrestler2['name']))
    
    return flask.redirect(flask.request.referrer)

@wrestling.app.route('/tvtitle/', methods=['POST'])
def tv_title_match():
    """TV Title Match"""
    wrestler1 = show_wrestler(flask.request.form['wrestler1'])
    print(wrestler1)
    wrestler2 = show_wrestler(flask.request.form['wrestler2'])
    print(wrestler2)
    winner = match_algorithm(wrestler1, wrestler2)
    if winner == 1:
        print("Winner:", wrestler1['name'])
        wrestling.model.update_wins(wrestler1['name'])
        wrestling.model.update_loss(wrestler2['name'])
        wrestling.model.tv_title_match_result(wrestler1['name'], wrestler2['name'], False)
    else:
        print("Winner:", wrestler2['name'], "NEW TV CHAMPION")
        wrestling.model.update_wins(wrestler2['name'])
        wrestling.model.update_loss(wrestler1['name'])
        wrestling.model.new_tv_champ(wrestler1['name'], wrestler2['name'])
        wrestling.model.tv_title_match_result(wrestler2['name'], wrestler1['name'], True)
    print(show_wrestler(wrestler1['name']))
    print(show_wrestler(wrestler2['name']))
    
    return flask.redirect(flask.request.referrer)


    
def match_algorithm(wrestler1, wrestler2):
    """Run Match Algorithm"""
    w1_total_matches = wrestler1['wins'] + wrestler1['losses']
    w2_total_matches = wrestler2['wins'] + wrestler2['losses']
    w1_wp = 0.0
    w2_wp = 0.0
    if w1_total_matches > 0:
        w1_wp = round((wrestler1['wins'] / w1_total_matches) * 100, 1)
    if w2_total_matches > 0:
        w2_wp = round((wrestler2['wins'] / w2_total_matches) * 100, 1)
    wp_diff = round((abs(w1_wp - w2_wp))/2, 1)
    w1_odds = 50.0
    w2_odds = 50.0
    if w1_wp > w2_wp:
        w1_odds += wp_diff
        w2_odds -= wp_diff
    if w1_wp < w2_wp:
        w1_odds -= wp_diff
        w2_odds += wp_diff
    w1_odds = round(w1_odds, 1)
    w2_odds = round(w2_odds, 1)
    w1_champ_factor = (wrestler1['numWorldTitles'] * 10) + (wrestler1['numTVTitles'] * 5)
    w2_champ_factor = (wrestler2['numWorldTitles'] * 10) + (wrestler2['numTVTitles'] * 5)
    champ_factor_diff = abs(w1_champ_factor - w2_champ_factor) / 2
    if w1_champ_factor > w2_champ_factor:
        w1_odds += champ_factor_diff
        w2_odds -= champ_factor_diff
    if w1_champ_factor < w2_champ_factor:
        w1_odds -= champ_factor_diff
        w2_odds += champ_factor_diff
    w1_odds = int(w1_odds * 10)
    w2_odds = int(w2_odds * 10)
    odds_array = []
    for x in range(0, w1_odds):
        odds_array.append(1)
    for x in range(w1_odds, w1_odds + w2_odds):
        odds_array.append(2)
    random.shuffle(odds_array)
    rand_num = random.randint(0, 999)
    return odds_array[rand_num]
    