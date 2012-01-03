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
	
	// example of view factories
	var label_toggle_view = function(attrs) {
		return Ti.UI.createLabel(merge({
			font:{fontFamily:'Helvetica-Light',fontSize:17,fontWeight:'regular'},
			color:"#023f66",
			width:'auto',
			top:400,
			left:130,
			height:'auto'
		}, attrs));
	}

	var toggle_content_view = function(attrs) {
		return Ti.UI.createView(merge({
			backgroundColor:"orange",
			height:220,
			width:180,
			top: 450,
			left:110,
			visible:false
		}, attrs));
	}
	
	var hard_switch_cable_info = toggle_content_view({});	
	var hard_switch_cable = label_toggle_view({text: "Hard Switch Cable"});
	
	ToggleSwitch(hard_switch_cable, hard_switch_cable_info);
	
	view.add(hard_switch_cable);
	view.add(hard_switch_cable_info);
	
	view.add(Views.content.tech_nav(view));
	
	win.add(view);
}
