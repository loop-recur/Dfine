Views.content.access_and_navigation = function() {	
	var view = Ti.UI.createView({
		width:"100%",
		left: 0
	});

	var btn_vertecor = UI.createButton({
		title: "VertecoR Navigational MidLine Osteotome",
		width: 250,
		height: 50,
		bottom: 200,
		left: 50
	});
	

	var btn_spinestar = UI.createButton({
		title: "SpineSTAR Ablation Instrument",
		width: 250,
		height: 50,
		bottom: 200,
		right: 50,
	});
	
	btn_vertecor.addEventListener("click", function(e){Controllers.content.renderView("targeted_cavity_creation")}); 
	btn_spinestar.addEventListener("click", function(e){Controllers.content.renderView("site_specific_ablation")}); 

	
	view.add(btn_vertecor);
	view.add(btn_spinestar);

	var nav = Views.shared.tech_nav("access_and_navigation");
	view.add(nav);
	
	

	return view;
}
