Views.content.visual_analog = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});

	var label = Ti.UI.createLabel({
		text: "Visual Analog Scale Pain Scores vs. Oswestry Disability Scores",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = ClickToExpand(Ti.UI.createView({
		backgroundImage:"images/results/results_page2_visual_analog.png",
		top:100,
		width:722,
		height:285
	}));
	
	var content = Ti.UI.createLabel({
		text: "Pre- and post-RF-TVA pain and disability scores at 3 and 6 months.(1)",
		font:{fontFamily:'Helvetica LT CondensedBlack',fontSize:15,fontWeight:'bold'},
		width:650,
		bottom:330,
		height:'auto',
		textAlign:"center"
	});
	
	var bullets = Ti.UI.createLabel({
		text: "•63 patients underwent RF-TVA to treat 116 osteolytic vertebral compression fractures \n•Median pain (VAS) and Oswestry (disability) scores improved significantly post treatment and continued to maintain improved levels at 3 and 6 months(1)",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:230,
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
		text:"Reference: Pflugmacher R, Randau T, Kabir K, and Wirtz DC. Radiofrequency (RF) Kyphoplasty in treatment of osteolytic vertebral fractures. IOF WCO-ECCEO10 2010.",
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
