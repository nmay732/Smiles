var sailors = require('../lib/sailors.js');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.sailors_list = function (req, res) {
  sailors.getSailors(function (err, ss) {
    if (err) {
      res.send('problem access data layer!');
    }
    else {
      res.render('sailors_list', { title : 'Sailors List',
                                   sailors : ss });
    }
  });
};

exports.sailors_add = function (req, res) {
  res.render('insert_sailor', { title : 'Insert Sailor'});
};

exports.insert_sailor = function (req, res) {
  var name = req.query.name;
  var rating = req.query.rating;
  var age = req.query.age;
  if (name && rating && age) {
    sailors.addSailor(name, rating, age, function (err) {
      if (err) {
        res.send('bad sailor insert');
      }
      else {
        res.redirect('/sailors/list');
      }
    });
  }
  else {
    res.send('missing sailor info');
  }
};

exports.get_sailor = function (req, res) {
  var name = req.params.name;
  sailors.getSailor(name, function (err, data) {
    res.send(data.sname + " " + data.rating + " " + data.age);
  });
};