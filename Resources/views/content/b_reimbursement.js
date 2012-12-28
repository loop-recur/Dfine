Views.content.b_reimbursement = function() {
	var view = Views.shared.bg_left_main_view("star");
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/reimbursement/reimbursement_main.png",
		width:964,
		height:768,
		left:0
	})
	
	view.add(view_content);
	
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_reimbursement"}));
	

	return view;
}
