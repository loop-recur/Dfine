Views.content.outer_rf_energy = function() {	
	var view = Ti.UI.createView({
	});
	
	view.add(Views.shared.tech_nav('rf_energy'));
// 	
// <<<<<<< HEAD
// 	var makePlus = function(element, n) {
// 		var plus_button = Ti.UI.createImageView({
// 			image: "images/reveal_plus_sign.png",
// 			width: 25,
// 			height: 25,
// 			top: element.top,
// 			left: element.left+n
// 		});
// 
// 		plus_button.addEventListener('click', function() {
// 			element.fireEvent('click');
// 		});
// 		
// 		return plus_button;
// 	}
// 
// 	var hard_switch_cable_info = UI.toggleableView({top:430, left:745});
// 	var hard_switch_cable = UI.toggleableLabel({image:"images/reveal_plus_sign.png", text: "Hand Switch Cable", top:400, left:740});
// 	var hard_plus_button = makePlus(hard_switch_cable, 150);
// 	ToggleSwitch(hard_switch_cable, hard_switch_cable_info);
// 	view.add(hard_switch_cable);
// 	view.add(hard_plus_button);
// 	view.add(hard_switch_cable_info);
// 	
// 	var hard_switch_bullets = Ti.UI.createLabel({
// 		text: "• Enables physician to control application of RF energy from up to 10 feet away from the radiation source.",
// 		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:14,fontWeight:'regular'},
// 		color:"black",
// 		width:170,
// 		top:10,
// 		height:'auto'
// 	});
// 	
// 	hard_switch_cable_info.add(hard_switch_bullets);
// 	
// 	var multiplex_controller_info = UI.toggleableView({top:330, left:135});	
// 	var multiplex_controller = UI.toggleableLabel({text: "Multiplex Controller", top:300, left:150});
// 	var multiplex_plus_button = makePlus(multiplex_controller, 150);
// 	ToggleSwitch(multiplex_controller, multiplex_controller_info);
// 	view.add(multiplex_controller);
// 	view.add(multiplex_plus_button);
// 	view.add(multiplex_controller_info);
// 	
// 	var multiplex_bullets = Ti.UI.createLabel({
// 		text: "• Controls RF-energy applied to StabiliT   ER  Bone Cement, resulting in high viscosity cement.\n\n • Maintains viscosity of cement at consistent level throughout the procedure. \n\n • Hydraulic system allows for consistent injection of bone cement.",
// 		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:14,fontWeight:'regular'},
// 		color:"black",
// 		width:170,
// 		top:10,
// 		height:'auto',
// 		textAlign:"center"
// 	});
// 	
// 	multiplex_controller_info.add(multiplex_bullets);
// 	UI.Er2(multiplex_bullets, multiplex_controller_info, {left: 42, top: 27}, {left: 30}, {left: 51});
// 	
// 	var activation_element_info = UI.toggleableView({top:560, left:435});	
// 	var activation_element = UI.toggleableLabel({text: "Activation Element", top:530, left:450});
// 	var activation_plus_button = makePlus(activation_element, 150);
// 	
// 	ToggleSwitch(activation_element, activation_element_info);
// 	view.add(activation_element);
// 	view.add(activation_plus_button);
// 	view.add(activation_element_info);
// 	
// 	var activation_bullets = Ti.UI.createLabel({
// 		text: "• Applies energy to bone cement thus increasing its viscosity.",
// 		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:14,fontWeight:'regular'},
// 		color:"black",
// 		width:170,
// 		top:10,
// 		height:'auto'
// 	});
// 	
// 	activation_element_info.add(activation_bullets);
// 	
// 	var video = Ti.UI.createButton({
// 		backgroundImage:"images/video_button.png",
// 		title: "Activation Element",
// 		font:{fontSize:15, fontWeight:"regular"},
// 		color:"black",
// 		width: 225,
// =======
	var btn_multiplex = Ti.UI.createButton({
		title: "Multiplex Controller",
		width: 250,
// >>>>>>> 13c064598a6b5583b7f2249c614ce9c88be8d65b
		height: 50,
		bottom: 200,
		left: 50
	});
	
	var btn_metastar = Ti.UI.createButton({
		title: "MetaStar RF Generator",
		width: 250,
		height: 50,
		bottom: 200,
		right: 50
	});
	
	btn_multiplex.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "rf_cement_viscosity")});
	btn_metastar.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "rf_ablate_tumors")});
	
	view.add(btn_multiplex);
	view.add(btn_metastar);
	
	return view;
}
