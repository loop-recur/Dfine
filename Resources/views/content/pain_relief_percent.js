Views.content.pain_relief_percent = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "pain_relief_percent",
		font:{fontFamily:'Helvetica-Light',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	
	view.add(label);

	win.add(view);
}
