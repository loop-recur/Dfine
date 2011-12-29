Views.content.rf_energy = function(win) {	
	var view = Ti.UI.createView({
		backgroundColor: "red"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Energy"
	});
	
	view.add(label);

	win.add(view);
}
