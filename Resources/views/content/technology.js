Views.content.technology = function(win) {
	var view = Ti.UI.createView({
		backgroundImage: "images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Interventional Technology Platform",
		font:{fontFamily:'Helvetica-Light',fontSize:40,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		height:'auto'
	});
	
	view.add(label);
	
	var nav_view = Ti.UI.createView({
		height:430,
		width:430
	});
	
	var nav_circle = Ti.UI.createView({
		backgroundImage:"images/technology/large_nav/tech_nav_bg.png",
		height:400,
		width:400,
		bottom:0
	});
	
	nav_view.add(nav_circle);
	
	var nav_rf = Ti.UI.createButton({
		backgroundImage:"images/technology/large_nav/tech_nav_rf.png",
		backgroundSelectedImage:"images/technology/large_nav/tech_nav_rf_pressed.png",
		height:130,
		width:130,
		top:0,
		id: 'rf_energy'
	});

	var nav_access = Ti.UI.createButton({
		backgroundImage:"images/technology/large_nav/tech_nav_access.png",
		backgroundSelectedImage:"images/technology/large_nav/tech_nav_access_pressed.png",
		height:130,
		width:130,
		bottom:20,
		left:10,
		id: 'access_and_navigation'
	});
		
	var nav_bone = Ti.UI.createButton({
		backgroundImage:"images/technology/large_nav/tech_nav_bone.png",
		backgroundSelectedImage:"images/technology/large_nav/tech_nav_bone_pressed.png",
		height:130,
		width:130,
		bottom:20,
		right:10,
		id: "bone_cement"
	});
	
	nav_view.add(nav_rf);
	nav_view.add(nav_access);
	nav_view.add(nav_bone);
	
	var button = Ti.UI.createButton({
		title: "Watch a video",
		width: 140,
		height: 40,
		bottom:0
	});
	
	button.addEventListener('click', function(){
		Controllers.content.video('iphone.mov');
	});
	
	view.add(button);
	view.add(nav_view);
		
	win.add(view);
	
	Views.content.tech_nav(win, view);
}
