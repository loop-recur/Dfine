Views.shared.tech_nav = function(current, prefix) {	
	prefix = prefix || "outer";
	var layout_name = null;
	var methodName = (prefix == "outer") ? 'renderView' : 'renderSubView';

	var view = Ti.UI.createView({
		width:"100%",
		left: 0	
	});

	var nav = Ti.UI.createView({
		height:240,
		width:240,
		top:30,
		left:30
	});

	var nav_circle = Ti.UI.createView({
		backgroundImage:"images/tripoint/tripoint_sm_bg_ring.png",
		height:153,
		width:152
	});

	var rf_energy_button = Ti.UI.createButton({
		backgroundImage:"images/tripoint/tripoint_sm_rf.png",
		backgroundSelectedImage:"images/tripoint/tripoint_sm_rf_a.png",
		width:105,
		height:105,
		top:0,
		id: 'rf_energy'
	});
	
	rf_energy_button.addEventListener('click', function(e){Controllers.content[methodName](prefix+"_rf_energy")});

	var access_and_navigation_button = Ti.UI.createButton({
		backgroundImage:"images/tripoint/tripoint_sm_an.png",
		backgroundSelectedImage:"images/tripoint/tripoint_sm_an_a.png",
		left:0,
		width:105,
		height:105,
		bottom:10,
		id: 'access_and_navigation'
	});

	access_and_navigation_button.addEventListener('click', function(e){Controllers.content[methodName](prefix+"_access_and_navigation")});

	var bone_cement_button = Ti.UI.createButton({
		backgroundImage:"images/tripoint/tripoint_sm_cement.png",
		backgroundSelectedImage:"images/tripoint/tripoint_sm_cement_a.png",
		right:0,
		width:105,
		height:105,
		bottom:10,
		id: "bone_cement"
	});
	
	bone_cement_button.addEventListener('click', function(e){ Controllers.content[methodName](prefix+"_bone_cement") });

	var button_group = UI.ButtonGroup(rf_energy_button, access_and_navigation_button, bone_cement_button);
	
	if(current){
		var currentButton = {'bone_cement': bone_cement_button, 'access_and_navigation': access_and_navigation_button, 'rf_energy': rf_energy_button }[current];
		button_group.setActive(currentButton);
	}

	nav.add(nav_circle);
	nav.add(rf_energy_button);
	nav.add(access_and_navigation_button);
	nav.add(bone_cement_button);
	
	view.add(nav);
	view.add(Views.shared.tech_platform_button({top:30,right:30}));
	
	return view;
}