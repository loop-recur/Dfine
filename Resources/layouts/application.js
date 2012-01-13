Layouts.application = function(delegate) {
	var tabButtons;
	
	var win = Ti.UI.createWindow({
		backgroundImage:'images/main_bg.png',
		orientationModes:[Ti.UI.LANDSCAPE_LEFT]
	});
		
	var main_window_view = Ti.UI.createView({
		left:0,
		width:964,
		height: "100%"
	});
	
	var cover_view = Ti.UI.createView({
		width: "100%",
		height: "100%"
	});
	
	var cover_image = Ti.UI.createView({
		backgroundImage: "images/closed_tab_page_bg.png",
		width: 1024,
		height: 768,
		right:0
	});
	
	var cover_image_image = Ti.UI.createView({
		backgroundImage: "images/closed_tab_all_content_flat.png",
		width: 925,
		height: 500,
		left:50,
		top: 80
	});
	
	var label = Ti.UI.createLabel({
		text: "Swipe left to begin...",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:14,fontWeight:'regular', fontStyle:"italic"},
		color:"#023f66",
		width:'auto',
		top:130,
		right:70,
		height:'auto'
	});
	
	var video = Ti.UI.createButton({
		backgroundImage:"images/video_button.png",
		title: "RF-TVA",
		font:{fontSize:15, fontWeight:"regular"},
		color:"black",
		width: 225,
		height: 50,
		bottom:40,
		left:100
	});
	
	video.addEventListener('click', function(){
		Controllers.content.video('PML2775.mp4');
	});
	
	cover_view.add(cover_image);
	cover_image.add(cover_image_image);
	cover_image.add(label);
	cover_image.add(video);
	
	var main_content = Ti.UI.createView({
		backgroundImage:'images/main_bg.png',
	});
	
	main_window_view.addEventListener("swipe", function(e) {
		main_window_view.animate({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN, view: main_content});
		first(tabButtons).fireEvent('click');
	});
	
	main_content.addEventListener('backToCover', function() {
		main_window_view.animate({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP, view: cover_view});
	});
	
	var nav = Ti.UI.createView({
		layout: "horizontal",
		right: 0,
		top: 37,
		height:"100%",
		width:60
	});
	
	var makeTab = function(attrs) {
		var tab = Ti.UI.createButton({
			backgroundImage:attrs.background,
			backgroundSelectedImage:attrs.background,
			width:60,
			height:attrs.height,
			top:(attrs.top || 0) - 40,
			right:0,
			id: attrs.name
		});
		
		tab.addEventListener('click', App.swapView(main_content, Controllers.content.index.p(Formatter.underscore(attrs.name))));
		nav.add(tab);
		return tab;
	}
	
	var tabs = [
		{name: "Technology", background: "images/tabs/tabs_technology.png", height:160, top:-2}
		, {name: "Results", background: "images/tabs/tabs_results.png", height:150, top:0}
		, {name: "Case Studies", background: "images/tabs/tabs_case_studies.png", height:190, top:0}
		, {name: "Cost", background: "images/tabs/tabs_cost.png", height:150, top: -10}
		, {name: "Reimbursment", background: "images/tabs/tabs_reimbursement.png", height:190,top:-20}
		, {name: "Dfine", background: "images/tabs/tabs_dfine.png", height:150, top: -9}
	]
	
	tabButtons = map(makeTab, tabs);

	var button_group = UI.ButtonGroup.apply(this, tabButtons);
	
	main_window_view.add(main_content);
	main_window_view.add(cover_view);
	win.add(nav);
	win.add(main_window_view);
	win.open();
}
