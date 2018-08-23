const sqlite3 = require('sqlite3').verbose();
exports.dbconnection = function () {

    let db = new sqlite3.Database('./db/central.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the central database.');
      });
    return db;
};