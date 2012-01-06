Views.content.extra_vs_conventional = function(win) {	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "RF-TVA extravasation versus Conventional balloon kyphoplasty complications",
		font:{fontFamily:'Helvetica-Light',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});
	
	var image = Ti.UI.createView({
		backgroundImage:"images/results/results_page1_significant_pain.png",
		top:200,
		width:722,
		height:285,
	})
	
	var content = Ti.UI.createLabel({
		text: "A comparison of leakage rates between spine fractures treatments <6 weeks old and those >6 weeks old.(5)",
		font:{fontFamily:'Helvetica-Light',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:230,
		height:'auto',
		textAlign:"center"
	});
	
	var bullets = Ti.UI.createLabel({
		text: "• 138 patients underwent conventional balloon kyphoplasty to treat 203 vertebral compression fractures \n• 42 patients were treated with RF-TVA for 60 vertebral compression fractures \n• Cement leakage for patients treated with balloon kyphoplasty averaged 18.7%, but was significantly higher at 27.7% for fractures greater than 6 weeks old(5) \n• Cement leakage with RF-TVA averaged 10.6%, but only 11.6% when delivered into fractures greater than six weeks old(5)",
		font:{fontFamily:'Helvetica-Light',fontSize:15,fontWeight:'regular'},
		width:700,
		bottom:100,
		height:'auto',
		textAlign:"center"
	});

	view.add(label);
	view.add(image);
	view.add(content);
	view.add(bullets);

	win.add(view);
}