Views.content.reimbursment = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var left_label = Ti.UI.createLabel({
		text: "Vertebral Augmentation Coding: Effective October 1, 2008 (ICD-9 CM 2010 Volumes 1 & 2)",
		font:{fontFamily:'Helvetica-Light',fontSize:20,fontWeight:'regular'},
		color:"#023f66",
		width:400,
		top:40,
		left:30,
		height:'auto'
	});
	
	var right_label2 = Ti.UI.createLabel({
		text: "CPT codes and corresponding APC codes for vertebral augmentation",
		font:{fontFamily:'Helvetica-Light',fontSize:20,fontWeight:'regular'},
		color:"#023f66",
		width:400,
		top:40,
		left:500,
		height:'auto'
	});
	
	view.add(left_label);
	view.add(right_label2);


	var left_footnote = Ti.UI.createLabel({
		text: "Product specific terms given as examples that were commercially available at the time of publication.",
		font:{fontFamily:'Helvetica-Light',fontSize:12,fontWeight:'regular'},
		color:"#023f66",
		width:400,
		top:620,
		left:30,
		height:'auto'
	});
	
	var right_footnote = Ti.UI.createLabel({
		text: "The reimbursement language herein replaces previously used terms, including, but not limited to, kyphoplasty reimbursement, kyphoplasty ICD 9 code, and kyphoplasty CPT code.",
		font:{fontFamily:'Helvetica-Light',fontSize:12,fontWeight:'regular'},
		color:"#023f66",
		width:400,
		top:620,
		left:500,
		height:'auto'
	});
	
	view.add(left_footnote);
	view.add(right_footnote);
	
	win.add(view);
}
