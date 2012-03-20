Views.content.references = function() {	
	var view = Ti.UI.createView({
		layout_container: "left_main"
	});
	
	var label = Ti.UI.createLabel({
		text: "References",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:28,fontWeight:'regular'},
		color:"#023f66",
		width:'auto',
		top:40,
		left:30,
		height:'auto'
	});

	var bullets = Ti.UI.createLabel({
		text: "1. Pflugmacher R, Randau T, Kabir K, and Wirtz DC. Radiofrequency (RF) Kyphoplasty in treatment of osteolytic vertebral fractures. IOF WCO-ECCEO10 2010. \n\n2. Sewall L, Smith S, and Vlahos A. Clinical Evaluation of Percutaneous Vertebral Augmentation Procedures using Radiofrequency Kyphoplasty in Treatment of 69 Vertebral Compression Fractures. ASBMR 2010. \n\n3. Georgy, B. Comparison between RF Kyphoplasty, balloon kyphoplasty and high viscosity vertebroplasty in treatment of spinal compression fracture.” The 2nd Joint Meeting of European Society of Neuroradiology (ESNR) & American Society of Spine Radiology (ASSR). 2011. \n\n4.  Pflugmacher R, Randau T, Kabir K, and Wirtz DC. Radiofrequency (RF) Kyphoplasty in comparison to in Vertebroplasty (VP) A prospective evaluation. IOF WCO-ECCEO10 2010. \n\n5. Licht, AW and Kramer W. One-year observation study upon a new augmentation procedure \n(Radiofrequency-Kyphoplasty) in the treatment of vertebral body compression fractures. Eurospine 2011.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		width:650,
		bottom:250,
		height:'auto',
		textAlign:"left"
	});

	view.add(label);
	view.add(bullets);
	
	return view;
}