Views.content.lit_nav = function(){
	var arrow_top = 100;
	
	var data = [
		{id: "lit1", image: "images/star/lit/lit_bar_1_Metastatic.png"}
		, {id: "lit2", image: "images/star/lit/lit_bar_2_Incidence_of_Bone.png"}
		, {id: "lit3", image: "images/star/lit/lit_bar_3_Incidence_of_Spine.png"}
		, {id: "lit4", image: "images/star/lit/lit_bar_4_Nature.png"}
		, {id: "lit5", image: "images/star/lit/lit_bar_5_Radio1.png"}
		, {id: "lit6", image: "images/star/lit/lit_bar_6_Radio2.png"}
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
			width: 250,
			height: 100,
			id: attrs.id
		});

		row.add(image);
		
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