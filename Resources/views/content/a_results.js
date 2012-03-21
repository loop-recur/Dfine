Views.content.a_results = function() {
	
	var view = Ti.UI.createView({
		layout_container: "center_main"
	});

	
	view.add(Views.content.pain_reduction());
	
	Controllers.content.renderSubView("results_nav");

	return view;
}
