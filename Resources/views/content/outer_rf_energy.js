Views.content.outer_rf_energy = function() {	
	var view = Ti.UI.createView({
		width:1024,
		height:768,
		backgroundImage:"images/outer/Combined_bg.png"
	});

	var comp_view = Ti.UI.createView({
		width:1024,
		height:768,
		backgroundImage:"images/outer/RF_main.png"
	});
	view.add(comp_view);
	
	view.add(Views.shared.tech_nav('rf_energy'));

	var btn_multiplex = Ti.UI.createView({
		backgroundColor:"transparent",
		width: 320,
		height: 270,
		top:280,
		left: 150
	});
	
	var btn_metastar = Ti.UI.createView({
		backgroundColor:"transparent",
		width: 370,
		height: 270,
		top:280,
		right: 100
	});
	
	btn_multiplex.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "rf_cement_viscosity")});
	btn_metastar.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "rf_ablate_tumors")});
	
	view.add(btn_multiplex);
	view.add(btn_metastar);
	
	return view;
}
