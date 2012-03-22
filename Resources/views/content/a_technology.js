Views.content.a_technology = function() {
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/closed_tab_all_content_flat.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	
	
	view.add(Views.shared.tech_nav("", "a"));	

	return view;
}
