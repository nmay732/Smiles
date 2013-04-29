var smiles = require('../lib/smiles.js');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.contribute = function (req, res) {
  res.render('contribute', { title : 'Contribute'});
};

exports.add_contribution = function (req, res) {
  console.log('add_contribution');
  var name = req.query.name;
  var zip = req.query.zip;
  var story = req.query.story;
  if (name && zip && story) {
    smiles.addContribution(name, zip, story, function (err) {
      if (err) {
        console.log('err');
        res.send('bad insert');
      }
      else {
        console.log('redirect to /contributions');
        res.redirect('/contributions');
      }
    });
  }
  else {
    console.log('missing info');
    res.send('missing info');
  }
};

exports.list_contributions = function (req, res) {
  smiles.getContributions(function (err, c) {
    if (err) {
      res.send('problem access data layer!');
    }
    else {
      res.render('contributions', { title : 'Brightened Days',
                                   contributions : c });
    }
  });
};
