Views.content.bone_cement = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var logo = Ti.UI.createView({
		backgroundImage:"images/dfine_logo.png",
		height:50,
		width:150,
		bottom:10,
		right:70
	});
	view.add(logo);
	
	var left_image = Ti.UI.createView({
		backgroundImage:"images/technology/bone_cement/bolus2_transparent.png",
		height:275,
		width:375,
		left: 90
	});
	
	var right_image = Ti.UI.createView({
		backgroundImage:"images/technology/bone_cement/midlifeCement2_transparent.png",
		height:275,
		width:375,
		right:140
	});
	
	view.add(left_image);
	view.add(right_image);
	
	win.add(view);
}
