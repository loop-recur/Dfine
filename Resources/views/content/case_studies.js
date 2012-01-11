Views.content.case_studies = function(win) {
	var icon_width = 400
	, icon_height = 250
	, columns = 2;
	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var makeBullet = function(view, state, point) {
		var dot = Ti.UI.createView({
			left: 210,
			width: 10,
			height: 10,
			top: state.top,
			backgroundColor: 'blue',
			borderColor: "blue",
			borderRadius: 10,
			borderWidth: 1
		});
		
		var bullet = Ti.UI.createLabel({
			text: point, 
			font: {fontFamily:'Helvetica',fontSize:"13dp",fontWeight:'regular'},
			color: "red",
			height: 10,
			top: state.top,
			left: 225
		});
		
		view.add(dot);
		view.add(bullet);
		
		return {top:state.top+20}
	}
	
	var makeStudy = function(attrs) {
		var study_view = Ti.UI.createView({
			borderRadius:4,
			borderColor: "#888888",
			borderWidth: 1,
			width: icon_width,
			height: icon_height
		});
		
		var featured_pic = compose(first, filter('.featured'))(attrs.images);
		var path = featured_pic ? featured_pic.url : first(attrs.images).url;

		var image = Ti.UI.createImageView({
			image: path,
			width: 200,
			height: 200,
			top: 20,
			left: 5
		});
		
		var title = Ti.UI.createLabel({
			text: attrs.title, 
			font: {fontFamily:'Helvetica',fontSize:"13dp",fontWeight:'regular'},
			color: "#6c7881",
			top: 20,
			height: 'auto',
			left: 210
		});
		
		study_view.add(image);
		study_view.add(title);
		
		study_view.addEventListener('click', UI.slideshow.p(attrs.images));
		
		reduce(makeBullet.p(study_view), {top: 150}, attrs.bullet_points);

		return study_view;
	}
	
	var makePage = function(studies) {
		var page_view = Ti.UI.createView({});
		
		var placeStudyView = function(position, v) {
			var horizontal_padding = icon_width + 60
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
		var groups = groups_of(4, studies);
		var views = map(makePage, groups);
		var dashboard = Ti.UI.createScrollableView({height: "90%", width: "90%", views: views, showPagingControl:true});

		view.add(dashboard);
	}
	
	Controllers.case_studies.getAll(finish);

	win.add(view);
}
