Views.content.b_rf_energy = function() {	
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/a2/A2_main.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	view.add(Views.shared.tech_nav('rf_energy', 'b'));
		
	return view;
}
