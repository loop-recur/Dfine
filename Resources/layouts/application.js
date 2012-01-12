Layouts.application = function(delegate) {	
	var win = Ti.UI.createWindow({
		backgroundImage:'images/main_bg.png',
		orientationModes:[Ti.UI.LANDSCAPE_LEFT]
	});
	
	var main_content = Ti.UI.createView({
		backgroundImage:'images/main_bg.png',
	});
	
	var nav = Ti.UI.createView({
		layout: "horizontal",
		right: 0,
		top: 37,
		height:"100%",
		width:60
	});
	
	var makeTab = function(attrs) {
		var tab = Ti.UI.createButton({
			backgroundImage:attrs.background,
			backgroundSelectedImage:attrs.background,
			width:60,
			height:attrs.height,
			top:(attrs.top || 0) - 40,
			right:0,
			id: attrs.name
		});
		
		tab.addEventListener('click', App.swapView(main_content, Controllers.content.index.p(Formatter.underscore(attrs.name))));
		nav.add(tab);
		return tab;
	}
	
	var tabs = [
		{name: "Technology", background: "images/tabs/tabs_technology.png", height:160, top:-2}
		, {name: "Results", background: "images/tabs/tabs_results.png", height:150, top:0}
		, {name: "Case Studies", background: "images/tabs/tabs_case_studies.png", height:190, top:0}
		, {name: "Cost", background: "images/tabs/tabs_cost.png", height:150, top: -10}
		, {name: "Reimbursment", background: "images/tabs/tabs_reimbursement.png", height:190,top:-20}
		, {name: "Dfine", background: "images/tabs/tabs_dfine.png", height:150, top: -9}
	]
	
	var tabButtons = map(makeTab, tabs);

	var button_group = UI.ButtonGroup.apply(this, tabButtons);

	win.add(main_content);
	win.add(nav);
	win.open();
	delegate.root(main_content);
}
