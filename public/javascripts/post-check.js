// A Checker object for updating posts
function Checker(config) {
	for (var prop in config) {
		this[prop] = config[prop];
	}
}

Checker.prototype = {
	// An cache of posts received from server.
	posts : [], //TODO: limit number of posts to load on client?

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
        var id;
        if(that.posts.length <= 0)
          id = -1; //flag server that this is the first poll
        else
          id = that.posts[that.posts.length-1].cid;
		$.ajax({
			type : 'POST',
			url  : '/check',
			data : { last_id : id },
			dataType : 'json'
		}).done(function (data) {
			console.log('Check rcvd: ' + JSON.stringify(data));

			// Append the posts to the current posts:
			that.posts = that.posts.concat(data);

			// Rewrite to the container:
            //TODO: only add new posts not EVERYTHING.
			that.container.empty();
			for (var i = 0; i < that.posts.length; i++) {
				var post = $('<div>').attr({'class': 'post'}).attr({id: that.posts[i].id});
                var pname = '<p class="name">' + that.posts[i].name + '</p>';
                var time_stamp = relativeDate(that.posts[i].time);
                var time = '<p class="time">' + time_stamp + '</p>';
                var pstory = '<p class="story">' + that.posts[i].story + '</p>';
                var br = '<br>';
                post.html(pname + time + br + pstory);
				that.container.prepend(post);
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
