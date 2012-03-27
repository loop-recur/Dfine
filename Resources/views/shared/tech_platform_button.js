Views.shared.tech_platform_button = function(props) {	
	props = (props || {});
	
	var btn_tech_platform = Ti.UI.createButton(merge({
		backgroundImage:"images/gotomain_icon.png",
		height:40,
		width:40,
		bottom:5,
		right:5,
		zIndex:70
	}, props));

	btn_tech_platform.addEventListener('click', function(e){Controllers.content.renderView("main_screen")});
	return btn_tech_platform;
}
