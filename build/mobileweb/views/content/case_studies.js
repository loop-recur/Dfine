Views.content.case_studies = function(win) {	
	var view = Ti.UI.createView({
		backgroundColor: "green"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Case Studies"
	});
	
	view.add(label);

	win.add(view);
}
