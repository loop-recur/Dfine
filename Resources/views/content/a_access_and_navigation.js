Views.content.a_access_and_navigation = function() {	
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});

	// var btn_vertecor = UI.createButton({
	// 	title: "VertecoR Navigational MidLine Osteotome",
	// 	width: 250,
	// 	height: 50,
	// 	bottom: 200,
	// 	left: 50
	// });
	// 
	// btn_vertecor.addEventListener("click", function(e){Controllers.content.renderSubView("targeted_cavity_creation")}); 
	
	// view.add(btn_vertecor);
	
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
		text: "Allows unipedicular access to vertebrae*. \nEnables targeted cavity creation across the vertebral midline. \nSpares cancellous bone. \nCreates preferential pathways for high viscosity StabiliT   ER  Bone Cement to follow. \nMaximizes exposed surface area to facilitate interdigitation. \n\n*85+% of procedures to date have used the unipendicular technique to enter the vertebra",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:16,fontWeight:'regular'},
		color:"#023f66",
		width:"auto",
		bottom:70,
		height:'auto',
		textAlign:"center"
	});
	
	view.add(midline_bullets);
	UI.Er2(midline_bullets, view, {left: 550, bottom: 138}, {left: 30}, {left: 56});	
	
	var tool1 = Ti.UI.createView({
		backgroundImage:"images/technology/access/tool1b.png",
		height:157,
		width:304,
		top:150,
		left:450
	});
	
	// var tool1 = ClickToExpand(tool1);
	
	var tool2 = Ti.UI.createView({
		backgroundImage:"images/technology/access/tool2b.png",
		height:148,
		width:265,
		top:330,
		left:487
	});
	
	// var tool2 = ClickToExpand(tool2);
	

	var video = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "Cavity Creation",
		font:{fontSize:15, fontWeight:"regular"},
		color:"black",
		width: 245,
		height: 50,
		left:150,
		top:300,
		zIndex:40
	});
	
	video.addEventListener('click', function(){
		Controllers.content.video('1757.mp4');
	});
	
	view.add(video);
	
	var video2 = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "MidLine Osteotome",
		font:{fontSize:15, fontWeight:"regular"},
		color:"black",
		width: 245,
		height: 50,
		left:150,
		top:380,
		zIndex:40
	});
	
	video2.addEventListener('click', function(){
		Controllers.content.video('PML2775-a-access-midline-45-120.mov');
	});
	
	view.add(video2);
	
	view.add(tool1);
	view.add(tool2);
	
	view.add(Views.shared.tech_nav("access_and_navigation", "a"));
	view.add(Views.shared.flipper({tabs:"b_tabs", flip_to:"b_access_and_navigation"}));
	view.add(Views.shared.logo());

	return view;
}
