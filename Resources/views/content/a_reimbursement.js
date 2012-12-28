Views.content.a_reimbursement = function() {
	var view = Views.shared.bg_left_main_view("stabilit");
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/a_reimbursement/stabiliT_reimb_1.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	var left_button = Ti.UI.createButton({
		backgroundImage:"images/a_reimbursement/stabiliT_calendar_btn.png",
		backgroundSelectedImage:"images/a_reimbursement/stabiliT_calendar_btn_p.png",
		width: 277,
		height: 49,
		bottom:40,
		left:200,
		zIndex:40
	});
	
	left_button.addEventListener('click', function(e){Controllers.content.renderSubView("a_reimbursement2")});
	view.add(left_button);
	
	var right_button = Ti.UI.createButton({
		backgroundImage:"images/a_reimbursement/stabiliT_ICD_btn.png",
		backgroundSelectedImage:"images/a_reimbursement/stabiliT_ICD_btn_p.png",
		width: 277,
		height: 49,
		bottom:40,
		right:200,
		zIndex:40
	});
	
	right_button.addEventListener('click', function(e){Controllers.content.renderSubView("a_reimbursement3")});
	view.add(right_button);
	
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"b_tabs", flip_to:"b_reimbursement"}));
	
	
	return view;
}
