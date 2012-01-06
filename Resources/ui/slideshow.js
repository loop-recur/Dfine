UI.slideshow = function(images) {
	var win = Ti.UI.createWindow({});
	
	var _getUrl = function(image) {
		return Helpers.Application.assetPath(image.url);
	}
	
	var cover_view = Ti.UI.createCoverFlowView({
		images:map(_getUrl, images),
		backgroundColor:'#000'
	});
	
	var caption_view = Ti.UI.createView({
		backgroundColor: "#ffffff",
		borderRadius:2,
		borderColor: "blue",
		borderWidth: 1,
		width: 300,
		height: 100
	});
	
	var caption_text = Ti.UI.createLabel({
		text: first(images).caption, 
		font: {fontFamily:'Helvetica',fontSize:"13dp",fontWeight:'regular'},
		color: "blue",
		bottom: 100,
		height: 'auto'
	});
	
	win.add(cover_view);
	caption_view.add(caption_text);
	win.add(caption_view);
	
	win.open();
}
