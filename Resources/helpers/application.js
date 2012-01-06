Helpers.Application = {};

Helpers.Application.assetPath = function(path) {
	return App.base_url.replace("/api", "")+path;
}
