Views.content.lit3 = function() {
	var view = Ti.UI.createView({
		layout_container: "center_main",
		backgroundImage:"images/star/lit/Lit3.png",
		width:714,
		height:768
	});

	view.add(Views.shared.logo("star"));
	return view;
}