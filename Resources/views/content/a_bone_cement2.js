Views.content.a_bone_cement2 = function() {	
	
	var view = Ti.UI.createView({
		layout_container: "left_main"
	});
	
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
		text: "StabiliT  ER  Bone Cement - Interdigitation and optimized fill",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:36,fontWeight:'regular'},
		color:"#023f66",
		width:700,
		top:40,
		left:240,
		height:'auto'
	});
		
	// var label2 = Ti.UI.createLabel({
	// 	text: "- consistent interdigitation throughout the vertebra",
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
	
	var left_image = Ti.UI.createView({
		backgroundImage:"images/technology/bone_cement/bolus2_transparent.png",
		height:275,
		width:375,
		left: 90,
		top:200
	});
	
	var left_image = ClickToExpand(left_image);
	
	var right_image = Ti.UI.createView({
		backgroundImage:"images/technology/bone_cement/midlifeCement2_transparent.png",
		height:275,
		width:375,
		right:140,
		top:200
	});
	
	var right_image = ClickToExpand(right_image);
	
	view.add(left_image);
	view.add(right_image);
	
	// var left_note = Ti.UI.createLabel({
	// 	text: "Ultra-high viscosity StabiliT  ER  Bone Cement provides consistent interdigitation throughout the vertebra",
	// 	font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'regular'},
	// 	color:"#023f66",
	// 	width:250,
	// 	top:520,
	// 	left:150,
	// 	height:'auto'
	// });
	
	var left_note = Ti.UI.createLabel({
		text: "Cross section of vertebral body demonstrates extensive interdigitation and optimized fill.",
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'regular'},
		color:"#023f66",
		width:300,
		top:500,
		left:130,
		height:'auto'
	});
	
	// UI.Er2(left_note, view, {left: 312}, {left: 30}, {left: 60});
	
	// var right_note = Ti.UI.createLabel({
	// 	text: "Cement is removed from the same vertebra – brown area is evidence of cement interdigitation",
	// 	font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'regular'},
	// 	color:"#023f66",
	// 	width:250,
	// 	top:520,
	// 	right:200,
	// 	height:'auto'
	// });
	
	var right_note = Ti.UI.createLabel({
		text: "The orange area indicates where the StabiliT  ER   ultra high viscosity cement penetrated the vertebral body. Note the high degree of remaining intact cancellous bone and the relative size of the targeted cavity versus the high degree of cement interdigitation.",
		font:{fontFamily:'Helvetica',fontSize:15,fontWeight:'regular'},
		color:"#023f66",
		width:350,
		top:500,
		right:150,
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
		title: "StabiliT   ER  Bone Cement",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:16,fontWeight:'regular'},
		color:"black",
		width: 250,
		height: 50,
		bottom:70,
		right:240
	});

	video.addEventListener('click', function(){
		Controllers.content.video('PML2775-a-bone2-157-208.mov');
	});
	
	view.add(video);
	UI.Er2(video, view, {left: 462, bottom: 93}, {left: 30}, {left: 55});
	
	view.add(Views.shared.tech_nav("bone_cement"));
	
	var getContent = function(name) {
		Views.content[name](view);
	}
	
	read_more.addEventListener('click', App.swapView(view, getContent.p("bone_cement")));
	view.add(Views.shared.logo());

	return view;
}