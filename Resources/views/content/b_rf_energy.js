Views.content.b_rf_energy = function() {	
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	view.add(Views.shared.tech_nav('rf_energy', 'b'));
		
	return view;
}
