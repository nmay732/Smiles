// Server side Ajax handler

var db = require('../lib/smiles.js');

var posts = [-1,"name","00000","story","2013-04-29 22:04:03"]; //TODO:one fake data piece to make initial request function

// The check function is used to check how many new posts are
// available given the last post the client has. The client is
// expected to send a post request with a JSON body containing
// a single object: { last : <value> }.
exports.check = function (req, res) {
    if(req.body.last_id == -1){ //flag that no posts have been recieved yet
      //send a limit of 5 posts
      //limit shoudl reflect MAX posts desired on the entire page
      db.getContributions(function(err, data){
        if(err){console.log(err);}
        else{
          res.json(data); //send the data to the client
        }
      });
    }
    else{
      //limit to 5 posts to return
      //limit should reflect the MAX posts desired on the entire page
      db.getMoreRecent(parseInt(req.body.last_id, 10), function(err, data){
        if(err){console.log(err);}
        else{
          res.json(data); //send the data to the client
        }
      });
    }
};

