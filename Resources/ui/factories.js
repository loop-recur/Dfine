UI.toggleableLabel = function(attrs) {
	return Ti.UI.createLabel(merge({
		font:{fontFamily:'Helvetica-Light',fontSize:17,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		height:'auto',
	}, attrs));
}

UI.toggleableView = function(attrs) {
	return Ti.UI.createView(merge({
		backgroundColor:"#EDEDED",
		height:220,
		width:180,
		visible:false,
		zIndex: 10
	}, attrs));
}


UI.superSub = function(supertext, subtext, attrs) {
	var style = "font: 17px Helvetica-Light";
	var superhtml = '<p style="'+style+'"><sup>'+supertext+'</sup>'+subtext+'</p>';
	
	var webview = Ti.UI.createWebView(merge({
		html: superhtml,
		backgroundColor: "transparent",
		width: 'auto',
		height: 'auto'
	}, attrs));
	
	return webview;
}