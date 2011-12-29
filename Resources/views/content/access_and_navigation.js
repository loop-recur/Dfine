Views.content.access_and_navigation = function(win) {	
	var view = Ti.UI.createView({
		backgroundColor: "green"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Access"
	});
	
	view.add(label);

	win.add(view);
}
