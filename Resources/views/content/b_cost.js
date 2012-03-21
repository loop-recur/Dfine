Views.content.b_cost = function() {	
	var view = Ti.UI.createView({
		layout_container: "left_main"
	});

	var btn_switch_to_a_cost = UI.createButton({
		title: "Switch to A Cost",
		width: 250,
		height: 50,
		bottom: 20,
		right: 20,		
	});
	
	btn_switch_to_a_cost.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "a_cost")});
	view.add(btn_switch_to_a_cost);
	
	return view;
}
