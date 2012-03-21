Views.layout_containers.center_main = function(){

	Controllers.content.clearLayoutContainers("left_main");  // Hack.
	
	return Ti.UI.createView({
		right: 60,
		backgroundImage:"images/center_main_bg.png",
		width: "69%", 
		id: "lc_center_main"
	})
	
}