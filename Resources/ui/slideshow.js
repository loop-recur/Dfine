UI.slideshow = function(images) {
	
	console.log("UI.slideshow images = " + JSON.stringify(images));
	
	var bottom_views = [];
	var currentImageIndex = 0;
	var win = Ti.UI.createWindow({backgroundColor: "#000000"});

	var cover_view = Ti.UI.createView({
		height: "80%",
		width: "100%",
		top: 0
	});
	
	var main_image_view = Ti.UI.createImageView({
		width: 400,
		height: 400
	});
	
	var previous_image_view = Ti.UI.createImageView({
		width: 120,
		height: 120,
		left: 100
	});
	
	var next_image_view = Ti.UI.createImageView({
		width: 120,
		height: 120,
		right: 100
	});
	
	var previous_label = Ti.UI.createLabel({
		font: {fontFamily:'Helvetica',fontSize:"13dp",fontWeight:'regular'},
		left: 130,
		top: 370,
		text: "Previous",
		color: "white",
		height: 'auto',
		width: 'auto',
		visible: false
	});
	
	var next_label = Ti.UI.createLabel({
		font: {fontFamily:'Helvetica',fontSize:"13dp",fontWeight:'regular'},
		text: "Next",
		right: 140,
		top: 370,
		color: "white",
		height: 'auto',
		width: 'auto',
		visible: false
	});
	
	var caption_view = Ti.UI.createView({
		backgroundColor: "#ffffff",
		borderRadius:8,
		borderColor: "black",
		borderWidth: 1,
		width: 420,
		height: 'auto',
		bottom: 175
	});
	
	var caption_text = Ti.UI.createLabel({
		font: {fontFamily:'Helvetica',fontSize:"13dp",fontWeight:'regular'},
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
		color: "#023f66",
		height: 'auto'
	});
	
	caption_view.add(caption_text);
	
	var bottom_scroller = Ti.UI.createScrollView({
		height: "20%",
		bottom: 0,
		layout: "horizontal",
		contentWidth:"auto",
		contentHeight:'auto',
		showHorizontalScrollIndicator:true,
		showVerticalScrollIndicator:false
	});
	
	var _updateBottom = function() {
		image_view = bottom_views[currentImageIndex];
		_changeBorder(image_view);
		_scrollTo(image_view);
	}
	
	var _updateImagePositions = function() {
		var image = images[currentImageIndex];
		var previous_image = images[currentImageIndex-1];
		var next_image = images[currentImageIndex+1];
		
		previous_label.visible = !!previous_image;
		next_label.visible = !!next_image;
		
		if(previous_image){previous_image_view.image = previous_image.url};
		if(next_image){next_image_view.image = next_image.url};
		
		main_image_view.image = image.url;
		
		_updateCaption(image.caption);
		_updateBottom();
	}
	
	var _updateCaption = function(caption) {
		caption_view.visible = !!caption;
		caption_text.text = caption+"\n";
	}
	
	var _selectImage = function(image) {
		currentImageIndex = images.indexOf(image);
		_updateImagePositions();
	}
	
	var _changeBorder = function(view) {
		var _addBorder = function(view) {
			view.borderWidth = 2;
		}

		var _removeBorder = function(view) {
			view.borderWidth = 0;
		}
		
		map(_removeBorder, bottom_views);
		_addBorder(view);
	}
	
	var _scrollTo = function(image_view) {
		var center_of_image = image_view.getCenter().x;
		var offset_from_center_of_image = center_of_image - 475;
		bottom_scroller.scrollTo(offset_from_center_of_image, 0);
	}

	var _addToBottom = function(image) {
		var image_view = Ti.UI.createImageView({
			image: image.url,
			width: 80,
			height: 80,
			left: 100,
			borderRadius: 3,
			borderColor: "yellow",
			borderWidth: 0
		});
		
		image_view.addEventListener('click', _selectImage.p(image));
		
		bottom_views.push(image_view);
		bottom_scroller.add(image_view);
	}
	
	var openMainImage = function() {
		var image_win = Ti.UI.createWindow({backgroundColor: "#000000"});
		var back = UI.BackButton(image_win);
		var image = images[currentImageIndex];

		var image_view = Ti.UI.createImageView({
			image: image.url,
			width: '70%',
			height: '70%'
		});
		
		console.log("openMainImage : image.url = " + image.url);

		image_win.add(image_view);
		image_win.add(back);
		image_win.open();
	};
	
	var addClickHandlers = function() {
		main_image_view.addEventListener('click', openMainImage);

		previous_image_view.addEventListener('click', function() {
			if(!previous_image_view.image) return;
			currentImageIndex -= 1;
			_updateImagePositions();
		});

		next_image_view.addEventListener('click', function() {
			if(!next_image_view.image) return;
			currentImageIndex += 1;
			_updateImagePositions();
		});
	}

	
	map(_addToBottom, images);
	
	last(bottom_views).addEventListener("load", addClickHandlers);
	
	var back = UI.BackButton(win);
	
	cover_view.add(main_image_view);
	cover_view.add(previous_image_view);
	cover_view.add(next_image_view);
	cover_view.add(previous_label);
	cover_view.add(next_label);
	
	win.add(cover_view);
	win.add(bottom_scroller);
	win.add(caption_view);
	win.add(back);
	win.open();
	
	_updateImagePositions();
}
