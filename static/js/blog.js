//https://www.googleapis.com/blogger/v3/blogs/8018322669329800421/posts?key=AIzaSyDigRVAKHvJomBgQgfOA7fXqnOSv2u5sfI
$(document).ready(function() {
  	// Handler for .ready() called.
	var url = 'https://www.googleapis.com/blogger/v3/blogs/8018322669329800421/posts?key=AIzaSyDigRVAKHvJomBgQgfOA7fXqnOSv2u5sfI';
	$.getJSON(url, function(data) {
	  var posts = [];
	 
	  $.each(data.items, function(key, val) {
		$('<li>' + val.content + '</li>', {
			'class': 'post',
			html: posts
		}).appendTo('ul');
	    posts.push(val.content);
	  });

	  console.log(posts);
	 
	});
});