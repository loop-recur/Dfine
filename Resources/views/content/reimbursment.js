Views.content.reimbursment = function(win) {
	var table1Data = [
		["ICD-9 Code", "Fiscal Year", "ICD-9 Code Title", "ICD-9 Code Description"]
		, ["81.66", "2010", "Percutaneous veterbral augmentation", "Insertion of inflatable balloon, bone tamp, or other device displacing (removing) (compacting) bone to create a space (cavity) (void) prior to the injection of bone void filler (cement) (polymethylmethacrylate) (PMMA) or other substance. Arcuplasty, Kyphoplasty, SKyphoplasty, Spineoplasty.*\n\n"]
	]
	
	var table2Data = [
		["CPT Code", "CPT Code Description", "Ambulatory Payment Classification (APC)"]
		, ["22523", "Percutaneous vertebral augmentation, including cavity creation (fracture reduction and bone biopsy included when performed) using mechanical device, one vertebral body, unilateral or bilateral cannulation (eg, kyphoplasty); thoracic\n\n", "APC 0052"]
		, ["22524", "Percutaneous vertebral augmentation, including cavity creation (fracture reduction and bone biopsy included when performed) using mechanical device, one vertebral body, unilateral or bilateral cannulation (eg, kyphoplasty); lumbar\n\n", "APC 0052"]
		, ["22525", "Each additional thoracic or lumbar vertebral body", "APC 0052"]
	]
	
	
	var view = Ti.UI.createView({
	});
	
	var left_label = Ti.UI.createLabel({
		text: "Vertebral Augmentation Coding: Effective October 1, 2008 (ICD-9 CM 2010 Volumes 1 & 2)",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:25,fontWeight:'regular'},
		color:"#023f66",
		width:400,
		top:100,
		left:30,
		height:'auto',
		textAlign:"center"
	});
	
	var right_label2 = Ti.UI.createLabel({
		text: "CPT codes and corresponding APC codes for vertebral augmentation",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:25,fontWeight:'regular'},
		color:"#023f66",
		width:400,
		top:100,
		left:500,
		height:'auto',
		textAlign:"center"
	});
	
	view.add(left_label);
	view.add(right_label2);


	var left_footnote = Ti.UI.createLabel({
		text: "Product specific terms given as examples that were commercially available at the time of publication.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		color:"#023f66",
		width:420,
		top:470,
		left:30,
		height:'auto',
		textAlign:"center"
	});
	
	var right_footnote = Ti.UI.createLabel({
		text: "The reimbursement language herein replaces previously used terms, including, but not limited to, kyphoplasty reimbursement, kyphoplasty ICD 9 code, and kyphoplasty CPT code.",
		font:{fontFamily:'Helvetica LT CondensedLight',fontSize:15,fontWeight:'regular'},
		color:"#023f66",
		width:420,
		top:470,
		left:500,
		height:'auto',
		textAlign:"center"
	});
	
	var make_cell_view = function(data, cell, e) {
		var label = Ti.UI.createLabel({
			text: data[e.row_index][e.column_index],
			font:{fontFamily:'Helvetica LT CondensedLight',fontSize:12,fontWeight:'regular'},
			color:"#023f66",
			height:'auto',
			width:'auto',
			textAlign:"center"
		});

		cell.add(label);
	}
	
	var make_header_view = function(data, cell, e) {
		var label = Ti.UI.createLabel({
			text: data[e.row_index][e.column_index],
			font:{fontFamily:'Helvetica LT CondensedLight',fontSize:12,fontWeight:'bold'},
			color:"black",
			height:'auto',
			width:'auto',
			textAlign:"center"
		});
		
		cell.add(label);
	}
	
	var table1_rows = Grid(make_header_view.p(table1Data), make_cell_view.p(table1Data), {
		columns: 4,
		rows: 2,
		cell_widths: [70, 70, 80, 210],
		cell_height: 'auto'
	});
	
	var table1 = Ti.UI.createTableView({
		left: 10,
		top:214,
		data:table1_rows,
		backgroundColor:"#E6EAED",
		borderColor: "#C7C8CC",
		width:450,
		height:228
	});


	var table2_rows = Grid(make_header_view.p(table2Data), make_cell_view.p(table2Data), {
		columns: 3,
		rows: 3,
		cell_widths: [90, 270, 90],
		cell_height: 'auto'
	});
	
	var table2 = Ti.UI.createTableView({
		right: 100,
		top:214,
		data:table2_rows,
		backgroundColor:"#E6EAED",
		borderColor: "#C7C8CC",
		width:450,
		height:228
	});

	
	view.add(left_footnote);
	view.add(right_footnote);
	view.add(table1);
	view.add(table2);
	
	win.add(view);
}
