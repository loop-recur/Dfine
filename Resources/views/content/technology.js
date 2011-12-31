Views.content.technology = function(win) {
	var view = Ti.UI.createView({
		backgroundImage: "images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Technology"
	});
	
	var button = Ti.UI.createButton({
		title: "Watch a video",
		width: 140,
		height: 40
	});
	
	button.addEventListener('click', function(){
		Controllers.content.video('iphone.mov');
	});
	
	var nav = Ti.UI.createView({
		backgroundColor: "transparent"
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
		title: "rf_energy",
		id: 'rf_energy'
	});
	
	rf_energy_button.addEventListener('click', App.swapView(view, getContent.p("rf_energy")));
	
	var access_and_navigation_button = Ti.UI.createButton({
		backgroundColor:"green",
		left: 0,
		width:60,
		height:60,
		top: 80,
		title: "access_and_navigation",
		id: 'access_and_navigation'
	});
	
	access_and_navigation_button.addEventListener('click', App.swapView(view, getContent.p("access_and_navigation")));
	
	var bone_cement_button = Ti.UI.createButton({
		backgroundColor:"yellow",
		left: 100,
		width:60,
		height:60,
		top: 80,
		title: "bone_cement",
		id: "bone_cement"
	});
	
	bone_cement_button.addEventListener('click', App.swapView(view, getContent.p("bone_cement")));

	var button_group = UI.ButtonGroup(rf_energy_button, access_and_navigation_button, bone_cement_button);
	
	nav.add(rf_energy_button);
	nav.add(access_and_navigation_button);
	nav.add(bone_cement_button);
	
	view.add(label);
	view.add(button);

	win.add(view);
	win.add(nav);
}
