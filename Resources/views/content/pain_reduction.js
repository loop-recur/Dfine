Views.content.pain_reduction = function() {
	var view = Ti.UI.createView({
	});
	
	var label = Ti.UI.createLabel({
		text: "Significant Pain Reduction",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = ClickToExpand(Ti.UI.createView({
		backgroundImage:"images/results/results_page1_significant_pain.png",
		top:100,
		width:722,
		height:285,
	}), true);
	
	view.add(image);

	var content = Ti.UI.createLabel({
		text: "StabiliT   ER  Bone Cement fills the pathways created by the VertecoR MidLine Osteotome to ensure targeted delivery and interdigitation throughout the vertebra, potentially resulting in a safer and more effective vertebral augmentation.",
		font:{fontFamily:'Helvetica LT CondensedBlack',fontSize:15,fontWeight:'bold'},
		width:650,
		bottom:300,
		height:'auto',
		textAlign:"center"
	});
	
	var bullets = Ti.UI.createLabel({
		text: "• 66 RF-TVA procedures were performed between December 2008 and May 2009 \n• A standard 10-point visual analog scale (VAS) was utilized to assess back pain pre- and post-operatively \n• Pain medication use and activities were defined and monitored for changes \n• Significant improvement in pain, activity, and narcotic use was observed at 6 months",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:170,
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
		text:"Erdem, E. Radiofrequency Kyphoplasty (RFK) for the Treatment of Vertebral Compression Fractures As A Result of Multiple Myeloma. ASSR 2011.",
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
	view.add(content);
	view.add(bullets);
	UI.Er2(content, view, {left: 92, bottom: 347}, {left: 30}, {left: 56});
	
	return view;
}
