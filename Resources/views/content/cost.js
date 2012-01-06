Views.content.cost = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});

	var label = Ti.UI.createLabel({
		text: "Superior cost effectiveness at one level, additional savings in multi-level cases",
		font:{fontFamily:'Helvetica-Light',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:800,
		top:40,
		left:30,
		height:'auto'
	});
	
	var label2 = Ti.UI.createLabel({
		text: "StabiliT® ER2 Bone Cement’s extended working time allows physicians to treat multiple levels with a single fracture kit.",
		font:{fontFamily:'Helvetica-Light',fontSize:20,fontWeight:'regular'},
		color:"#023f66",
		width:800,
		top:110,
		left:30,
		height:'auto'
	});
	
	var cost = Ti.UI.createView({
		backgroundImage:"images/cost/cost.png",
		height:244,
		width:453,
		top:300
	})


	var bottom_note = Ti.UI.createLabel({
		text: "StabiliT® ER2 Bone Cement’s extended working time allows physicians to treat multiple levels with a single fracture kit.",
		font:{fontFamily:'Helvetica-Light',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:600,
		bottom:50,
		height:'auto'
	});

	view.add(label);
	view.add(label2);
	view.add(cost);
	view.add(bottom_note);
	

	win.add(view);
}
