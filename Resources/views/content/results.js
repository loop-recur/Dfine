Views.content.results = function(win) {	
	var arrow_top = 100;
	
	var data = [
		{id: "pain_reduction", image: "images/results/results_nav_icon1.png", text: "Significant pain reduction"}
		, {id: "visual_analog", image: "images/results/results_nav_icon2.png", text: "Visual analog scale pain scores vs. Oswestry disability scores"}
		, {id: "pain_relief_percent", image: "images/results/results_nav_icon3.png", text: "Percent of patients with pain relief"}
		, {id: "reduced_extravasion", image: "images/results/results_nav_icon4.png", text: "Significantly reduced extravasation"}
		, {id: "extra_vs_vertebro", image: "images/results/results_nav_icon5.png", text: "RF-TVA extravasation versus vertebroplasty extravasation"}
		, {id: "extra_vs_conventional", image: "images/results/results_nav_icon6.png", text: "RF-TVA extravasation versus Conventional balloon kyphoplasty complications"}
	]
	
	var getContent = function(name) {
		Views.content[name](view);
	}
	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png",
		width: "75%",
		right:14
	});
	
	var nav = Ti.UI.createView({
		width: "25%",
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
			left: 16,
			width: 52,
			height: 52,
			id: attrs.id
		});
		
		var text = Ti.UI.createLabel({
			text: attrs.text,
			font: {fontFamily:'Helvetica',fontSize:"13dp",fontWeight:'regular'},
			color: "#6c7881",
			top: 5,
			left: 80,
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
		right: 0,
		top: 25,
		width: 13,
		height: 52
	});
	
	nav.add(table);
	nav.add(arrow);
	
	var animateArrow = function(index) {
		var position = index ? (index * arrow_top) : 0;
		arrow.animate({top: position+30, duration: 500});
	}
	
	table.addEventListener('click', function(e){
		view.opacity = 0;
		animateArrow(e.index);
		setTimeout(function(){
			App.swapView(view, getContent(e.source.id));
			view.animate({opacity: 1, duration: 150});
		}, 500);
	});
	
	first(rows).fireEvent('click');

	win.add(view);
	win.add(nav);
}
