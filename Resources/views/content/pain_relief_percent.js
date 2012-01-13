Views.content.pain_relief_percent = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});

	var label = Ti.UI.createLabel({
		text: "Pain Relief Percent",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = ClickToExpand(Ti.UI.createView({
		backgroundImage:"images/results/results_page3_percent_patients.png",
		top:80,
		width:722,
		height:285
	}));
	
	var content = Ti.UI.createLabel({
		text: "93% of patients had complete or moderate pain relief.(2)",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'bold'},
		width:650,
		bottom:380,
		height:'auto',
		textAlign:"center"
	});
	
	var bullets = Ti.UI.createLabel({
		text: "•68 levels treated with RF-TVA \n• 93% of patients had complete or moderate pain relief (>50% reduction of pre-op score) (2) \n• 94% of procedures were unipedicular \n• 90% of patients had no extravasation(2) \n• Extravasation was clinically insignificant(2)",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:250,
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
	view.add(image);
	view.add(content);
	view.add(bullets);

	win.add(view);
}
