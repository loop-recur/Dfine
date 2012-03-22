Views.content.b_a5 = function() {	
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/a5/A5_main.png",
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
		bottom:60,
		left:40,
		zIndex:40
	});
	
	back_button.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_access_and_navigation")});
	view.add(back_button);
	
	var popup1_hotspot = Ti.UI.createView({
		width:200,
		height:70,
		left:170, 
		top:300,
		backgroundColor:"red"
	});
	
	view.add(popup1_hotspot);
	
	var popup1 = Ti.UI.createView({
		backgroundImage:"images/star/a5/A5_pop1.png",
		width:527,
		height:154,
		left:300,
		top: 130
	});
	
	view.add(popup1);
	
	var popup2_hotspot = Ti.UI.createView({
		width:240,
		height:70,
		right:210, 
		top:300,
		backgroundColor:"red"
	});
	
	view.add(popup2_hotspot);
	
	var popup2 = Ti.UI.createView({
		backgroundImage:"images/star/a5/A5_pop2.png",
		width:449,
		height:207,
		right:150,
		bottom:100
	});
	
	view.add(popup2);
	
	view.add(Views.shared.tech_nav_star('access_and_navigation', 'b'));
	view.add(Views.shared.logo("star"));
	
	return view;
}