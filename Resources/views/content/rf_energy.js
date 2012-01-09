Views.content.rf_energy = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "MultiPlex Controller and Activation Element",
		font:{fontFamily:'Helvetica-Light',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:280,
		height:'auto'
	});
	
	var label2 = Ti.UI.createLabel({
		text: "Best-in-class RF Technology",
		font:{fontFamily:'Helvetica-Light',fontSize:20,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:70,
		left:280,
		height:'auto'
	});
	
	view.add(label);
	view.add(label2);
	
	var main_image = Ti.UI.createView({
		backgroundImage:"images/technology/rf/closed_tabs_system_image.png",
		height:375,
		width:475,
		top: 250
	});

	view.add(main_image);
	
	// example of view factories
	var label_toggle_view = function(attrs) {
		return Ti.UI.createLabel(merge({
			font:{fontFamily:'Helvetica-Light',fontSize:17,fontWeight:'regular'},
			color:"#023f66",
			width:'auto',
			top:400,
			left:130,
			height:'auto'
		}, attrs));
	}

	var toggle_content_view = function(attrs) {
		return Ti.UI.createView(merge({
			backgroundColor:"#EDEDED",
			height:220,
			width:180,
			top: 450,
			left:130,
			visible:false
		}, attrs));
	}
	
	var hard_switch_cable_info = toggle_content_view({top:430, left:145});	
	var hard_switch_cable = label_toggle_view({image:"images/reveal_plus_sign.png", text: "Hard Switch Cable", top:400, left:160});
	ToggleSwitch(hard_switch_cable, hard_switch_cable_info);
	view.add(hard_switch_cable);
	view.add(hard_switch_cable_info);
	
	var hard_switch_bullets = Ti.UI.createLabel({
		text: "Enables physician to control application of RF energy from up to 10 feet away from the radiation source.",
		font:{fontFamily:'Helvetica-Light',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:170,
		top:2,
		height:'auto'
	});
	
	hard_switch_cable_info.add(hard_switch_bullets);
	
	var multiplex_controller_info = toggle_content_view({top:260, left:555});	
	var multiplex_controller = label_toggle_view({text: "Multiplex Controller", top:230, left:570});
	ToggleSwitch(multiplex_controller, multiplex_controller_info);
	view.add(multiplex_controller);
	view.add(multiplex_controller_info);
	
	var multiplex_bullets = Ti.UI.createLabel({
		text: "Controls RF-energy applied to StabiliT ER2 Bone Cement, resulting in high viscosity cement.\n Maintains viscosity of cement at consistent level throughout the procedure. \nHydraulic system allows for consistent injection of bone cement.",
		font:{fontFamily:'Helvetica-Light',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:170,
		top:2,
		height:'auto'
	});
	
	multiplex_controller_info.add(multiplex_bullets);
	
	var activation_element_info = toggle_content_view({top:510, left:685});	
	var activation_element = label_toggle_view({text: "Activation Element", top:480, left:700});
	ToggleSwitch(activation_element, activation_element_info);
	view.add(activation_element);
	view.add(activation_element_info);	
	
	var activation_bullets = Ti.UI.createLabel({
		text: "Applies RF energy to bone cement thus increasing its viscosity.",
		font:{fontFamily:'Helvetica-Light',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:170,
		top:2,
		height:'auto'
	});
	
	activation_element_info.add(activation_bullets);
	
	var video = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "Activation Element 2",
		font:{fontSize:15, fontWeight:"regular"},
		color:"black",
		width: 225,
		height: 50,
		bottom:70,
		right:200
	});
	
	video.addEventListener('click', function(){
		Controllers.content.video('1482.m4v');
	});
	
	view.add(video);
	
	var video2 = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "Watch Video",
		font:{fontSize:15, fontWeight:"regular"},
		color:"black",
		width: 225,
		height: 50,
		bottom:70,
		right:200
	});
	
	video2.addEventListener('click', function(){
		Controllers.content.video('2772.m4v');
	});
	
	view.add(video2);
	
	view.add(Views.content.tech_nav(view));
	win.add(view);
}
