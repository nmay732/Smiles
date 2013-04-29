var sqlite3 = require('sqlite3');

// Connect to the database:
var db = new sqlite3.Database('./data/sailors.db');

// Sailors data access layer.

exports.addContribution = function (name, zip, story, cb) {
  // Example of how to use sqlite3 module:
  // db.run("insert into contributions values (?, ?, ?, ?)", [NULL, 01545, "I smiled.", DATETIME('NOW')];, cb);
    console.log('sailors.addContribution');
  db.run('insert into contributions values (NULL, ?, ?, ?, DATETIME(\'now\'))',
    [name, zip, story],
    cb);
};

exports.getContributions = function (cb) {
  db.all('select * from contributions', cb);
};
