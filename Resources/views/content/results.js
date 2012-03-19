Views.content.results = function() {
	var main_view = Ti.UI.createView();
	
	var view = Ti.UI.createView({
		width: "75%",
		right:14
	});

	view.add(Views.content.pain_reduction());
	main_view.add(Views.content.results_nav());
	main_view.add(view);

	return main_view;
}
