Views.content.b_reimbursement = function() {
	var view = Ti.UI.createView({
		layout_container: "left_main"
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/reimbursement/reimbursement_main.png",
		width:964,
		height:768,
		left:0
	})
	
	view.add(view_content);
	
	view.add(Views.shared.tech_platform_button({top:30,right:30}));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_reimbursement"}));
	view.add(Views.shared.logo("star"));

	return view;
}
