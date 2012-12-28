Views.content.b_results = function() {
	
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/star/star_bg.png"
	});

	
	view.add(Views.content.lit1());
	
	Controllers.content.renderSubView("lit_nav");

	return view;
}
