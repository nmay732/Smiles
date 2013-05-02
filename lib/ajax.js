// Server side Ajax handler

var db = require('../lib/smiles.js');

var posts = [{name : 'nate', zip : '01545', story : 'This is awesome.'}]; //one fake data piece
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
    //db.addContribution = function (name, zip, story, function(){
        //res.json({ status: 'OK'}); //TODO: actually error check
    //});
};

// The check function is used to check how many new posts are
// available given the last post the client has. The client is
// expected to send a post request with a JSON body containing
// a single object: { last : <value> }.
exports.check = function (req, res) {
	var last = parseInt(req.body.last, 10);
	var rest = posts.slice(last, posts.length);
	res.json(rest);
};
