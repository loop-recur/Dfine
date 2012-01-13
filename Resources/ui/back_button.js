UI.BackButton = function(win, cb) {
	
	var back = Ti.UI.createButton({
		backgroundImage: "images/back_button.png",
		top: 10,
		right: 10,
		width: 40,
		height: 40
	});
	
	back.addEventListener('click', function(){
		win.close();
		if(cb) cb();
	});
	
	return back;
}
