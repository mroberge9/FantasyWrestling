PRAGMA foreign_keys = ON;

CREATE TABLE wrestlers(
    name VARCHAR(40) NOT NULL,
    wins INTEGER NOT NULL,
    losses INTEGER NOT NULL,
    isWorldChamp BOOL NOT NULL,
    isTVChamp BOOL NOT NULL,
    numWorldTitles INTEGER NOT NULL,
    numTVTitles INTEGER NOT NULL
);