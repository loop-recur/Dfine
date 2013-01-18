Views.content.b_cost = function() {	
	var view = Views.shared.bg_left_main_view("star");
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/acomp2/AComp2_main.png",
		width:964,
		height:768,
		left:0
	});
	
	var btn_compare = Ti.UI.createButton({
		backgroundImage:"images/star/acomp2/comparison_to_standard_btn.png",
		backgroundSelectedImage:"images/star/acomp2/comparison_to_standard_btn_p.png",
		height:49,
		width:249,
		bottom:100,
		left:40
	});
	
	btn_compare.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_cost2")});
	
	
	view.add(view_content);
	
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_cost"}));
	view.add(btn_compare);
	
	return view;
}
