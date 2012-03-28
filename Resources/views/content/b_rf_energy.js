Views.content.b_rf_energy = function() {	

	var view = Views.shared.bg_left_main_view("star");
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/a2/A2_main.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	var main_image = Ti.UI.createView({
		backgroundImage:"images/star-large/DSCF0042_trans.png",
		height:384,
		width:574,
		right:100,
		top:190,
		zIndex:20
	});
	
	view.add(main_image);
	
	ClickToExpand(main_image);
	
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
	
	movie.addEventListener('click', function(){
		Views.videos.show('SpineSTAR-Thermal-Image-Short.m4v');
	});
	
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
		zIndex:40
	});
	
	view.add(popup1_hotspot);
	
	var popup1 = Ti.UI.createView({
		backgroundImage:"images/star/a2/A2_pop1.png",
		width:348,
		height:125,
		left:110,
		bottom: 150,
		visible:false,
		zIndex:21
	});
	
	view.add(popup1);
	
	ToggleSwitch(popup1_hotspot, popup1);
	
	var popup2_hotspot = Ti.UI.createView({
		width:200,
		height:40,
		right:90, 
		bottom:130,
		zIndex:40
	});
	
	view.add(popup2_hotspot);
	
	var popup2 = Ti.UI.createView({
		backgroundImage:"images/star/a2/A2_pop2.png",
		width:307,
		height:87,
		right:80,
		bottom:200,
		visible:false,
		zIndex:21
	});
	
	view.add(popup2);
	
	ToggleSwitch(popup2_hotspot, popup2);
	
	view.add(Views.shared.tech_nav_star('rf_energy', 'b'));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_rf_energy"}));
	view.add(Views.shared.logo("star"));
	
	
	return view;
}
