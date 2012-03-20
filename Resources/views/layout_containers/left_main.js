Views.layout_containers.left_main = function(){

	Controllers.content.clearLayoutContainers("center_main", "left_nav"); //Hack

	return Ti.UI.createView({
		left: 0,
		height:"100%",
		width: "90%", 
		id: "lc_left_main"
	});
	
}