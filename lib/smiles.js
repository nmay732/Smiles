var sqlite3 = require('sqlite3');

// Connect to the database:
var db = new sqlite3.Database('./data/smiles.db');

exports.addContribution = function (name, zip, story, cb) {
  // Example of how to use sqlite3 module:
  // db.run("insert into contributions values (?, ?, ?, ?)", [NULL, 01545, "I smiled.", DATETIME('NOW')];, cb);
  db.run('insert into contributions values (NULL, ?, ?, ?, DATETIME(\'now\',\'localtime\'))',
    [name, zip, story],
    cb);
};

exports.getContributions = function (cb) {
  //console.log(limit);
  db.all('select * from contributions order by time desc limit ?', [5], cb);
};

//given the id for a single post, return all posts that are more recent than it.
exports.getMoreRecent = function (id, cb) {
  this.getPostTime(id, function(err, data){
    if(err){console.log(err);}
    else{
      db.all('select * from contributions as c where DateTime(c.time) > Datetime(?) order by time desc limit ?', [data[0].time, 5], cb);
    }
  });
};

//given the id for a post, get the time it was posted
exports.getPostTime = function(id, cb){
  db.all('select time from contributions as c where c.cid = ?',
    [id],
    cb);
};
