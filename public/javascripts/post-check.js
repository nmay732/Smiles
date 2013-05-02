// A Checker object for updating posts
function Checker(config) {
	for (var prop in config) {
		this[prop] = config[prop];
	}
}

Checker.prototype = {
	// An cache of posts received from server.
	posts : [],

	// Start polling the server.
	poll : function () {
		var that = this;
		this._stop = setInterval(function () {
			that.check();
		},
		3000);
	},

	// Stop polling this server.
	pollStop : function () {
		clearInterval(this._stop);
	},

	// Check for more messages on the server
	// given the last index we have for the
	// current posts.
	check : function () {
		var that = this;
		$.ajax({
			type : 'POST',
			url  : '/check',
			data : { last : that.posts.length }, //TODO: don't judge by just the length
			dataType : 'json'
		}).done(function (data) {
			console.log('Check rcvd: ' + JSON.stringify(data));

			// Append the posts to the current posts:
			that.posts = that.posts.concat(data);

			// Rewrite to the container:
            //TODO: only add new posts not EVERYTHING.
			that.container.empty();
			for (var i = 0; i < that.posts.length; i++) {
				var post = $('<div>').attr({'class': 'post'});
                var pname = '<p class="name">' + that.posts[i].name + '<br>';
                var pstory = '<p class="story">' + that.posts[i].story;
                post.html(pname + pstory);
				that.container.append(post);
			}
		});
	}	
};

// jQuery ready handler:
$(function () {
	// Get the list view that the chat client
	// will populate with incoming messages:	
	var checker = new Checker({ container : $('.post_container') });

	// Start polling:
	checker.poll();

});
