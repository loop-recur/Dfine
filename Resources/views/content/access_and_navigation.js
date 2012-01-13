Views.content.access_and_navigation = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "VertecoR ® Navigational MidLine Osteotome",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:36,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:240,
		height:'auto'
	});
	
	var label2 = Ti.UI.createLabel({
		text: "- Enables targeted cavity creation",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:20,fontWeight:'italic'},
		color:"#023f66",
		width:'auto',
		top:80,
		left:250,
		height:'auto'
	});
	
	view.add(label);
	view.add(label2);
	
	var midline = Ti.UI.createLabel({
		text: "VertecoR® Navigational MidLine Osteotome",
		font:{fontFamily:'Helvetica LT CondensedBlack',fontSize:20,fontWeight:'regular'},
		color:"#023f66",
		width:"auto",
		bottom:240,
		height:'auto'
	});
	
	view.add(midline);
	
	var midline_bullets = Ti.UI.createLabel({
		text: "Allows unipedicular access to vertebrae*. \nEnables targeted cavity creation across the vertebral midline. \nSpares cancellous bone. \nCreates preferential pathways for high viscosity StabiliT ER2 Bone Cement to follow. \nMaximizes exposed surface area to facilitate interdigitation. \n\n*85+% of procedures to date have used the unipendicular technique to enter the vertebra",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:16,fontWeight:'regular'},
		color:"#023f66",
		width:"auto",
		bottom:70,
		height:'auto',
		textAlign:"center"
	});
	
	view.add(midline_bullets);
	
	var xray = Ti.UI.createView({
		backgroundImage:"images/technology/access/xray.png",
		height:183,
		width:188,
		top:260,
		left:260
	});
	
	var xray = ClickToExpand(xray);
	
	var tool1 = Ti.UI.createView({
		backgroundImage:"images/technology/access/tool1b.png",
		height:121,
		width:234,
		top:150,
		left:450
	});
	
	var tool1 = ClickToExpand(tool1);
	
	var tool2 = Ti.UI.createView({
		backgroundImage:"images/technology/access/tool2b.png",
		height:148,
		width:265,
		top:310,
		left:550
	});
	
	var tool2 = ClickToExpand(tool2);
	
	view.add(xray);
	view.add(tool1);
	view.add(tool2);
	
	view.add(Views.content.tech_nav(view));
	win.add(view);
}
