Views.content.b_rf_energy = function() {	
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/a2/A2_main.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	var movie = Ti.UI.createButton({
		backgroundImage:"images/star/a2/A2_controlled_rf_vid_btn.png",
		backgroundSelectedImage:"images/star/a2/A2_controlled_rf_vid_btn_p.png",
		width: 265,
		height: 50,
		bottom:60,
		left:100,
		zIndex:40
	});
	
	view.add(movie);
	
	var right_button = Ti.UI.createButton({
		backgroundImage:"images/star/a2/A2_metastar_btn.png",
		backgroundSelectedImage:"images/star/a2/A2_metastar_btn_p.png",
		width: 160,
		height: 50,
		bottom:60,
		left:400,
		zIndex:40
	});
	
	right_button.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_a3")});
	view.add(right_button);
	
	var popup1_hotspot = Ti.UI.createView({
		width:240,
		height:40,
		left:150, 
		bottom:320,
		backgroundColor:"red"
	});
	
	view.add(popup1_hotspot);
	
	var popup1 = Ti.UI.createView({
		backgroundImage:"images/star/a2/A2_pop1.png",
		width:348,
		height:125,
		left:110,
		bottom: 150
	});
	
	view.add(popup1);
	
	var popup2_hotspot = Ti.UI.createView({
		width:200,
		height:40,
		right:90, 
		bottom:130,
		backgroundColor:"red"
	});
	
	view.add(popup2_hotspot);
	
	var popup2 = Ti.UI.createView({
		backgroundImage:"images/star/a2/A2_pop2.png",
		width:307,
		height:87,
		right:80,
		bottom:200
	});
	
	view.add(popup2);
	
	view.add(Views.shared.tech_nav_star('rf_energy', 'b'));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_rf_energy"}));
	view.add(Views.shared.logo("star"));
	
	
	return view;
}
