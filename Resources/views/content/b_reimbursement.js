Views.content.b_reimbursement = function() {
	var view = Ti.UI.createView({
		layout_container: "left_main"
	});
	
	var btn_switch_to_a_cost = UI.createButton({
		title: "Switch to A reimbursement",
		width: 250,
		height: 50,
		bottom: 20,
		right: 20,		
	});
	
	btn_switch_to_a_cost.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "a_reimbursement")});
	view.add(btn_switch_to_a_cost);
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/reimbursement/reimbursement_main.png",
		width:964,
		height:768,
		left:0
	})
	
	view.add(view_content);

	return view;
}
