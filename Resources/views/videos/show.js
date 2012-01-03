Views.videos.show = function(filename) {

	var win = Ti.UI.createWindow({
		title: "Video",
		left: -1024,
		backgroundColor: "black",
		orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	
	var back_button = Ti.UI.createButton({
		title: "Back",
		width: 140,
		height: 40,
		right: 10,
		top: 5
	});
	
	var player = Ti.Media.createVideoPlayer({
		movieControlMode: Ti.Media.VIDEO_CONTROL_DEFAULT,
		url: "/files/videos/"+filename,
		height: "80%"
	});
	
	back_button.addEventListener('click', function() {
		player.stop();
		win.close();
	});

	win.add(player);
	win.add(back_button);
	win.open();
	win.animate({left:0, duration:500});
}
