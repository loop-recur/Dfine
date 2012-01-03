Views.content.dfine = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Dfine"
	});
	
	view.add(label);

	win.add(view);
}
