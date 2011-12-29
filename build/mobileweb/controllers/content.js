Controllers.content = (function() {
	var self = {}
	
	var index = function(name, win) {
		Views.content[name](win);
	};
	
	var video = Views.videos.show;
	
// delegate methods

	return {index : index, video: video}
})();
