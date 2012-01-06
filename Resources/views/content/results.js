Views.content.results = function(win) {	
	var arrow_top = 100;
	
	var data = [
		{id: "pain_reduction", image: "images/technology/small_tech_nav_access_active.png", text: "MyText"}
		, {id: "visual_analog", image: "images/technology/small_tech_nav_bone_active.png", text: "Some other text"}
		, {id: "pain_relief_percent", image: "images/technology/small_tech_nav_rf_active.png", text: "A whole lotta text man, cause it's gotta wrap"}
		, {id: "visual_analog", image: "images/technology/small_tech_nav_bone_active.png", text: "Some other text"}
		, {id: "pain_relief_percent", image: "images/technology/small_tech_nav_rf_active.png", text: "A whole lotta text man, cause it's gotta wrap"}
		, {id: "pain_reduction", image: "images/technology/small_tech_nav_access_active.png", text: "MyText"}
	]
	
	var getContent = function(name) {
		Views.content[name](view);
	}
	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png",
		width: "80%",
		right:14
	});
	
	var nav = Ti.UI.createView({
		width: "20%",
		left:0
	});
	
	var createTableViewRow = function(attrs) {
		var row = Ti.UI.createTableViewRow({
			width:"90%",
			height: 100,
			id: attrs.id
		});
		
		var image = Ti.UI.createImageView({
			image: attrs.image,
			left: 5,
			top: 5,
			width: 80,
			height: 80,
			id: attrs.id
		});
		
		var text = Ti.UI.createLabel({
			text: attrs.text,
			font: {fontFamily:'Helvetica',fontSize:"13dp",fontWeight:'regular'},
			color: "#6c7881",
			top: 5,
			left: 100,
			id: attrs.id
		});
	
		row.add(image);
		row.add(text);
		
		return row;
	}
	
	var rows = map(createTableViewRow, data);
	var table = Ti.UI.createTableView({
		data:rows,
		backgroundColor:"#E6EAED",
		borderColor: "#C7C8CC",
		width:'100%',
		height:'100%'
	});
	
	var arrow = Ti.UI.createImageView({
		image: "images/results/arrow.png",
		right: 1,
		top: 25,
		width: 13,
		height: 29
	});
	
	nav.add(table);
	nav.add(arrow);

	var label = Ti.UI.createLabel({
		text: "Hello Results",
		left: 20
	});
	
	var animateArrow = function(index) {
		var position = index ? (index * arrow_top) : 0;
		arrow.animate({top: position+30, duration: 500});
	}
	
	table.addEventListener('click', function(e){
		App.swapView(view, getContent(e.source.id));
		animateArrow(e.index);
	});
	
	first(rows).fireEvent('click');
		
	view.add(label);
	win.add(view);
	win.add(nav);
}
