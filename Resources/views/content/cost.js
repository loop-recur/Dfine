Views.content.cost = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Cost"
	});
	
	view.add(label);

	win.add(view);
}
