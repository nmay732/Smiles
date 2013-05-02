var sqlite3 = require('sqlite3');

// Connect to the database:
var db = new sqlite3.Database('./data/smiles.db');

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

//given a single post, return all posts that are more recent than it.
//TODO: not finished
exports.getMoreRecent = function (name, zip, story, cb) {
  db.all('select time from contributions as c where c.name = ? and c.zip = ? and c.story = ? ',
    [name, zip, story], 
    cb);
};
