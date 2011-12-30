Layouts.application = function(delegate) {	
	var win = Ti.UI.createWindow({
		backgroundImage:'images/main_bg.png',
		orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	
	var main_content = Ti.UI.createView({
		backgroundImage:'images/main_bg.png',
	});
	
	var nav = Ti.UI.createView({
		layout: "horizontal",
		right: 0,
		height:"100%",
		width:60
	});
	
	var makeTab = function(attrs) {
		var tab = Ti.UI.createButton({
			backgroundImage:attrs.background,
			right:0,
			width:attrs.width,
			height:attrs.height,
			top:-40
		});
		
		tab.addEventListener('click', App.swapView(main_content, Controllers.content.index.p(Formatter.underscore(attrs.name))));
		nav.add(tab);
		return tab;
	}
	
	var tabs = [ 
		{name: "Technology", background: "images/tabs/tabs_technology.png", width:60, height:160}
		, {name: "Results", background: "images/tabs/tabs_results.png", width:60, height:150}
		, {name: "Case Studies", background: "images/tabs/tabs_case_studies.png", width:60, height:190}
		, {name: "Cost", background: "images/tabs/tabs_cost.png", width:60, height:150}
		, {name: "Reimbursment", background: "images/tabs/tabs_reimbursement.png", width:60, height:190}
		, {name: "Dfine", background: "images/tabs/tabs_dfine.png", width:60, height:150}
	]
	
	var tabButtons = map(makeTab, tabs);

	var button_group = UI.ButtonGroup.apply(this, tabButtons);

	win.add(main_content);
	win.add(nav);
	win.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	delegate.root(main_content);
}
