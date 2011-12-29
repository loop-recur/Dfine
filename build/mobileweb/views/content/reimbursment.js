Views.content.reimbursment = function(win) {	
	var view = Ti.UI.createView({
		backgroundColor: "purple"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Reimbursment"
	});
	
	view.add(label);

	win.add(view);
}
