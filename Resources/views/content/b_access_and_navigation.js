Views.content.b_access_and_navigation = function() {	
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});

	var btn_vertecor = UI.createButton({
		title: "VertecoR Navigational MidLine Osteotome",
		width: 250,
		height: 50,
		bottom: 200,
		left: 50
	});
	
	btn_vertecor.addEventListener("click", function(e){Controllers.content.renderView("a_tabs", "targeted_cavity_creation")}); 
	btn_spinestar.addEventListener("click", function(e){Controllers.content.renderView("b_tabs", "site_specific_ablation")}); 
	
	view.add(btn_vertecor);

	var nav = Views.shared.tech_nav("access_and_navigation");
	view.add(nav);

	return view;
}
