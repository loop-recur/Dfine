Formatter = (function() {
	
	var underscore = function(name) {
		return name.toLowerCase().replace(/\s+/, "_");
	}
	
	return {underscore: underscore}
	
})();