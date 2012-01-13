Views.content.pain_relief_percent = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});

	var label = Ti.UI.createLabel({
		text: "Percent of Patients With Pain Relief",
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
		left:20,
		width:700,
		height:285,
	}));
	
	var content = Ti.UI.createLabel({
		text: "93% of patients had complete or moderate pain relief.(2)",
		font:{fontFamily:'Helvetica LT CondensedBlack',fontSize:15,fontWeight:'bold'},
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
		bottom: 20,
		right:70,
		text: "Reference",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
	});
	
	var toggle_reference = UI.toggleableLabel({
		text:"Reference: Sewall L, Smith S, and Vlahos A. Clinical Evaluation of Percutaneous Vertebral Augmentation Procedures using Radiofrequency Kyphoplasty in Treatment of 69 Vertebral Compression Fractures. ASBMR 2010.",
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
	view.add(content);
	view.add(bullets);

	win.add(view);
}
