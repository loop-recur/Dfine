Views.content.dfine = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Founded in 2004",
		top:150,
		height:"auto",
		width:"auto"
	});
	
	var label2 = Ti.UI.createLabel({
		text:"Direct in US and Germany. Distributionin 9 additional countries",
		top:170,
		height:"auto",
		width:"auto"
	});
	
	var label3 = Ti.UI.createLabel({
		text: "~150 Employees",
		top:190,
		height:"auto",
		width:"auto"
	});
	
	var label4 = Ti.UI.createLabel({
		text: "Venture backed company, located in San Jose, CA",
		top:210,
		height:"auto",
		width:"auto"	
	});
	
	var label5 = Ti.UI.createLabel({
		text: "Pioneered Radiofrequency Targeted Vertebral Augmentation (RF–TVA), a generational advance in the treatment of vertebral compression fractures (VCFs)",
		top:230,
		height:"auto",
		width:"auto"	
	});
	
	var label6 = Ti.UI.createLabel({
		text: "Committed to ongoing, clinically relevant scientific research & technology development",
		top:250,
		height:"auto",
		width:"auto"	
	});

	var label7 = Ti.UI.createLabel({
		text: "DFINE at a glance",
		top:100,
		height:"auto",
		width:"auto"	
	});
	
	
	view.add(label);
	view.add(label2);
	view.add(label3);
	view.add(label4);
	view.add(label5);
	view.add(label6);
	view.add(label7);
	

	win.add(view);
}
