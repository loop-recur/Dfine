Views.shared.tech_nav = function(current) {	

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
		backgroundImage:"images/technology/small_tech_nav_ring.png",
		height:160,
		width:160
	});

	var rf_energy_button = Ti.UI.createButton({
		backgroundImage:"images/technology/small_tech_nav_rf_inactive.png",
		backgroundSelectedImage:"images/technology/small_tech_nav_rf_active.png",
		width:110,
		height:110,
		top:0,
		id: 'rf_energy'
	});
	
	rf_energy_button.addEventListener('click', function(e){Controllers.content.renderView("rf_energy")});

	var access_and_navigation_button = Ti.UI.createButton({
		backgroundImage:"images/technology/small_tech_nav_access_inactive.png",
		backgroundSelectedImage:"images/technology/small_tech_nav_access_active.png",
		left:0,
		width:110,
		height:110,
		bottom:10,
		id: 'access_and_navigation'
	});

	access_and_navigation_button.addEventListener('click', function(e){Controllers.content.renderView("access_and_navigation")});

	var bone_cement_button = Ti.UI.createButton({
		backgroundImage:"images/technology/small_tech_nav_bone_inactive.png",
		backgroundSelectedImage:"images/technology/small_tech_nav_bone_active.png",
		right:0,
		width:110,
		height:110,
		bottom:10,
		id: "bone_cement"
	});
	
	bone_cement_button.addEventListener('click', function(e){Controllers.content.renderView("bone_cement")});

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
	view.add(Views.shared.tech_platform_button());
	
	return view;
}