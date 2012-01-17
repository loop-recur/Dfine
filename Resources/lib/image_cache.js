ImageCache = function() {

	var path = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "images");
	if(!path.exists()) path.createDirectory();
	
	function _markFinished() {
		Ti.App.Properties.setBool("cached_images",true);
	}
	
	function _download(url) {
		var xhr = Ti.Network.createHTTPClient();
	  xhr.timeout = 10000;
		xhr.onload = _writeImage.p(url);
	  xhr.open("GET", url);
		xhr.send();
		return url;
	}
	
	function _writeImage(url) {
		var _getName = compose(first, split("?"), last, split("/"));
		var name = _getName(url);
		var file = Ti.Filesystem.getFile(path.nativePath, name);
		file.write(this.responseData);
		return name;
	}
	
	function startDownloading() {
		var _storeImage = compose(_download, '.url');
		var cb = compose(_markFinished, map(map(_storeImage)), map('.images'));
		Controllers.case_studies.getAll(cb, {}, {preload: true});
	}
	
	startDownloading();
};