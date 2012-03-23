Views.content.b_access_and_navigation = function() {	
	var view = Ti.UI.createView({
		layout_container:"left_main"
	});

	// var btn_vertecor = UI.createButton({
	// 	title: "VertecoR Navigational MidLine Osteotome",
	// 	width: 250,
	// 	height: 50,
	// 	bottom: 200,
	// 	left: 50
	// });
	// 
	// btn_vertecor.addEventListener("click", function(e){Controllers.content.renderSubView("targeted_cavity_creation")}); 
	// 
	// view.add(btn_vertecor);
	
	var view_content = Ti.UI.createView({
		backgroundImage:"images/star/a4/A4_main.png",
		width:964,
		height:768,
		left:0
	});
	
	view.add(view_content);

	view.add(Views.shared.tech_nav_star("access_and_navigation", 'b'));
	
	var left_button = Ti.UI.createButton({
		backgroundImage:"images/star/a4/A4_controlled_access_vid_btn.png",
		backgroundSelectedImage:"images/star/a4/A4_controlled_access_vid_btn.png",
		width: 277,
		height: 49,
		bottom:60,
		left:100
	});
	
	left_button.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_a5")});
	view.add(left_button);
	
	var right_button = Ti.UI.createButton({
		backgroundImage:"images/star/a4/A4_controlled_btn.png",
		backgroundSelectedImage:"images/star/a4/A4_controlled_btn_p.png",
		width: 238,
		height: 49,
		bottom:60,
		left:400
	});
	
	right_button.addEventListener('click', function(e){Controllers.content.renderView("b_tabs", "b_a6")});
	view.add(right_button);
	
	var movie = Ti.UI.createButton({
		backgroundImage:"images/star/a4/A4_intra_btn.png",
		backgroundSelectedImage:"images/star/a4/A4_intra_btn_p.png",
		width: 246,
		height: 49,
		bottom:170,
		left:80
	});
	
	view.add(movie);
	
	movie.addEventListener('click', function(){
		Views.videos.show('PML3361-544.m4v');
	});
	
	view.add(Views.shared.flipper({tabs:"a_tabs", flip_to:"a_access_and_navigation"}));
	view.add(Views.shared.logo("star"));

	return view;
}
