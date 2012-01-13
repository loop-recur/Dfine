Views.content.cost = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});

	var label = Ti.UI.createLabel({
		text: "Superior cost effectiveness at one level, additional savings in multi-level cases",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:34,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	var label2 = Ti.UI.createLabel({
		text: "- StabiliT® ER2 Bone Cement’s extended working time allows physicians to treat multiple levels with a single fracture kit.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:18,fontWeight:'italic'},
		color:"#023f66",
		width:'auto',
		top:80,
		left:40,
		height:'auto'
	});
	
	var cost = ClickToExpand(Ti.UI.createView({
		backgroundImage:"images/cost/cost.png",
		height:430,
		width:798,
		left:80,
		top:190
	}));


	var bottom_note = Ti.UI.createLabel({
		text: "StabiliT® ER2 Bone Cement’s extended working time allows physicians to treat multiple levels with a single fracture kit.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		color:"#023f66",
		width:790,
		bottom:88,
		left:85,
		height:'auto'
	});

	view.add(label);
	view.add(label2);
	view.add(cost);
	view.add(bottom_note);
	

	win.add(view);
}
