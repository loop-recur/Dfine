Views.content.results7 = function() {	
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/stabilit/stabilit_bg_small.png",
		top:0
	});
	
	var label = Ti.UI.createLabel({
		text: "Reduced Extravasation with RF-TVA",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:500,
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = Ti.UI.createView({
		backgroundImage:"images/results/results7.png",
		top:130,
		width:700,
		height:358,
		zIndex:20
	});
	
	ClickToExpand(image);

	var toggle_label = UI.toggleableLabel({
		bottom: 80,
		left:20,
		text: "Reference",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
	});
	
	var toggle_reference = UI.toggleableLabel({
		text:"Comparison of Clinical and Radiological Data in the Treatment of Patients with Osteoporotic Vertebral Compression Fractures Using
		Radiofrequency Kyphoplasty or Balloon Kyphoplasty. Pflugmacher R, Bornemann R, Koch EM, Randau TM, Müller-Broich J, Lehmann U, Weber O, Wirtz DC, Kabir K. Z Orthop Unfall. 2011 Oct 12.",
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
	
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"b_tabs", flip_to:"b_results"}));
	

	return view;
}