Views.content.case_studies = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Case Studies"
	});
	
	view.add(label);

	win.add(view);
}
