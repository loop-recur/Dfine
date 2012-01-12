Views.content.bone_cement2 = function(win) {	
	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "StabiliT® ER2 Bone Cement",
		font:{fontFamily:'Helvetica-Light',fontSize:40,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:280,
		height:'auto'
	});
	
	var label2 = Ti.UI.createLabel({
		text: "- consistent interdigitation throughout the vertebra",
		font:{fontFamily:'Helvetica-Light',fontSize:20,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:80,
		left:280,
		height:'auto'
	});
	
	view.add(label);
	view.add(label2);
	
	var logo = Ti.UI.createView({
		backgroundImage:"images/dfine_logo.png",
		height:50,
		width:150,
		bottom:10,
		right:70
	});
	view.add(logo);
	
	var left_image = Ti.UI.createView({
		backgroundImage:"images/technology/bone_cement/bolus2_transparent.png",
		height:275,
		width:375,
		left: 90
	});
	
	var left_image = ClickToExpand(left_image);
	
	var right_image = Ti.UI.createView({
		backgroundImage:"images/technology/bone_cement/midlifeCement2_transparent.png",
		height:275,
		width:375,
		right:140
	});
	
	var right_image = ClickToExpand(right_image);
	
	view.add(left_image);
	view.add(right_image);
	
	var left_note = Ti.UI.createLabel({
		text: "Ultra-high viscosity StabiliT ER2 Bone Cement provides consistent interdigitation throughout the vertebre",
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'regular'},
		color:"#023f66",
		width:250,
		top:520,
		left:150,
		height:'auto'
	});
	
	var right_note = Ti.UI.createLabel({
		text: "Cement is removed from the same vertebra – brown area is evidence of cement interdigitation",
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'regular'},
		color:"#023f66",
		width:250,
		top:520,
		right:200,
		height:'auto'
	});
	
	view.add(left_note);
	view.add(right_note);
	
	var read_more = Ti.UI.createButton({
		backgroundImage:"images/page_back_button.png",
		title: "Viscosity and Working Time",
		font:{fontFamily:'Helvetica',fontSize:12,fontWeight:'bold'},
		color:"black",
		width: 200,
		height: 50,
		bottom:70,
		left:240
	});
	
	view.add(read_more);
	
	var video = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "Interdigitation",
		color:"black",
		width: 225,
		height: 50,
		bottom:70,
		right:240
	});
	
	video.addEventListener('click', function(){
		Controllers.content.video('iphone.m4v');
	});
	
	view.add(video);
	
	view.add(Views.content.tech_nav(view));
	
	var getContent = function(name) {
		Views.content[name](view);
	}
	
	read_more.addEventListener('click', App.swapView(view, getContent.p("bone_cement")));
	
	win.add(view);
}