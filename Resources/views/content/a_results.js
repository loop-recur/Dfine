Views.content.a_results = function() {
	
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/stabilit/stabilit_bg.png"
	});
	
	view.add(Views.content.results1());
	
	Controllers.content.renderSubView("results_nav");

	return view;
}
