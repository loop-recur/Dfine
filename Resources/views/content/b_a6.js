Views.content.b_a6 = function() {	
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/a6/A6_main.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	var back_button = Ti.UI.createButton({
		backgroundImage:"images/back_btn.png",
		backgroundSelectedImage:"images/back_btn_p.png",
		width: 122,
		height: 44,
		bottom:60,
		left:40,
		zIndex:40
	});
	
	back_button.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_access_and_navigation")});
	view.add(back_button);
	
	view.add(Views.shared.tech_nav_star('access_and_navigation', 'b'));
	
	return view;
}