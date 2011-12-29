Views.content.results = function(win) {	
	var view = Ti.UI.createView({
		backgroundColor: "blue"
	});
	
	var nav = Ti.UI.createView({
		backgroundColor: "transparent"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Results"
	});
	
	var getContent = function(name) {
		Views.content[name](view);
	}

	var rf_energy_button = Ti.UI.createButton({
		backgroundColor:"red",
		left: 0,
		width:60,
		height:60,
		top: 0,
		title: "rf_energy"
	});
	
	rf_energy_button.addEventListener('click', App.swapView(view, getContent.p("rf_energy")));
	
	var access_and_navigation_button = Ti.UI.createButton({
		backgroundColor:"green",
		left: 0,
		width:60,
		height:60,
		top: 80,
		title: "rf_energy"
	});
	
	access_and_navigation_button.addEventListener('click', App.swapView(view, getContent.p("access_and_navigation")));
	
	var bone_cement_button = Ti.UI.createButton({
		backgroundColor:"yellow",
		left: 100,
		width:60,
		height:60,
		top: 80,
		title: "rf_energy"
	});
	
	bone_cement_button.addEventListener('click', App.swapView(view, getContent.p("bone_cement")));

	var button_group = UI.ButtonGroup(rf_energy_button, access_and_navigation_button, bone_cement_button);
	
	nav.add(rf_energy_button);
	nav.add(access_and_navigation_button);
	nav.add(bone_cement_button);
	
	view.add(label);
	win.add(view);
	win.add(nav);
}
