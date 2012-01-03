Views.content.results = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Results"
	});
		
	view.add(label);
	win.add(view);
}
