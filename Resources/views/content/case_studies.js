Views.content.case_studies = function(win) {
	var icon_width = 420
	, icon_height = 280
	, columns = 2;
	
	var makeView = function() {
		return Ti.UI.createView({
		});
	}
	
	var view = makeView();
	
	var spinner = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		height:30,
		width:30
	});

	view.add(spinner);
	spinner.show();
	
	var makeBullet = function(view, state, point) {
		var dot = Ti.UI.createView({
			left: 210,
			width: 10,
			height: 10,
			top: state.top+4,
			backgroundColor: '#023f66',
			borderColor: "#023f66",
			borderRadius: 10,
			borderWidth: 1
		});
		
		var bullet = Ti.UI.createLabel({
			text: point, 
			font: {fontFamily:'Helvetica',fontSize: 13,fontWeight:'regular'},
			color: "#023f66",
			height: 'auto',
			width: 180,
			top: state.top,
			left: 225
		});
		
		view.add(dot);
		view.add(bullet);
		
		var newTop = (point.length > 30) ? 40 : 20;
		return {top:state.top+newTop}
	}
	
	var makeStudy = function(attrs) {
		var study_view = Ti.UI.createScrollView({
			width: icon_width,
			height: icon_height,
			contentWidth: 'auto',
			contentHeight: 'auto',
			showHorizontalScrollIndicator:false,
			showVerticalScrollIndicator:true,
			borderColor: "#cccccc",
			borderRadius: 10,
			borderWidth: 1
		});
		
		var featured_pic = compose(first, filter('.featured'))(attrs.images);
		var path = featured_pic ? featured_pic.url : first(attrs.images).url;

		var image = Ti.UI.createImageView({
			image: path,
			width: 200,
			height: 200,
			top: 60,
			left: 5,
			backgroundColor: "#000000"
		});
		
		var title = Ti.UI.createLabel({
			text: attrs.title, 
			font: {fontFamily:'Helvetica LT CondensedBlack',fontSize:15,fontWeight:'bold'},
			color: "#023f66",
			top: 10,
			height: 30,
			left: 10,
			width: 380
		});
		
		study_view.add(image);
		study_view.add(title);
		
		study_view.addEventListener('click', UI.slideshow.p(attrs.images));
		
		reduce(makeBullet.p(study_view), {top: 55}, attrs.bullet_points);

		return study_view;
	}
	
	var makePage = function(studies) {
		var page_view = Ti.UI.createView({});
		
		var placeStudyView = function(position, v) {
			var horizontal_padding = icon_width + 50
			, vertical_padding = icon_height + 30
			, new_left = position.left + horizontal_padding
			, new_top = position.top;

			v.top = position.top;
			v.left = position.left;

			page_view.add(v);
			
			if(new_left >= (horizontal_padding * columns)) {
				new_top = position.top + vertical_padding;
				new_left = 0;
			}

			return {left: new_left, top: new_top}
		}

		var study_views =	map(makeStudy, studies);
		reduce(placeStudyView, {left : 0, top : 0}, study_views);
		return page_view;
	}
	
	var finish = function(studies) {
		map(function(c){ view.remove(c); }, view.children);
		var groups = groups_of(4, studies);
		var views = map(makePage, groups);
		var dashboard = Ti.UI.createScrollableView({height: "90%", width: "90%", views: views, showPagingControl:true, pagingControlColor:"green"});

		view.add(dashboard);
	}
	
	Controllers.case_studies.getAll(finish, {fix_urls: Ti.App.Properties.getBool("cached_images")});

	win.add(view);
}
