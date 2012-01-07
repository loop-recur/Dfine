UI.slideshow = function(images) {
	var win = Ti.UI.createWindow({backgroundColor: "#000000"});
	
	var back = Ti.UI.createButton({
		title: "(X)",
		top: 5,
		right: 5,
		width: 40,
		height: 40
	});
	
	back.addEventListener('click', function(){
		win.close();
	});

	var cover_view = Ti.UI.createCoverFlowView({
		images:map('.url', images),
		backgroundColor:'#000',
		top:0,
		width: "100%",
		height: "80%"
	});
	
	var caption_view = Ti.UI.createView({
		backgroundColor: "#ffffff",
		borderRadius:2,
		borderColor: "blue",
		borderWidth: 1,
		width: 300,
		height: 'auto',
		bottom: 160
	});
	
	var caption_text = Ti.UI.createLabel({
		font: {fontFamily:'Helvetica',fontSize:"13dp",fontWeight:'regular'},
		left: 20,
		top: 20,
		bottom: 20,
		color: "blue",
		height: 'auto'
	});
	
	var bottom_scroller = Ti.UI.createScrollView({
		height: "20%",
		bottom: 0,
		layout: "horizontal",
		contentWidth:"auto",
		contentHeight:'auto',
		showHorizontalScrollIndicator:true,
		showVerticalScrollIndicator:false
	});
	
	var _updateCaption = function(caption) {
		caption_view.visible = !!caption;
		caption_text.text = caption+"\n";
	}
	
	var _selectImage = function(image) {
		cover_view.selected = images.indexOf(image);
	}
	
	var _addToShow = function(image) {
		var image_view = Ti.UI.createImageView({
			image: image.url,
			width: 80,
			height: 80,
			left: 100
		});
		
		image_view.addEventListener('click', function() {
			_selectImage(image);
			_updateCaption(image.caption);
		});
		
		bottom_scroller.add(image_view);
	}
	
	map(_addToShow, images);
	
	win.add(cover_view);
	win.add(bottom_scroller);
	caption_view.add(caption_text);
	win.add(caption_view);
	win.add(back);
	_updateCaption(first(images).caption);
	
	win.open();
}
