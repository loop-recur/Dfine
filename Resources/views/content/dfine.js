Views.content.dfine = function(win) {	
	var view = Ti.UI.createView({
	});
	
	var label = Ti.UI.createLabel({
		text: "DFINE at a glance",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:45,fontWeight:'regular'},
		color:"#023f66",
		width:450,
		top:40,
		left:10,
		height:'auto',
		textAlign:"right"
	});
	
	var label2 = Ti.UI.createLabel({
		text: "Founded in 2004 \n\nDirect in US and Germany. Distribution in 9 additional countries \n\n~150 Employees \n\nVenture backed company, located in San Jose, CA \n\nPioneered Radiofrequency Targeted Vertebral Augmentation (RF–TVA), a generational advance in the treatment of vertebral compression fractures (VCFs) \n\nCommitted to ongoing, clinically relevant scientific research & technology development",
		top:140,
		left:10,
		color:"#023f66",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:20,fontWeight:'regular'},
		height:"auto",
		width: 450,
		textAlign:"right"
	});
	
	var image = Ti.UI.createView({
		backgroundImage:"images/building.png",
		height:678,
		width:454,
		right:80
	});
	
	view.add(image);
	view.add(label);
	view.add(label2);
	
	view.add(Views.shared.tech_platform_button()); 
	
	return view;
}
