Views.content.dfine = function(win) {	
	var view = Ti.UI.createView({
		backgroundColor: "yellow"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Dfine"
	});
	
	view.add(label);

	win.add(view);
}
