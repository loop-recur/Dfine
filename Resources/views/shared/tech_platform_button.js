Views.shared.tech_platform_button = function() {	
	var btn_tech_platform = Ti.UI.createButton({
		title: "Technology Platform",
		height:50,
		width:150,
		bottom:0,
		right:0
	});

	btn_tech_platform.addEventListener('click', function(e){Controllers.content.renderView("main_screen")});
	return btn_tech_platform;
}	