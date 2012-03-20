Views.content.extra_vs_vertebro = function() {	
	var view = Ti.UI.createView({
		layout_container: "center_main"
	});
	
	var label = Ti.UI.createLabel({
		text: "RF-TVA Extravasation Versus Vertebroplasty Extravasation",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:700,
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = ClickToExpand(Ti.UI.createView({
		backgroundImage:"images/results/results_page5_RF-TVA_vs_vertebro.png",
		top:130,
		left:30,
		width:670,
		height:120,
	}));
	
	var bullets = Ti.UI.createLabel({
		text: "	• 60 patients underwent RF-TVA to treat 92 osteoporotic vertebral compression fractures \n• 39 patients were treated for 52 spine fractures (control group) \n• Patients that underwent RF-TVA experienced 54% fewer incidence of cement leakage and saw a restorative increase in height",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:370,
		height:'auto',
		textAlign:"center"
	});
	
	var toggle_label = UI.toggleableLabel({
		bottom: 20,
		right:70,
		text: "Reference",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
	});
	
	var toggle_reference = UI.toggleableLabel({
		text:"Pflugmacher R, Randau T, Kabir K, and Wirtz DC. Radiofrequency (RF) Kyphoplasty in comparison to in Vertebroplasty (VP) A prospective evaluation. IOF WCO-ECCEO10 2010.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:12,fontWeight:'regular'},
		bottom: 40,
		right:70,
		width:300,
		height:"auto"
	});
	
	toggle_reference.visible = false;
	
	ToggleSwitch(toggle_label, toggle_reference);
	view.add(toggle_label);
	view.add(toggle_reference);

	view.add(label);
	view.add(image);
	view.add(bullets);

	return view;
}