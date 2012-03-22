Views.content.a_reimbursement3 = function() {
	var view = Ti.UI.createView({
		layout_container: "left_main"
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/a_reimbursement/stabiliT_reimb_3.png",
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
		bottom:30,
		left:40,
		zIndex:40
	});
	
	back_button.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "a_reimbursement")});
	view.add(back_button);
	
	view.add(Views.shared.tech_platform_button({top:30,right:30}));
	view.add(Views.shared.flipper({tabs:"b_tabs", flip_to:"b_reimbursement"}));
	view.add(Views.shared.logo());
	
	return view;
}
