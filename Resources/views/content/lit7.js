Views.content.lit7 = function() {
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/star/star_bg_small.png",
		width:714,
		height:768,
		top:0
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/lit/lit7_fullscreen.png",
		width:773,
		height:768,
		left:0
	});
	
	var image = Ti.UI.createView({
		backgroundImage:"images/star/lit/lit7.png",
		top:160,
		left:20,
		width:722,
		height:350,
		zIndex:20
	});
	
	view.add(image);
	
	ClickToExpand(image);
	
	view.add(view_content);

	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_results"}));
	
	
	return view;
}