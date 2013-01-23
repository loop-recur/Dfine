Views.content.venn = function() {	
	var view = Ti.UI.createView({
		width:1024,
		height:768,
		backgroundImage:"images/outer/venn_page.png",
		backgroundColor:"white"
	});

	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));

	return view;
}
