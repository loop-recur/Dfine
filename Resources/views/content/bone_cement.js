Views.content.bone_cement = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "StabiliT ER Bone Cement",
		font:{fontFamily:'Helvetica-Light',fontSize:40,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		height:'auto'
	});
	
	view.add(label);
	
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
	
	var right_image = Ti.UI.createView({
		backgroundImage:"images/technology/bone_cement/midlifeCement2_transparent.png",
		height:275,
		width:375,
		right:140
	});
	
	view.add(left_image);
	view.add(right_image);
	
	var read_more = Ti.UI.createButton({
		backgroundImage:"images/page_back_button.png",
		title: "Interdigitation",
		color:"black",
		width: 200,
		height: 50,
		bottom:110,
		left:240
	});
	
	read_more.addEventListener('click', function(){
		Controllers.content.video('iphone.mov');
	});
	
	view.add(read_more);
	
	var video = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "Interdigitation",
		color:"black",
		width: 225,
		height: 50,
		bottom:110,
		right:240
	});
	
	video.addEventListener('click', function(){
		Controllers.content.video('iphone.mov');
	});
	
	view.add(video);
	
	win.add(view);
}
