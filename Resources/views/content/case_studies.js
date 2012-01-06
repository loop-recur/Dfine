Views.content.case_studies = function(win) {
	
	var view = Ti.UI.createView({
		backgroundImage:"images/page_bg.png"
	});
	
	var label = Ti.UI.createLabel({
		text: "Hello Case Studies"
	});
	
	view.add(label);
	
	var finish = function(studies) {
		log(studies);
	}
	
	var studies = Controller.case_studies.getAll(finish);

	win.add(view);
}
