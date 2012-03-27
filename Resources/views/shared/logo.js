Views.shared.logo = function(logo) {	
	
	var view = Ti.UI.createView({
		height:31,
		width:115,
		bottom:20, 
		right:10
	});
	// 
	// if (logo == "star") {
	// 	var logo_image = Ti.UI.createView({
	// 		backgroundImage:"images/star_logo.png",
	// 		height:31,
	// 		width:103
	// 	});
	// } else {
	// 	var logo_image = Ti.UI.createView({
	// 		backgroundImage:"images/stabiliT_logo.png",
	// 		height:31,
	// 		width:131
	// 	});
	// };
	// 
	// view.add(logo_image);
	
	return view;
}