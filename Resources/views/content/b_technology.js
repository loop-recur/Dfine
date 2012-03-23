Views.content.b_technology = function() {
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	
	// view.add(Views.shared.tech_platform_button());
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/technologycover/Star_Cover_main.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	var overview_button = Ti.UI.createButton({
		backgroundImage:"images/star/technologycover/Cover_treating_meta_btn.png",
		backgroundSelectedImage:"images/star/technologycover/Cover_treating_meta_btn_p.png",
		width: 167,
		height: 50,
		bottom:300,
		left:35,
		zIndex:40
	});
	
	overview_button.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_a7")});
	view.add(overview_button);
	
	var procedure_button = Ti.UI.createButton({
		backgroundImage:"images/star/technologycover/Cover_t-RFA_vid_btn.png",
		backgroundSelectedImage:"images/star/technologycover/Cover_t-RFA_vid_btn_p.png",
		width:249,
		height:49,
		bottom:50,
		left:60,
		zIndex:40
	});
	
	view.add(procedure_button);
	
	procedure_button.addEventListener('click', function(){
		Views.videos.show('PML3361-544.m4v');
	});
	
	var saying_button = Ti.UI.createButton({
		backgroundImage:"images/star/technologycover/Cover_what_phys_vid_btn.png",
		backgroundSelectedImage:"images/star/technologycover/Cover_what_phys_vid_btn_p.png",
		width:249,
		height:49,
		bottom:50,
		left: 350,
		zIndex:40
	});
	
	view.add(saying_button);
	
	saying_button.addEventListener('click', function(){
		Views.videos.show('whatphysiciansaresaying.mp4');
	});
	
	var popup1_hotspot = Ti.UI.createView({
		width:290,
		height:30,
		left:200, 
		bottom:130,
		zIndex:40
	});
	
	view.add(popup1_hotspot);
	
	var popup1 = Ti.UI.createView({
		backgroundImage:"images/star/technologycover/Cover_pop1.png",
		width:257,
		height:87,
		left:200,
		bottom: 200,
		visible:false
	});
	
	view.add(popup1);
	
	ToggleSwitch(popup1_hotspot, popup1);
	
	var popup2_hotspot = Ti.UI.createView({
		width:180,
		height:60,
		right:40, 
		bottom:380,
		zIndex:40
	});
	
	view.add(popup2_hotspot);
	
	var popup2 = Ti.UI.createView({
		backgroundImage:"images/star/technologycover/Cover_pop2.png",
		width:257,
		height:87,
		right:60,
		bottom:200,
		visible:false
	});
	
	view.add(popup2);
	
	ToggleSwitch(popup2_hotspot, popup2);

	view.add(Views.shared.tech_nav_star("", "b"));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_technology"}));
	view.add(Views.shared.logo("star"));
	
	return view;
}
