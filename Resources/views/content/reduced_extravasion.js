Views.content.reduced_extravasion = function() {	
	var view = Ti.UI.createView({
		layout_container: "center_main"
	});

	var label = Ti.UI.createLabel({
		text: "Significantly Reduced Extravasation",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = ClickToExpand(Ti.UI.createView({
		backgroundImage:"images/results/results_page4_significantly_reduced.png",
		top:90,
		width:717,
		height:349
	}), true);
	
	var content = Ti.UI.createLabel({
		text: "Use of StabiliT   ER  Bone Cement with RF-TVA significantly decreases the incidence of cement extravasation.",
		font:{fontFamily:'Helvetica LT CondensedBlack',fontSize:15,fontWeight:'bold'},
		width:650,
		bottom:280,
		height:'auto',
		textAlign:"center"
	});
	
	var bullets = Ti.UI.createLabel({
		text: "• 39 levels were treated with RF-TVA \n• 66 levels were treated with high-viscosity vertebroplasty \n• 49 levels were treated with conventional balloon kyphoplasty \n• No leakage was reported in 69% of the RF-TVA group, compared to 53% in the vertebroplasty procedure group and 41% in the conventional balloon kyphoplasty procedure group \n• This represents a significant decrease in incidence of cement leakage when using RF-TVA: \n-34% lower leakage rate than vertebroplasty3 \n- 47% lower leakage rate than conventional balloon kyphoplasty",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:110,
		height:'auto',
		textAlign:"center"
	});
	
	var toggle_label = UI.toggleableLabel({
		bottom: 80,
		left:20,
		text: "Reference",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
	});
	
	var toggle_reference = UI.toggleableLabel({
		text:"Georgy, B. Comparison between RF Kyphoplasty, balloon kyphoplasty and high viscosity vertebroplasty in treatment of spinal compression fracture.” The 2nd Joint Meeting of European Society of Neuroradiology (ESNR) & American Society of Spine Radiology (ASSR). 2011.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:12,fontWeight:'regular'},
		bottom: 60,
		left:90,
		width:430,
		height:"auto"
	});
	
	toggle_reference.visible = false;
	
	ToggleSwitch(toggle_label, toggle_reference);
	view.add(toggle_label);
	view.add(toggle_reference);

	view.add(label);
	view.add(image);
	view.add(content);
	view.add(bullets);

	UI.Er2(content, view, {left: 148}, {left: 30}, {left: 57});
	
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"b_tabs", flip_to:"b_results"}));
	view.add(Views.shared.logo());
	
	return view;
}