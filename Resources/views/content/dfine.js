Views.content.dfine = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "DFINE at a glance",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:45,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	var label2 = Ti.UI.createLabel({
		text: "Founded in 2004 \nDirect in US and Germany. Distributionin 9 additional countries \n~150 Employees \nVenture backed company, located in San Jose, CA \nPioneered Radiofrequency Targeted Vertebral Augmentation (RF–TVA), a generational advance in the treatment of vertebral compression fractures (VCFs) \nCommitted to ongoing, clinically relevant scientific research & technology development \n",
		bottom:70,
		color:"#023f66",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:20,fontWeight:'regular'},
		height:"auto",
		width: 850,
		textAlign:"center"
	});
	
	var image = Ti.UI.createView({
		backgroundImage:"images/Picture1.jpg",
		height:425,
		width:500,
		top:80
	});
	
	view.add(image);
	view.add(label);
	view.add(label2);

	win.add(view);
}
