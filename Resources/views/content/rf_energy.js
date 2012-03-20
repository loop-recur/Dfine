Views.content.rf_energy = function() {	
	var view = Ti.UI.createView({
	});
	
	view.add(Views.shared.tech_nav('rf_energy'));
	
	var btn_multiplex = Ti.UI.createButton({
		title: "Multiplex Controller",
		width: 250,
		height: 50,
		bottom: 200,
		left: 50
	});
	
	var btn_metastar = Ti.UI.createButton({
		title: "MetaStar RF Generator",
		width: 250,
		height: 50,
		bottom: 200,
		right: 50
	});
	
	btn_multiplex.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "rf_cement_viscosity")});
	btn_metastar.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "rf_ablate_tumors")});
	
	view.add(btn_multiplex);
	view.add(btn_metastar);
	
	return view;
}
