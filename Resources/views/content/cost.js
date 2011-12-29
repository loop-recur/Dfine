Views.content.cost = function(win) {	
	var view = Ti.UI.createView({
		backgroundColor: "orange"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Cost"
	});
	
	view.add(label);

	win.add(view);
}
