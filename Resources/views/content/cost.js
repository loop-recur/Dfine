Views.content.cost = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Superior cost effectiveness at one level, additional savings in multi-level cases",
		top:150,
		height:"auto",
		width:"auto"
	});
	
	var label2 = Ti.UI.createLabel({
		text: "StabiliT® ER2 Bone Cement’s extended working time allows physicians to treat multiple levels with a single fracture kit.",
		bottom:150,
		height:"auto",
		width:"auto"
	});
	
	var cost = Ti.UI.createView({
		backgroundImage:"images/cost/cost.png",
		height:244,
		width:453,
		top:300
	})

	view.add(label);
	view.add(label2);
	view.add(cost);

	win.add(view);
}
