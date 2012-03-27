Views.content.lit3 = function() {
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/star/star_bg_small.png",
		width:714,
		height:768,
		top:0
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/lit/Lit3.png",
		width:714,
		height:768,
		left:0
	});
	
	view.add(view_content);

	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_results"}));
	view.add(Views.shared.logo("star"));
	return view;
}