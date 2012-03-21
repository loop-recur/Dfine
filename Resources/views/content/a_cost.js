Views.content.a_cost = function() {	
	var view = Ti.UI.createView({
		layout_container: "left_main"
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
	
	// var label2 = Ti.UI.createLabel({
	// 	text: "- StabiliT   ER  Bone Cement’s extended working time allows physicians to treat multiple levels with a single fracture kit.",
	// 	font:{fontFamily:'Helvetica LT CondensedLight',fontSize:18,fontWeight:'italic'},
	// 	color:"#023f66",
	// 	width:'auto',
	// 	top:80,
	// 	left:40,
	// 	height:'auto'
	// });
	
	var cost = ClickToExpand(Ti.UI.createView({
		backgroundImage:"images/cost/cost.png",
		height:264,
		width:503,
		left:240,
		top:160
	}));

	var bottom_note = Ti.UI.createLabel({
		text: "StabiliT   ER  Bone Cement’s extended working time allows physicians to treat multiple levels with a single fracture kit.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		color:"#023f66",
		width:500,
		bottom:270,
		left:245,
		height:'auto',
		textAlign:"center"
	});

	view.add(label);
	// view.add(label2);
	view.add(cost);
	view.add(bottom_note);
	// UI.Er2(label2, view, {left: 69, top: 78}, {left: 30}, {left: 57});
	UI.Er2(bottom_note, view, {left: 244, bottom: 297}, {left: 30}, {left: 54});

	return view;
}
