Views.content.a_reimbursement2 = function() {
	var view = Views.shared.bg_left_main_view("stabilit");
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/a_reimbursement/stabiliT_reimb_2.png",
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
	
	back_button.addEventListener('click', function(e){Controllers.content.renderSubView("a_reimbursement")});
	view.add(back_button);
	
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"b_tabs", flip_to:"b_reimbursement"}));
	
	
	return view;
}
