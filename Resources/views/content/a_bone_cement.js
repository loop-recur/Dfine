Views.content.a_bone_cement = function() {	
	
	var view = Views.shared.bg_left_main_view("stabilit");
	
	var copyright = Ti.UI.createLabel({
		text: "®",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:16,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		height:'auto',
		top:40,
		left:335
	});
	
	var two = Ti.UI.createLabel({
		text: "2",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:16,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		height:'auto',
		top:40,
		left:385
	});
	
	var label = Ti.UI.createLabel({
		text: "StabiliT  ER  Bone Cement - Ultra high viscosity and extended working time",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:36,fontWeight:'regular'},
		color:"#023f66",
		width:550,
		top:40,
		left:240,
		height:'auto'
	});
	
	// var label2 = Ti.UI.createLabel({
	// 	text: "- Unmatched viscosity and working time",
	// 	font:{fontFamily:'Helvetica LT CondensedLight',fontSize:20,fontWeight:'italic'},
	// 	color:"#023f66",
	// 	width:'auto',
	// 	top:80,
	// 	left:250,
	// 	height:'auto'
	// });
	
	view.add(label);
	// view.add(label2);
	view.add(copyright);
	view.add(two);
	
	var image = Ti.UI.createView({
		backgroundImage:"images/technology/bone_cement/bonecement1.png",
		height:351,
		width:721,
		top:225
	});
	
	view.add(image);
	
	var read_more = Ti.UI.createButton({
		backgroundImage:"images/page_fwd_button.png",
		title: "Interdigitation",
		font:{fontFamily:'Helvetica',fontSize:17,fontWeight:'bold'},
		color:"black",
		width: 200,
		height: 50,
		bottom:70,
		right:240,
		zIndex:40
	});
	
	view.add(read_more);
	
	var video = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "StabiliT   ER  Bone Cement",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:16,fontWeight:'regular'},
		color:"black",
		width: 250,
		height: 50,
		bottom:70,
		left:240,
		zIndex:40
	});
	
	video.addEventListener('click', function(){
		Views.videos.show('1115.mp4');
	});
	
	view.add(video);
	view.add(Views.shared.tech_nav('bone_cement', "a"));
	
	UI.Er2(video, view, {left: 303, bottom: 93,zIndex:41}, {left: 30}, {left: 55});
	
	
	var foot_note = Ti.UI.createLabel({
		text: "StabiliT   ER   Bone Cement quickly reaches and stabilizes at an ultra-high viscosity for an extended period of time.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:16,fontWeight:'regular'},
		color:"#023f66",
		width:580,
		bottom:135,
		height:'auto',
		textAlign:"center"
	});
	
	UI.Er2(foot_note, view, {left: 220}, {left: 30}, {left: 55});
	
	view.add(foot_note);
	
	read_more.addEventListener('click', function(e){Controllers.content.renderView("a_tabs", "a_bone_cement2")});
	view.add(Views.shared.logo());
	
	return view;
}
