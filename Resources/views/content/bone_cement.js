Views.content.bone_cement = function(win) {	
	
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
		text: "- Unmatched viscosity and working time",
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
	
	var image = Ti.UI.createView({
		backgroundImage:"images/technology/bone_cement/bonecement1.png",
		height:268,
		width:640
	});
	
	view.add(image);
	
	var read_more = Ti.UI.createButton({
		backgroundImage:"images/page_fwd_button.png",
		title: "Interdigitation",
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
		title: "High Viscosity",
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
	
	var foot_note = Ti.UI.createLabel({
		text: "StabiliT® ER2 Bone Cement quickly reaches and stabilizes at an ultra-high viscosity for an extended period of time.",
		font:{fontFamily:'Helvetica-Light',fontSize:14,fontWeight:'regular'},
		color:"#023f66",
		width:500,
		bottom:180,
		height:'auto',
		textAlign:"center"
	});
	
	view.add(foot_note);
	
	var getContent = function(name) {
		Views.content[name](view);
	}
	
	read_more.addEventListener('click', App.swapView(view, getContent.p("bone_cement2")));
	
	win.add(view);
}
