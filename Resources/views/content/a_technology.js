Views.content.a_technology = function() {
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/closed_tab_all_content_flat.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);
	
	var video = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "RF-TVA",
		font:{fontSize:15, fontWeight:"regular", fontStyle:"bole"},
		color:"black",
		width: 225,
		height: 50,
		bottom:100,
		left:70,
		zIndex:40
	});
	
	video.addEventListener('click', function(){
		Controllers.content.video('PML2775.mp4');
	});
	
	view.add(video);
	
	var video2 = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "What Physicians are Saying",
		font:{fontSize:15, fontWeight:"regular", fontStyle:"bold"},
		color:"black",
		width: 305,
		height: 50,
		bottom:190,
		left:70,
		zIndex:40
	});
	
	video2.addEventListener('click', function(){
		Views.videos.show('whatphysiciansaresaying.mp4');
	});
	
	view.add(video2);
	
	view.add(Views.shared.tech_nav("", "a"));	
	view.add(Views.shared.flipper({tabs:"b_tabs", flip_to:"b_technology"}));
	view.add(Views.shared.logo());

	return view;
}
