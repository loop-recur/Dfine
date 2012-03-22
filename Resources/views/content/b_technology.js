Views.content.b_technology = function() {
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	view.add(Views.shared.tech_platform_button());
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/technologycover/Star_Cover_main.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	var procedure_button = Ti.UI.createButton({
		backgroundImage:"images/star/technologycover/Cover_t-RFA_vid_btn.png",
		backgroundSelectedImage:"images/star/technologycover/Cover_t-RFA_vid_btn_p.png",
		width:249,
		height:49,
		bottom:50,
		left:60
	});
	
	view.add(procedure_button);
	
	var saying_button = Ti.UI.createButton({
		backgroundImage:"images/star/technologycover/Cover_what_phys_vid_btn.png",
		backgroundSelectedImage:"images/star/technologycover/Cover_what_phys_vid_btn_p.png",
		width:249,
		height:49,
		bottom:50,
		left: 350
	});
	
	view.add(saying_button);
	
	return view;
}
