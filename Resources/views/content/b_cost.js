Views.content.b_cost = function() {	
	var view = Ti.UI.createView({
		layout_container: "left_main"
	});

	var flipper = UI.createButton({
		title: "Switch to A Cost",
		width: 250,
		height: 50,
		bottom: 20,
		right: 20,		
	});
	
	flipper.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "a_cost")});
	view.add(flipper);
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/acomp2/AComp2_main.png",
		width:964,
		height:768,
		left:0
	})
	
	view.add(view_content);
	
	return view;
}
