Views.layout_containers.left_main = function(){

	Controllers.content.clearLayoutContainers("center_main", "left_nav"); //Hack
	
	return Ti.UI.createView({
		backgroundImage:"images/main_bg_964.png",
		left: 0,
		height:"100%",
		width:964,
		id: "lc_left_main"
	});
	
}