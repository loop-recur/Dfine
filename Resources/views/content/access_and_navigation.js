Views.content.access_and_navigation = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "VertecoR ® Navigational MidLine Osteotome",
		font:{fontFamily:'Helvetica-Light',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:280,
		height:'auto'
	});
	
	var label2 = Ti.UI.createLabel({
		text: "Enables targeted cavity creation",
		font:{fontFamily:'Helvetica-Light',fontSize:20,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:70,
		left:280,
		height:'auto'
	});
	
	view.add(label);
	view.add(label2);
	
	var midline = Ti.UI.createLabel({
		text: "VertecoR® Navigational MidLine Osteotome",
		font:{fontFamily:'Helvetica-Light',fontSize:20,fontWeight:'regular'},
		color:"#023f66",
		width:"auto",
		bottom:250,
		height:'auto'
	});
	
	view.add(midline);
	
	var midline_bullets = Ti.UI.createLabel({
		text: "Allows unipedicular access to vertebrae*. \nEnables targeted cavity creation across the vertebral midline. \nSpares cancellous bone. \nCreates preferential pathways for high viscosity StabiliT ER2 Bone Cement to follow. \nMaximizes exposed surface area to facilitate interdigitation. \n*85+% of procedures to date have used the unipendicular technique to enter the vertebra",
		font:{fontFamily:'Helvetica-Light',fontSize:16,fontWeight:'regular'},
		color:"#023f66",
		width:"auto",
		bottom:100,
		height:'auto',
		textAlign:"center"
	});
	
	view.add(midline_bullets);
	
	var xray = Ti.UI.createView({
		backgroundImage:"images/technology/access/xray.png",
		height:183,
		width:188,
		top:230,
		left:200
	})
	
	var tool1 = Ti.UI.createView({
		backgroundImage:"images/technology/access/tool1.png",
		height:121,
		width:234,
		top:200,
		left:450
	})
	
	var tool2 = Ti.UI.createView({
		backgroundImage:"images/technology/access/tool2.png",
		height:148,
		width:265,
		top:290,
		left:600
	})
	
	view.add(xray);
	view.add(tool1);
	view.add(tool2);
	
	

	view.add(Views.content.tech_nav(view));
	win.add(view);
}
