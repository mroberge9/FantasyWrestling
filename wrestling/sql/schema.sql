PRAGMA foreign_keys = ON;

CREATE TABLE wrestlers(
    name VARCHAR(40) NOT NULL PRIMARY KEY,
    wins INTEGER NOT NULL,
    losses INTEGER NOT NULL,
    isWorldChamp BOOL NOT NULL,
    isTVChamp BOOL NOT NULL,
    numWorldTitles INTEGER NOT NULL,
    numTVTitles INTEGER NOT NULL
);

CREATE TABLE results(
    matchid INTEGER PRIMARY KEY AUTOINCREMENT,
    winner VARCHAR(40) NOT NULL,
    loser VARCHAR(40) NOT NULL,
    isSingles BOOL NOT NULL,
    isWorld BOOL NOT NULL,
    isTV BOOL NOT NULL,
    newWorldChamp BOOL NOT NULL,
    newTVChamp BOOL NOT NULL
);