var sqlite3 = require('sqlite3');

// Connect to the database:
var db = new sqlite3.Database('./data/sailors.db');

// Sailors data access layer.

exports.addSailor = function (name, rating, age, cb) {
  // Example of how to use sqlite3 module:
  // db.run("insert into sailors values (NULL, ?, ?, ?)", ['hazel', 15, 4.2], cb);
  db.run('insert into sailors values (NULL, ?, ?, ?)',
    [name, rating, age],
    cb);
};

exports.addBoat = function () {
  // Example of how to use sqlite3 module:
  // db.run("insert into boats values (NULL, ?, ?)", ['perl', 'green'], cb);
};

exports.addReservation = function (name, boat, day, cb) {
  // Tricky - need ids from sailors and boats...
  // Example of how to use sqlite3 module:
  db.get("select * from sailors where sname=?", [name], function (err, row) {
    if (err) {
      cb(err);
    }
    else {
      var sid = row['sid'];
      db.get("select * from boats where bname=?", [boat], function (err, row) {
        if (err) {
          cb(err);
        }
        else {
          var bid = row['bid'];
          db.run("insert into reserves values (?, ?, ?)",
            [sid, bid, day],
            cb);
        }
      });
    }
  });
};

exports.getSailor = function () {

};

exports.getSailors = function (cb) {
  db.all('select * from sailors', cb);
};

exports.getBoat = function () {

};

exports.getBoats = function (cb) {
  db.all('select * from boats', cb);
};

exports.getReservation = function () {

};

exports.getReservations = function (cb) {
  db.all('select * from reserves', cb);
};