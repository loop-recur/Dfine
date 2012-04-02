Views.content.results_nav = function(){
	var arrow_top = 100;
	
	var data = [
		{id: "results1", image: "images/results/results_nav_icon1.png", text: "Significant pain reduction"}
		, {id: "results2", image: "images/results/results_nav_icon2.png", text: "Visual analog scale pain scores vs. Oswestry disability scores"}
		, {id: "results3", image: "images/results/results_nav_icon3.png", text: "Percent of patients with pain relief"}
		, {id: "results4", image: "images/results/results_nav_icon4.png", text: "Significantly reduced extravasation"}
		, {id: "results5", image: "images/results/results_nav_icon5.png", text: "RF-TVA extravasation versus vertebroplasty extravasation"}
		, {id: "results6", image: "images/results/results_nav_icon6.png", text: "RF-TVA extravasation versus Conventional balloon kyphoplasty complications"}
		, {id: "results7", image: "images/results/results_nav_icon6.png", text: "Reduced Extravasation with RF-TVA"}
	]


	var nav = Ti.UI.createView({
		layout_container: "left_nav"
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
		animateArrow(e.index);
		Controllers.content.renderSubView(e.source.id);
	});
	
	return nav;
}