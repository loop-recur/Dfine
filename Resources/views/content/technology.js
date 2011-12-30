Views.content.technology = function(win) {
	var view = Ti.UI.createView({
		backgroundImage: "images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Technology"
	});
	
	var button = Ti.UI.createButton({
		title: "Watch a video",
		width: 140,
		height: 40
	});
	
	button.addEventListener('click', function(){
		Controllers.content.video('iphone.mov');
	});
	
	view.add(label);
	view.add(button);

	win.add(view);
}
