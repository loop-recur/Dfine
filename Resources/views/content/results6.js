Views.content.results6 = function() {	
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/stabilit/stabilit_bg_small.png",
		top:0
	});
	
	var label = Ti.UI.createLabel({
		text: "RF-TVA Extravasation Versus Conventional Balloon Kyphoplasty Complications",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:500,
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = Ti.UI.createView({
		backgroundImage:"images/results/results6.png",
		top:130,
		width:721,
		height:369
	});
	
	var content = Ti.UI.createLabel({
		text: "A comparison of leakage rates between spine fractures treatments <6 weeks old and those >6 weeks old.",
		font:{fontFamily:'Helvetica LT CondensedBlack',fontSize:15,fontWeight:'bold'},
		width:650,
		bottom:210,
		height:'auto',
		textAlign:"center"
	});
	
	var bullets = Ti.UI.createLabel({
		text: "• 138 patients underwent conventional balloon kyphoplasty to treat 203 vertebral compression fractures \n• 42 patients were treated with RF-TVA for 60 vertebral compression fractures \n• Cement leakage for patients treated with balloon kyphoplasty averaged 18.7%, but was significantly higher at 27.7% for fractures greater than 6 weeks old \n• Cement leakage with RF-TVA averaged 10.6%, but only 11.6% when delivered into fractures greater than six weeks old",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:100,
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
		text:"Licht, AW and Kramer W. One-year observation study upon a new augmentation procedure (Radiofrequency-Kyphoplasty) in the treatment of vertebral body compression fractures. Eurospine 2011.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:12,fontWeight:'regular'},
		bottom: 30,
		left:90,
		width:300,
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
	
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"b_tabs", flip_to:"b_results"}));
	view.add(Views.shared.logo());

	return view;
}