Grid = function(headerCb, cellCb, attrs) {
	attrs = (attrs || {});
	
	var cellWidths = (attrs.cell_widths || [10])
	, cellHeight = (attrs.cell_height || 10)
	, headerHeight = (attrs.header_height || 'auto')
	, xSpacer = (attrs.x_spacer || 0)
	, ySpacer = (attrs.y_spacer || 0)
	, xGrid = (attrs.columns || 1)
	, yGrid = (attrs.rows || 1)
	, tableData = []
	, cellIndex = 0;
 
for (var y=0; y<yGrid; y++){
	var isHeader = (y < 1);
	var height = isHeader ? headerHeight : cellHeight;
	
	var thisRow = Ti.UI.createTableViewRow({
		className: "grid",
		layout: "horizontal",
		width: first(cellWidths),
		height: (height == "auto") ? height : height+(2*ySpacer)
	});

   for (var x=0; x<xGrid; x++){
		var width = cellWidths[x] || first(cellWidths);
		
		var thisView = Ti.UI.createView({
			height: height,
			width: width
		});
		
		if(!x) thisView.left = ySpacer;
		
		thisRow.add(thisView);

		var theCallback = isHeader ? headerCb : cellCb;
		theCallback(thisView, {column_index: x, row_index: y});
		
		cellIndex++;
   }

   tableData.push(thisRow);
}
	
	return tableData;
}
