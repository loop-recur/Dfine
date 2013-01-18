Views.content.b_cost2 = function() {	
	var view = Views.shared.bg_left_main_view("star");
	
	var label = Ti.UI.createLabel({
		text: "Comparison to standard of care is compelling:",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:50,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:80,
		right:40,
		height:'auto'
	});
	
	view.add(label);
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/acomp2/results8.png",
		width:722,
		height:350,
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

	back_button.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_cost")});
	view.add(back_button);
	
	view.add(view_content);
	
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));
	
	return view;
}