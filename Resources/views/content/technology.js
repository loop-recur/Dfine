Views.content.technology = function() {
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	view.add(Views.shared.tech_platform_button({top: 10, right: 10, title: "back to outer"}));
	
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
	
	var nav_rf = Ti.UI.createButton({
		backgroundImage:"images/technology/large_nav/tech_nav_rf.png",
		backgroundSelectedImage:"images/technology/large_nav/tech_nav_rf_pressed.png",
		height:150,
		width:150,
		top:0,
		id: 'rf_energy'
	});

	var nav_access = Ti.UI.createButton({
		backgroundImage:"images/technology/large_nav/tech_nav_access.png",
		backgroundSelectedImage:"images/technology/large_nav/tech_nav_access_pressed.png",
		height:150,
		width:150,
		bottom:20,
		left:10,
		id: 'access_and_navigation'
	});
		
	var nav_bone = Ti.UI.createButton({
		backgroundImage:"images/technology/large_nav/tech_nav_bone.png",
		backgroundSelectedImage:"images/technology/large_nav/tech_nav_bone_pressed.png",
		height:150,
		width:150,
		bottom:20,
		right:10,
		id: "bone_cement"
	});
	
	nav_view.add(nav_rf);
	nav_view.add(nav_access);
	nav_view.add(nav_bone);
	
	var getContent = function(name) {
		Views.content[name](view);
	}
	
	nav_rf.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "a_rf_energy")});
	nav_access.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "a_access_and_navigation")});
	nav_bone.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "a_bone_cement")});
	
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
