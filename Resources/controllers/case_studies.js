Controllers.case_studies = (function() {
	var Api = RestApi("case_studies");
	var path = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "images");	
	
	var _addDataDir = function(name) {
		return Ti.Filesystem.getFile(path.nativePath, name).nativePath;
	}
	
	var _getName = compose(first, split("?"), last, split("/"));
	
	var _fixName = set('url', compose(_addDataDir, _getName, '.url'));
	
	var _fixUrls = set('images', compose(map(_fixName), '.images'));
	
	var getAll = function(cb, params, options) {
		cb = params.fix_urls ? compose(cb, map(_fixUrls)) : cb;
		Api.all(cb, {}, options);
	}

	var getStabilit = function(cb, params, options) {
		Api = RestApi("case_studies/stabilit");
		getAll(cb, params, options);
	}
	
	var getStar = function(cb, params, options) {
		Api = RestApi("case_studies/star");
		getAll(cb, params, options);
	}
	
	return {getAll : getAll, getStabilit: getStabilit, getStar: getStar}
})();
