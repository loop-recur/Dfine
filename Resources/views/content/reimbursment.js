Views.content.reimbursment = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Vertebral Augmentation Coding: Effective October 1, 2008 (ICD-9 CM 2010 Volumes 1 & 2)",
		font:{fontFamily:'Helvetica-Light',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	var label2 = Ti.UI.createLabel({
		text: "CPT codes and corresponding APC codes for vertebral augmentation",
		font:{fontFamily:'Helvetica-Light',fontSize:20,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:70,
		left:30,
		height:'auto'
	});
	
	view.add(label);
	view.add(label2);

	win.add(view);
}
