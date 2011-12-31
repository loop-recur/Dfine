Views.content.results = function(win) {	
	var view = Ti.UI.createView({
		backgroundColor: "blue"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Results"
	});
		
	view.add(label);
	win.add(view);
}
