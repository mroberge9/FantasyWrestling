"""Fantasy Wrestling development configuration."""

import pathlib


# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# File Upload to var/
ROOT = pathlib.Path(__file__).resolve().parent.parent

# Database file is var/insta485.sqlite3
DATABASE_FILENAME = ROOT/'var'/'wrestling.sqlite3'
