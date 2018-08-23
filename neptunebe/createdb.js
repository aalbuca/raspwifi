const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/central.db', (err) => {
if (err) {
    console.error(err.message);
}
    console.log('Connected to the central database.');
});

db.run('CREATE TABLE IF NOT EXISTS sensor ( \
    mac TEXT PRIMARY KEY, \
    ip TEXT NOT NULL, \
    name TEXT NOT NULL UNIQUE, \
    alias TEXT NOT NULL UNIQUE, \
    type INTEGER DEFAULT 0 \
   ) WITHOUT ROWID');

db.close();
