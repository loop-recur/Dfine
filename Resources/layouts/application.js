Layouts.application = function(delegate) {
	var tabButtons;
	
	var win = Ti.UI.createWindow({
		backgroundImage:'images/main_bg.png',
		orientationModes:[Ti.UI.LANDSCAPE_LEFT]
	});
		
	var main_window_view = Ti.UI.createView({
		left:0,
		width: 964,
		height: "100%"
	});
	
	var cover_view = Ti.UI.createView({
		backgroundImage: "images/closed_tab_page_bg.png",
		width: 1017,
		height: "100%",
		left: 0
	});

	var cover_image = Ti.UI.createView({
		backgroundImage: "images/closed_tab_all_content_flat.png",
		width: 925,
		height: 500,
		left:50,
		top: 80
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
	cover_view.add(video);
	
	var main_content = Ti.UI.createView({
		left: 0,
		width: 1017,
		backgroundImage: "images/page_bg.png"
	});
	
	var nav_cover = Ti.UI.createView({
		right:0,
		width: 60,
		zIndex: 99
	});
	
	win.add(nav_cover);
	
	var openApp = function() {
		win.remove(nav_cover);
		main_window_view.animate({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN, view: main_content});
		main_window_view.remove(cover_view);
		first(tabButtons).fireEvent('click');
	}
	
	var addOpenListener = function() {
		cover_view.addEventListener("swipe", openApp);
		nav_cover.addEventListener("touchend", openApp);
	}
	
	addOpenListener();
		
	main_content.addEventListener('backToCover', function() {
		main_window_view.add(cover_view);
		win.add(nav_cover);
		addOpenListener();
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
	win.add(main_window_view);
	win.add(nav);
	win.open();
}
