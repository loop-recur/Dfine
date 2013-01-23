Views.content.b_cost2 = function() {	
	var view = Views.shared.bg_left_main_view("star");
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/acomp2/comparison_page.png",
		width:1024,
		height:768,
	});
	
	var back_button = Ti.UI.createButton({
		backgroundImage:"images/back_btn.png",
		backgroundSelectedImage:"images/back_btn_p.png",
		width: 122,
		height: 44,
		bottom:60,
		left:40,
		zIndex:40
	});
	
	var image = Ti.UI.createView({
		backgroundImage:"images/star/acomp2/comparison_chart.png",
		top: 160,
		width:722,
		height:500,
	});
	
	view_content.add(image);
	
	ClickToExpand(image);

	back_button.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_cost")});
	view.add(back_button);
	
	view.add(view_content);
	
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	
	return view;
}