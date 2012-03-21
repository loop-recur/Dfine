Views.content.main_screen = function() {
	var view = Ti.UI.createView({
		width:"100%",
		left: 0
	});
	
	var copyright = Ti.UI.createLabel({
		text: "®",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:19,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		height:'auto',
		top:50,
		left:333
	});
	
	var label = Ti.UI.createLabel({
		text: "StabiliT  System Technology Platform",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:46,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:50,
		height:'auto'
	});
	
	view.add(label);
	view.add(copyright);
	
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
	
	var nav_center = Ti.UI.createView({
		backgroundImage:"images/technology/large_nav/tech_nav_center.png",
		width:150,
		height:137
	});
	
	nav_view.add(nav_center);
	
	var btn_nav_rf = Ti.UI.createButton({
		backgroundImage:"images/technology/large_nav/tech_nav_rf.png",
		backgroundSelectedImage:"images/technology/large_nav/tech_nav_rf_pressed.png",
		height:150,
		width:150,
		top:0,
		id: 'rf_energy'
	});

	btn_nav_rf.addEventListener('click', function(e){Controllers.content.renderView("outer_rf_energy")});
	nav_view.add(btn_nav_rf);

	var btn_nav_access = Ti.UI.createButton({
		backgroundImage:"images/technology/large_nav/tech_nav_access.png",
		backgroundSelectedImage:"images/technology/large_nav/tech_nav_access_pressed.png",
		height:150,
		width:150,
		bottom:20,
		left:10,
		id: 'access_and_navigation'
	});
	
	btn_nav_access.addEventListener('click', function(e){Controllers.content.renderView("outer_access_and_navigation")});
	nav_view.add(btn_nav_access);
		
	var btn_nav_bone = Ti.UI.createButton({
		backgroundImage:"images/technology/large_nav/tech_nav_bone.png",
		backgroundSelectedImage:"images/technology/large_nav/tech_nav_bone_pressed.png",
		height:150,
		width:150,
		bottom:20,
		right:10,
		id: "bone_cement"
	});
	
	btn_nav_bone.addEventListener('click', function(e){Controllers.content.renderView("bone_cement")});
	nav_view.add(btn_nav_bone);
	
	var btn_back_to_dfine = Ti.UI.createButton({
		title: "Back to Dfine",
		height:50,
		width:150,
		bottom:0,
		right:0
	});

	btn_back_to_dfine.addEventListener('click', function(e){Controllers.content.renderView("dfine")});
	view.add(btn_back_to_dfine);

	var rf_sub = Ti.UI.createLabel({
		text: "RF to modulate bone cement viscosity",
		font:{fontFamily:'Helvetica',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:200,
		top:160,
		left:570,
		height:'auto'
	});
	
	var access_sub = Ti.UI.createLabel({
		text: "Articulating osteotome enables site/size specificity",
		font:{fontFamily:'Helvetica',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:200,
		top:575,
		left:220,
		height:'auto'
	});
	
	var bone_sub = Ti.UI.createLabel({
		text: "Ultra-high viscosity cement, ideal for osteoporotic VCF applications",
		font:{fontFamily:'Helvetica',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:200,
		left:620,
		top:575,
		height:'auto'
	});
	
	view.add(access_sub);
	view.add(rf_sub);
	view.add(bone_sub);
	view.add(nav_view);
	
	return view;
}
