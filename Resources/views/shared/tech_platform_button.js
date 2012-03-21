Views.shared.tech_platform_button = function(props) {	
	props = (props || {});
	
	var btn_tech_platform = Ti.UI.createButton(merge({
		title: "Technology Platform",
		height:50,
		width:150,
		bottom:0,
		right:0
	}, props));

	btn_tech_platform.addEventListener('click', function(e){Controllers.content.renderView("main_screen")});
	return btn_tech_platform;
}	
