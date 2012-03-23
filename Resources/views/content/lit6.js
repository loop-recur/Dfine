Views.content.lit6 = function() {
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/star/lit/Lit6.png",
		width:714,
		height:768
	});

	view.add(Views.shared.tech_platform_button({top:30,right:30}));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_results"}));
	view.add(Views.shared.logo("star"));
	
	return view;
}