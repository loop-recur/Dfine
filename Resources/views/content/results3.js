Views.content.results3 = function() {	
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/stabilit/stabilit_bg_small.png",
		top:0
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
	
	var image = Ti.UI.createView({
		backgroundImage:"images/results/results3.png",
		top:80,
		left:0,
		width:706,
		height:291,
		zIndex:20
	});
	
	ClickToExpand(image);
	
	var content = Ti.UI.createLabel({
		text: "93% of patients had complete or moderate pain relief.",
		font:{fontFamily:'Helvetica LT CondensedBlack',fontSize:15,fontWeight:'bold'},
		width:650,
		bottom:320,
		height:'auto',
		textAlign:"center"
	});
	
	var bullets = Ti.UI.createLabel({
		text: "•68 levels treated with RF-TVA \n• 93% of patients had complete or moderate pain relief (>50% reduction of pre-op score) \n• 94% of procedures were unipedicular \n• 90% of patients had no extravasation \n• Extravasation was clinically insignificant",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:210,
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
		text:"Sewall L, Smith S, and Vlahos A. Clinical Evaluation of Percutaneous Vertebral Augmentation Procedures using Radiofrequency Kyphoplasty in Treatment of 69 Vertebral Compression Fractures. ASBMR 2010.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:12,fontWeight:'regular'},
		bottom: 60,
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
	

	return view;
}
