Views.content.main_screen = function() {
	var view = Ti.UI.createView({
		width:1024,
		height:768,
		backgroundImage:"images/outer/Combined_bg.png"
	});
	
	var content_view = Ti.UI.createView({
		backgroundColor: "#FFFFFF"
	});	

	var comp_view = Ti.UI.createView({
		width:1024,
		height:768,
		backgroundImage:"images/outer/Cover_main.png"
	});
	content_view.add(comp_view);
	
	var nav_view = Ti.UI.createView({
		height:440,
		width:440
	});
	
	var nav_circle = Ti.UI.createView({
		backgroundImage:"images/outer/outernav/tripoint_lrg_bg_ring.png",
		height:373,
		width:374
	});
	
	nav_view.add(nav_circle);
	
	var nav_center = Ti.UI.createView({
		backgroundImage:"images/outer/outernav/tripoint_lrg_center.png",
		width:148,
		height:148
	});
	
	nav_view.add(nav_center);
	
	var btn_nav_rf = Ti.UI.createButton({
		backgroundImage:"images/outer/outernav/tripoint_lrg_rf.png",
		backgroundSelectedImage:"images/outer/outernav/tripoint_lrg_rf_a.png",
		height:131,
		width:131,
		top:0,
		id: 'rf_energy'
	});

	btn_nav_rf.addEventListener('click', function(e){Controllers.content.renderView("outer_rf_energy")});
	nav_view.add(btn_nav_rf);

	var btn_nav_access = Ti.UI.createButton({
		backgroundImage:"images/outer/outernav/tripoint_lrg_an.png",
		backgroundSelectedImage:"images/outer/outernav/tripoint_lrg_an_a.png",
		height:131,
		width:131,
		bottom:20,
		left:10,
		id: 'access_and_navigation'
	});
	
	btn_nav_access.addEventListener('click', function(e){Controllers.content.renderView("outer_access_and_navigation")});
	nav_view.add(btn_nav_access);
		
	var btn_nav_bone = Ti.UI.createButton({
		backgroundImage:"images/outer/outernav/tripoint_lrg_cement.png",
		backgroundSelectedImage:"images/outer/outernav/tripoint_lrg_cement_a.png",
		height:131,
		width:131,
		bottom:20,
		right:10,
		id: "bone_cement"
	});
	
	btn_nav_bone.addEventListener('click', function(e){Controllers.content.renderView("outer_bone_cement")});
	nav_view.add(btn_nav_bone);

	var btn_stability = Ti.UI.createButton({
		backgroundImage:"images/outer/goto_stab_btn.png",
		backgroundSelectedImage:"images/outer/goto_stab_btn_p.png",
		height:49,
		width:249,
		bottom:50,
		left:40
	});

	btn_stability.addEventListener('click', function(e){ Controllers.content.renderView("a_tabs", "a_technology") });
	content_view.add(btn_stability);
	
	var btn_star = Ti.UI.createButton({
		backgroundImage:"images/outer/goto_star_btn.png",
		backgroundSelectedImage:"images/outer/goto_star_btn_p.png",
		height:49,
		width:249,
		bottom:50,
		left:330
	});
	
	btn_star.addEventListener('click', function(e){ Controllers.content.renderView("b_tabs", "b_technology") });
	content_view.add(btn_star);
	
	var btn_demographics = Ti.UI.createButton({
		backgroundImage:"images/outer/goto_patient_dem_btn.png",
		backgroundSelectedImage:"images/outer/goto_patient_dem_btn_p.png",
		height:49,
		width:249,
		bottom:50,
		right:40
	});
	
	btn_demographics.addEventListener('click', function(e){Controllers.content.renderView("venn")});
	content_view.add(btn_demographics);
	
	content_view.add(nav_view);
	
	var oneTimeSplash = function(){
		var swipe_cover = Ti.UI.createView({
			backgroundImage:"Default-Landscape.png",
			width:1024,
			height:768,
			top:0,
			left:0,
			zIndex:99,
		});
		
		var _swipeListener = function(){
			var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
			swipe_cover.animate({view: content_view, transition: t}, function(e){
        swipe_cover.removeEventListener('swipe', _swipeListener);
			});
		};

		swipe_cover.addEventListener('swipe', _swipeListener);
		view.add(swipe_cover);
		Ti.App.app_is_opened = true;  //Flag so that this is only run one time.
	};
  
  
  
  if(!Ti.App.app_is_opened) oneTimeSplash();
	view.add(content_view)
	return view;
}
