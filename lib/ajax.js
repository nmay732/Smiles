// Server side Ajax handler

var db = require('../lib/smiles.js');

var posts = [{id : 1, name : 'nate', zip : '01545', story : 'This is awesome.'}]; //TODO:one fake data piece
// The post function will handle incoming posts and store them
// into the database. The client is expected to send a post
// request containing a single object: { name : <value>, zip : <value>, story : <value> }.
exports.post = function (req, res) {
	var name = req.body.name;
    var zip = req.body.zip;
    var story = req.body.story;
	console.log('received post by: ' + name);
	posts.push({name : name, zip : zip, story : story});
    //TODO: Add to database next
    //db.addContribution = function (name, zip, story, function(err){
        //if(err){console.log(err);}
        //else
          //res.json({ status: 'OK'}); 
    //});
};

// The check function is used to check how many new posts are
// available given the last post the client has. The client is
// expected to send a post request with a JSON body containing
// a single object: { last : <value> }.
exports.check = function (req, res) {
    if(req.body.last_id == -1){ //flag that no posts have been recieved yet
      //send ALL posts in database TODO: not cool.
      db.getContributions(function(err, data){
        if(err){console.log(err);}
        else{
          res.json(data); //send the data to the client
        }
      });
    }
    else{
      db.getMoreRecent(parseInt(req.body.last_id, 10), function(err, data){
        if(err){console.log(err);}
        else{
          res.json(data); //send the data to the client
        }
      });
    }
};

