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
		height:'auto'
	});
	
	view.add(label);
	
	var main_image = Ti.UI.createView({
		backgroundImage:"images/technology/rf/closed_tabs_system_image.png",
		height:375,
		width:475,
		top: 250
	});

	view.add(main_image);
	
	var hard_switch_cable = Ti.UI.createLabel({
		text: "Hard Switch Cable",
		font:{fontFamily:'Helvetica-Light',fontSize:17,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:400,
		left:130,
		height:'auto'
	});
	
	view.add(hard_switch_cable);	
	
	var hard_switch_cable_info = Ti.UI.createView({
		backgroundColor:"orange",
		height:220,
		width:180,
		top: 450,
		left:110,
		visible:false
	});
	
	view.add(hard_switch_cable_info);
	
	hard_switch_cable.addEventListener('click', function(){
		hard_switch_cable_info.visible = true;
	});
	
	
	win.add(view);
}
