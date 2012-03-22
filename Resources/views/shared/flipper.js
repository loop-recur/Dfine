Views.shared.flipper = function(props) {	
	props = (props || {});
	
	var view = Ti.UI.createView(merge({
		height:40,
		width:50,
		top:30, 
		right:80
	}, props));
	
	var divider = Ti.UI.createView({
		backgroundImage:"images/icons_divider.png",
		height:40,
		width:2,
		right:0
	});
	
	view.add(divider);
	
	var flipper = Ti.UI.createButton({
		backgroundImage:"images/switch_icon.png",
		height:40,
		width:40,
		left:0
	});
	
	flipper.addEventListener('click', function(e){Controllers.content.renderView(props.tabs, props.flip_to)});
	
	view.add(flipper);
	
	return view;
}