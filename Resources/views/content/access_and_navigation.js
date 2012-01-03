Views.content.access_and_navigation = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Access"
	});
	
	view.add(label);

	view.add(Views.content.tech_nav(view));
	win.add(view);
}
