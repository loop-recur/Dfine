UI.toggleableLabel = function(attrs) {
	
	var label = Ti.UI.createLabel(merge({
		font:{fontFamily:'Helvetica-Light',fontSize:17,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		height:Ti.UI.SIZE
	}, attrs));
	
	return label;
}

UI.toggleableView = function(attrs) {
	var view = Ti.UI.createView(merge({visible:false, width: 200, height: Ti.UI.SIZE}, attrs));
	
	var box = Ti.UI.createView({
		backgroundColor:"#ffffff",
		backgroundGradient:{
			type:'radial',
			colors:['#efefef','#ffffff'],
			startRadius: '100%',
			endRadius: "60%",
			backFillStart:false
		},
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#cccccc",
		width:'100%',
		height: Ti.UI.FILL
	});
		
	view.add(box);

	return view;
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

UI.Er2 = function(label, win, view_attrs, copy_attrs, two_attrs) {
	view_attrs = view_attrs || {};
	copy_attrs = copy_attrs || {};
	two_attrs = two_attrs || {};
	
	var font = merge(label.font, {fontSize: label.font.fontSize / 1.7 });
	
	var view = Ti.UI.createView(merge({
		height: 'auto',
		width: 'auto',
		left:label.left,
		right: label.right
	}, view_attrs));
	
	if(label.bottom && !view.bottom) view.bottom = label.bottom + 29;
	if(label.top && !view.top) view.top = label.top - 4;
	
	var copyright = Ti.UI.createLabel(merge({
		text: "®",
		font: font,
		color:label.color,
		width:'auto',
		height:'auto'
	}, copy_attrs));
	
	var two = Ti.UI.createLabel(merge({
		text: "2",
		font: font,
		color:label.color,
		width:'auto',
		height:'auto'
	}, two_attrs));
	
	view.add(copyright);
	view.add(two);
	win.add(view);
}

UI.createButton = function(properties){
	return Ti.UI.createButton(merge({zIndex: 10}, properties));
}	
