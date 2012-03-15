App = {};
App.run = Bootstrap.run;

App.action = defn(function(win, controller_action, args) {
	var osname = Ti.Platform.osname
	, params = args || {}
	, names = controller_action.split("#")
	, controller = names[0]
	, action = names[1]
	, view = null;
	
	view = params.skip_os_path ? Views[controller][action] : Views[osname] && Views[osname][controller] && Views[osname][controller][action];
	if(!view) view = Views[controller][action];
	Controllers[controller][action](view.p(win), params);
});


App.removeChildren = function(view, children) {
	if(children) map(function(c){ view.remove(c); c = null; children = null; }, children);
}

App.removeAllChildren = function(view){
	var children = view.children || [];
	removeChildren(view, children);
}

App.swapView = function(view, cb) {
	return function(e) {
		var children = view.children || [];
		cb(view);
		App.removeChildren(view, children);
	}
}

App.setHost = function(url, credentials) {
	App.base_url = url;
	if(credentials) App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode(credentials));
}

