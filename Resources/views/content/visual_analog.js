Views.content.visual_analog = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});

	var label = Ti.UI.createLabel({
		text: "Visual Analog",
		font:{fontFamily:'Helvetica-Light',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = Ti.UI.createView({
		backgroundImage:"images/results/results_page2_visual_analog.png",
		top:200,
		width:722,
		height:285,
	})
	
	var content = Ti.UI.createLabel({
		text: "Pre- and post-RF-TVA pain and disability scores at 3 and 6 months.(1)",
		font:{fontFamily:'Helvetica-Light',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:200,
		height:'auto',
		textAlign:"center"
	});
	
	var bullets = Ti.UI.createLabel({
		text: "•63 patients underwent RF-TVA to treat 116 osteolytic vertebral compression fractures \n•Median pain (VAS) and Oswestry (disability) scores improved significantly post treatment and continued to maintain improved levels at 3 and 6 months(1)",
		font:{fontFamily:'Helvetica-Light',fontSize:15,fontWeight:'regular'},
		width:700,
		bottom:100,
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
