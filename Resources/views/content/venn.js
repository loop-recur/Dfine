Views.content.venn = function() {	
	var view = Ti.UI.createView({
		width:1024,
		height:768,
		backgroundImage:"images/outer/Combined_bg.png"
	});

	var label = Ti.UI.createLabel({
		text: "Patient Demographics",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:65,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:20,
		right:40,
		height:'auto'
	});
	
	var venn_diagram = Ti.UI.createView({
		width:354,
		height:575,
		backgroundImage:"images/outer/Venn-Diagram.png"
	});
	
	view.add(label);
	view.add(venn_diagram);
	view.add(Views.shared.tech_platform_button({bottom:30,right:30}));

	return view;
}
