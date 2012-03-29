Views.content.lit4 = function() {
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/star/star_bg_small.png",
		width:714,
		height:768,
		top:0
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/lit/Lit4.png",
		width:714,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	var image = Ti.UI.createView({
		backgroundImage:"images/star/lit/lit4_graph.png",
		top:200,
		left:70,
		width:561,
		height:304,
		zIndex:20
	});
	
	view.add(image);
	
	ClickToExpand(image);

	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_results"}));
	
	return view;
}