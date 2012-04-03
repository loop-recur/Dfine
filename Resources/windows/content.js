Windows.content = function() {

	var win = Ti.UI.createWindow({
		backgroundImage:'images/main_bg.png',
		orientationModes : [
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
		]
	});
		
	return win;
}

