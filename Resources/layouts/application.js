Layouts.application = function(delegate) {	
	var win = Ti.UI.createWindow({
		backgroundColor:'white',
		orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	
	var main_content = Ti.UI.createView({
		backgroundColor:'#efefef',
		width: "90%",
		left: 0
	});
	
	var nav = Ti.UI.createView({
		layout: "horizontal",
		right: 0,
		height: "95%",
		width: "10%"
	});
	
	var makeTab = function(attrs) {
		var tab = Ti.UI.createButton({
			backgroundColor:attrs.background,
			left: 0,
			right:0,
			width:60,
			height:120,
			top: 40,
			title: attrs.name
		});
		
		tab.addEventListener('click', App.swapView(main_content, Controllers.content.index.p(Formatter.underscore(attrs.name))));
		nav.add(tab);
		return tab;
	}
	
	var tabs = [ 
		{name: "Technology", background: "red"}
		, {name: "Results", background: "blue"}
		, {name: "Case Studies", background: "green"}
		, {name: "Cost", background: "orange"}
		, {name: "Reimbursment", background: "purple"}
		, {name: "Dfine", background: "yellow"}
	]
	
	var tabButtons = map(makeTab, tabs);

	var button_group = UI.ButtonGroup.apply(this, tabButtons);

	win.add(nav);
	win.add(main_content);
	win.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	delegate.root(main_content);
}
