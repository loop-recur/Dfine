Views.content.a_tabs = function() {
	var tabButtons;
			
	var nav = Ti.UI.createView({
		layout: "horizontal",
		width: "100%",
		layout_container: "right_nav", 
	});
	
	var makeTab = function(attrs) {
		var tab = UI.createButton({
			backgroundImage:attrs.background,
			backgroundSelectedImage:attrs.background,
			width:60,
			height:attrs.height,
			top:(attrs.top || 0) - 40,
			right:0,
			zIndex: 7,
			id: attrs.name
		});

		tab.addEventListener('click', function(e){Controllers.content.renderSubView(Formatter.underscore(attrs.name))});
		nav.add(tab);
		console.log("Tab is "+ attrs.name + " and the z index is: " + tab.zIndex);
		return tab;
	}
	
	var tab_attrs = [
		{name: "Technology", background: "images/tabs/tabs_technology.png", height:160, top:-2}
		, {name: "Results", background: "images/tabs/tabs_results.png", height:150, top:0}
		, {name: "Case Studies", background: "images/tabs/tabs_case_studies.png", height:190, top:0}
		, {name: "Cost", background: "images/tabs/tabs_cost.png", height:150, top: -10}
		, {name: "Reimbursment", background: "images/tabs/tabs_reimbursement.png", height:190,top:-20}
		, {name: "Dfine", background: "images/tabs/tabs_dfine.png", height:150, top: -9}
	]
	
	tabButtons = map(makeTab, tab_attrs);

	var button_group = UI.ButtonGroup.apply(this, tabButtons);
	
	return nav;
}