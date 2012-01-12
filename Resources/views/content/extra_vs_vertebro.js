Views.content.extra_vs_vertebro = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "RF-TVA extravasation versus vertebroplasty extravasation",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:700,
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = Ti.UI.createView({
		backgroundImage:"images/results/results_page5_RF-TVA_vs_vertebro.png",
		top:100,
		width:722,
		height:200,
	})
	
	var bullets = Ti.UI.createLabel({
		text: "	• 60 patients underwent RF-TVA to treat 92 osteoporotic vertebral compression fractures(4) \n• 39 patients were treated for 52 spine fractures (control group)(4) \n• Patients that underwent RF-TVA experienced 54% fewer incidence of cement leakage and saw a restorative increase in height(4)",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:370,
		height:'auto',
		textAlign:"center"
	});

	view.add(label);
	view.add(image);
	view.add(bullets);

	win.add(view);
}