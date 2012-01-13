Views.content.pain_reduction = function(win) {
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Pain reduction",
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
	}));
	
	view.add(image);
	
	var content = Ti.UI.createLabel({
		text: "StabiliT® ER2 Bone Cement fills the pathways created by the VertecoR MidLine Osteotome to ensure targeted delivery and interdigitation throughout the vertebra, potentially resulting in a safer and more effective vertebral augmentation.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'bold'},
		width:650,
		bottom:300,
		height:'auto',
		textAlign:"center"
	});
	
	var bullets = Ti.UI.createLabel({
		text: "• 66 RF-TVA procedures were performed between December 2008 and May 2009 \n• A standard 10-point visual analog scale (VAS) was utilized to assess back pain pre- and post-operatively \n• Pain medication use and activities were defined and monitored for changes \n• Significant improvement in pain, activity, and narcotic use was observed at 6 months",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:160,
		height:'auto',
		textAlign:"center"
	});
	
	var toggle_label = UI.toggleableLabel({
		bottom: 10,
		right:50,
		text: "My Label 1"
	});
	
	var toggle_view = UI.toggleableView({
		bottom: 60,
		right:90
	});
	
	ToggleSwitch(toggle_label, toggle_view);
	view.add(toggle_label);
	view.add(toggle_view);

	view.add(label);
	view.add(content);
	view.add(bullets);
	

	win.add(view);
}
