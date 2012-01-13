Views.content.rf_energy = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "MultiPlex Controller and Activation Element",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:36,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:240,
		height:'auto'
	});
	
	var label2 = Ti.UI.createLabel({
		text: "- Best-in-class RF Technology",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:20,fontWeight:'italic'},
		color:"#023f66",
		width:'auto',
		top:80,
		left:250,
		height:'auto'
	});
	
	view.add(label);
	view.add(label2);
	
	var main_image = Ti.UI.createView({
		backgroundImage:"images/technology/rf/363.png",
		height:550,
		width:882,
		top:90
	});

	view.add(main_image);

	var hard_switch_cable_info = UI.toggleableView({top:430, left:745});	
	var hard_switch_cable = UI.toggleableLabel({image:"images/reveal_plus_sign.png", text: "Hard Switch Cable", top:400, left:760});
	ToggleSwitch(hard_switch_cable, hard_switch_cable_info);
	view.add(hard_switch_cable);
	view.add(hard_switch_cable_info);
	
	var hard_switch_bullets = Ti.UI.createLabel({
		text: "Enables physician to control application of RF energy from up to 10 feet away from the radiation source.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:170,
		top:2,
		height:'auto'
	});
	
	hard_switch_cable_info.add(hard_switch_bullets);
	
	var multiplex_controller_info = UI.toggleableView({top:330, left:135});	
	var multiplex_controller = UI.toggleableLabel({text: "Multiplex Controller", top:300, left:150});
	ToggleSwitch(multiplex_controller, multiplex_controller_info);
	view.add(multiplex_controller);
	view.add(multiplex_controller_info);
	
	var multiplex_bullets = Ti.UI.createLabel({
		text: "Controls RF-energy applied to StabiliT ER2 Bone Cement, resulting in high viscosity cement.\n Maintains viscosity of cement at consistent level throughout the procedure. \nHydraulic system allows for consistent injection of bone cement.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:170,
		top:2,
		height:'auto',
		textAlign:"center"
	});
	
	multiplex_controller_info.add(multiplex_bullets);
	
	var activation_element_info = UI.toggleableView({top:550, left:435});	
	var activation_element = UI.toggleableLabel({text: "Activation Element", top:530, left:450});
	ToggleSwitch(activation_element, activation_element_info);
	view.add(activation_element);
	view.add(activation_element_info);	
	
	var activation_bullets = Ti.UI.createLabel({
		text: "Applies RF energy to bone cement thus increasing its viscosity.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:170,
		top:2,
		height:'auto'
	});
	
	activation_element_info.add(activation_bullets);
	
	var video = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "Activation Element",
		font:{fontSize:15, fontWeight:"regular"},
		color:"black",
		width: 225,
		height: 50,
		bottom:40,
		right:370
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
		bottom:40,
		right:100
	});
	
	video2.addEventListener('click', function(){
		Controllers.content.video('2772.m4v');
	});
	
	view.add(video2);
	
	view.add(Views.content.tech_nav(view));
	win.add(view);
}
