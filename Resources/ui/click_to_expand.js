ClickToExpand = function(image_view) {
	var image = (image_view.image || image_view.backgroundImage);

	var getPage = function() {
		return '<html> \
		<head> \
		  <title>Expanded Image</title> \
		</head> \
		<body style="padding:0; margin:200px auto; width:600px;" > \
		  <img src="'+image+'" /> \
		</body> \
		</html>'
	}

	var expand = Ti.UI.createButton({
		backgroundImage: "images/fullscreen_icon.png",
		width: 20,
		height: 20,
		bottom: 4,
		right: 4,
		zIndex: 10
	});
	
	image_view.add(expand);
	
	var expandView = function() {
		var win = Ti.UI.createWindow({backgroundColor: "#ffffff"});

		var webview = Ti.UI.createWebView({
			scalesPageToFit: true,
			html: getPage()
		});
		
		win.add(webview);
		win.add(UI.BackButton(win));
		win.open();
	}
	
	image_view.addEventListener('click', expandView);
	
	return image_view;
};
