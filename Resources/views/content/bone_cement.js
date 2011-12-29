Views.content.bone_cement = function(win) {	
	var view = Ti.UI.createView({
		backgroundColor: "yellow"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Bone Cement"
	});
	
	view.add(label);

	win.add(view);
}
