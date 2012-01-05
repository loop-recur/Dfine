Views.content.reimbursment = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Vertebral Augmentation Coding: Effective October 1, 2008 (ICD-9 CM 2010 Volumes 1 & 2)",
		height:"auto",
		width:400,
		top:100,
		left:20
	});
	
	var label2 = Ti.UI.createLabel({
		text: "CPT codes and corresponding APC codes for vertebral augmentation",
		height:"auto",
		width:400,
		top:100,
		right:100
	});
	
	view.add(label);
	view.add(label2);

	win.add(view);
}
