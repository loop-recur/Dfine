Views.content.a_access_and_navigation = function() {	
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
	
	btn_vertecor.addEventListener("click", function(e){Controllers.content.renderSubView("targeted_cavity_creation")}); 
	
	view.add(btn_vertecor);

	var nav = Views.shared.tech_nav("access_and_navigation", "a");
	view.add(nav);

	return view;
}
