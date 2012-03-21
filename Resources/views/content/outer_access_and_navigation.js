Views.content.outer_access_and_navigation = function() {	
	var view = Ti.UI.createView({
		width:1024,
		height:768,
		backgroundImage:"images/outer/Combined_bg.png"
	});

	var comp_view = Ti.UI.createView({
		width:1024,
		height:768,
		backgroundImage:"images/outer/AN_main.png"
	});
	view.add(comp_view);
	
	view.add(Views.shared.tech_nav("access_and_navigation"));

	var btn_vertecor = Ti.UI.createView({
		backgroundColor:"transparent",
		width: 320,
		height: 270,
		top:280,
		left: 150
	});

	var btn_spinestar = Ti.UI.createView({
		backgroundColor:"transparent",
		width: 370,
		height: 270,
		top:280,
		right: 100
	});
	
	btn_vertecor.addEventListener("click", function(e){Controllers.content.renderView("a_tabs", "targeted_cavity_creation")}); 
	btn_spinestar.addEventListener("click", function(e){Controllers.content.renderView("b_tabs", "site_specific_ablation")}); 
	
	view.add(btn_vertecor);
	view.add(btn_spinestar);

	return view;
}
