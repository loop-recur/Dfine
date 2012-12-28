Views.shared.bg_left_main_view = function(arg) {	
	
	var image = "images/" + arg + "/" + arg + "_bg.png";
	
	var view = Ti.UI.createView({
		layout_container:"left_main",
		backgroundImage:image
	});
	
	return view;
}