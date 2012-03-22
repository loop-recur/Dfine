Views.videos.show = function(filename, attrs) {
	attrs = attrs || {};

	var win = Ti.UI.createWindow({
		title: "Video",
		left: -1024,
		backgroundColor: "black",
		orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	
	var back_button = UI.BackButton(win, function() {
		player.stop();
	});
	
	var player = Ti.Media.createVideoPlayer({
		mediaControlStyle:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		url: "/videos/"+filename,
		height: "80%"
	});
	
	var PlayerStopper = function(player, attrs) {
		var intervalId;
		
		var checkToStop = function() {
			if(player.currentPlaybackTime >= attrs.end) player.stop();
		}
		
		var stop = function() {
			clearInterval(intervalId);
			back_button.fireEvent('click');
		}
		
		var start = function() {
			player.initialPlaybackTime = attrs.start;
			intervalId = setInterval(checkToStop, 1000);
		}
		
		player.addEventListener('playing', start);
		
		return {start : start}
	}
	
	if(attrs.start) PlayerStopper(player, attrs).start();	

	win.add(player);
	win.add(back_button);
	win.open();
	win.animate({left:0, duration:500});
}
