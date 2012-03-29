Views.content.b_a7 = function() {	
	var view = Views.shared.bg_left_main_view("star");
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/a7/A7_main.png",
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
	
	back_button.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_technology")});
	view.add(back_button);
	
	view.add(Views.shared.tech_nav_star('rf_energy', 'b'));
	
	
	return view;
}