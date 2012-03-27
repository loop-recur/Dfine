Views.content.a_technology = function() {
	// var view = Ti.UI.createView({
	// 	layout_container:"left_main",
	// 	backgroundImage:"images/stabilit/stabilit_bg.png"
	// });
	
	var view = Views.shared.bg_left_main_view("stabilit");
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/closed_tab_all_content_flat.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	var video = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "RF-TVA",
		font:{fontSize:15, fontWeight:"regular", fontStyle:"bole"},
		color:"black",
		width: 225,
		height: 50,
		bottom:100,
		left:70,
		zIndex:40
	});
	
	video.addEventListener('click', function(){
		Views.videos.show('PML2775.mp4');
	});
	
	view.add(video);
	
	var video2 = Ti.UI.createButton({
		backgroundImage:"images/star/technologycover/Cover_what_phys_vid_btn.png",
		backgroundSelectedImage:"images/star/technologycover/Cover_what_phys_vid_btn_p.png",
		width:249,
		height:49,
		bottom:190,
		left:70,
		zIndex:40
	});
	
	video2.addEventListener('click', function(){
		Views.videos.show('whatphysiciansaresaying.mp4');
	});
	
	view.add(video2);
	
	var makePlus = function(element, n) {
		var plus_button = Ti.UI.createImageView({
			image: "images/reveal_plus_sign.png",
			width: 25,
			height: 25,
			top: element.top,
			left: element.left+n,
			zIndex:40
		});

		plus_button.addEventListener('click', function() {
			element.fireEvent('click');
		});
		
		return plus_button;
	}
	
	var hard_switch_bullets = Ti.UI.createLabel({
		text: "• Unipedicular, bone sparing cavity creation \n\n • Creation of preferential paths for targeted delivery of RF-treated, ultra-high viscosity bone cement  \n\n • Optimal surface area for interdigitation \n\n • Controlled injection of bone cement",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:14,fontWeight:'regular'},
		color:"black",
		width:230,
		top:10,
		height:'auto',
		zIndex:40
	});
	
	var hard_switch_cable_info = UI.toggleableView({top:250, left:300, width:250, zIndex:40});
	var hard_switch_cable = UI.toggleableLabel({image:"images/reveal_plus_sign.png", text: "", top:220, left:420});
	var hard_plus_button = makePlus(hard_switch_cable, 150);
	hard_switch_cable_info.add(hard_switch_bullets);
	ToggleSwitch(hard_switch_cable, hard_switch_cable_info);
	view.add(hard_switch_cable);
	view.add(hard_plus_button);
	view.add(hard_switch_cable_info);
	
	
	view.add(Views.shared.tech_nav("", "a"));	
	view.add(Views.shared.flipper({tabs:"b_tabs", flip_to:"b_technology"}));
	view.add(Views.shared.logo());

	return view;
}
