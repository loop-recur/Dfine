Views.content.b_tabs = function() {
	var tabButtons;
			
	var nav = Ti.UI.createView({
		layout: "horizontal",
		width: "100%",
		layout_container: "right_nav"
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

		var view_name = attrs.view_name || Formatter.underscore(attrs.name)
		tab.addEventListener('click', function(e){Controllers.content.renderSubView(view_name);});
		nav.add(tab);
		console.log("Tab is "+ attrs.name + " and the z index is: " + tab.zIndex);
		return tab;
	}
	
	var tab_attrs = [
		{name: "Technology", view_name: "b_technology", background: "images/tabs/tabs_technology.png", height:160, top:36}
		, {name: "Results", view_name: "b_results", background: "images/star/tabs/tabs_results.png", height:150, top:0}
		, {name: "Case Studies", view_name: "b_case_studies", background: "images/tabs/tabs_case_studies.png", height:190, top:0}
		, {name: "Cost", view_name: "b_cost", background: "images/tabs/tabs_cost.png", height:150, top: -10}
		, {name: "Reimbursement", view_name: "b_reimbursement", background: "images/tabs/tabs_reimbursement.png", height:190,top:-20}
		, {name: "Dfine", view_name: "inner_dfine", background: "images/tabs/tabs_dfine.png", height:150, top: -9}
	]
	
	tabButtons = map(makeTab, tab_attrs);

	var button_group = UI.ButtonGroup.apply(this, tabButtons);
	
	return nav;
}