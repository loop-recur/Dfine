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
