//
// GridRowHeight
// Returns the height of a tableviewrow dependend on the display density
//
function GridRowHeight() {
	if (Ti.Platform.osname === 'android') {
		if (Titanium.Platform.displayCaps.density == "high") {
			return 67;
		}
		else if (Titanium.Platform.displayCaps.density == "medium") {
			return 47;
		}
		else {
			return 35;
		}
	}
	else {
		return 47;
	}
}

//
// GridRow
// Generates a new GridRow object, which is used to store the cells.
// className: class name for tableviewrow. Used for performance. See Appcelerator Titanium documentation.
//
function GridRow(className) {
	this.ClassName = className;
	this.Cells = [];
}

//
// GridCell
// Generates a new GridCell object, which is used to store the entries.
// cellColor: Backgroundcolor of the cell.
//
function GridCell(cellColor) {
	this.CellColor = cellColor;
	this.Entry = [];
	
	this.AddEntry = function(entry) {
		this.Entry[this.Entry.length] = entry;
	} ;
}

//
// GridEntry
// Generates a new GridEntry, which is used to display information.
// text: Text to display.
// textAlign: For Example 'center'. See documentation of Label.
// font: Font properties. See documentation of Label.
// color: Foreground color.  See documentation of Label.
// bgColor: Backgroundcolor. See documentation of Label.
//
function GridEntry(text, textAlign, font, color, bgColor){
	this.Text = text;
	this.TextAlign = textAlign;
	this.Font = font;
	this.Color = color;
	this.BgColor = bgColor;
	this.Height = GridRowHeight();
}

//
// Cell
// Internal data structure.
//
function Cell() {
	this.View = null;
	this.Label = [];
}

//
// Row
// Internal data structure.
//
function Row() {
	this.TableViewRow = null;
	this.Cells = [];
}

//
// GridClick
// Event handler for click events on tableviewrows.
// e: Event arguments.
//
function GridClick(e) {
	var trc = null;
	if (typeof(Trace) == 'function') {
		trc = new Trace(TraceMode, TraceActive);
	}

    try
    {
        if (trc != null) { trc.Begin('GridClick'); }

        if (e.source != null) {
            if (trc != null) { trc.Info('e.source: ' + e.source);	}
            if (trc != null) { trc.Debug('DataRow: ' + e.source.DataRow + ', DataColumn: ' + e.source.DataColumn); }
            
            if ((e.source.Grid != null) && (e.source.Grid.clickEvent != null)) {
                e.source.Grid.clickEvent(trc, {
                    source: e.source.Grid,
                    row: e.source.DataRow,
                    column: e.source.DataColumn
                });
            }
        }
        
        if (trc != null) {
        		trc.End('GridClick');
        		trc.Clear();
        	}
    }
	catch(exc) {
		if (trc != null) {
			trc.SetMessage(exc.name, exc.message, trc);
		}
		else {
			throw exc;
		}
	}

	if ((trc != null) && trc.IsError()) {
		trc.Show();
	}
}

//
// Grid
// Creates the grid/view to display the table.
// trc: Optional Trace object.
// x: Left coordinate.
// y: Top coordinate.
// width: Width of the grid.
// height: Height of the grid. When set to null, the grid takes the maximum height.
// fixedWidth: Array with the width of the left most columns. Normally all columns have the same width. With this parameter you can set the width of some (leftmost) columns to a fixed value.
//
function Grid(trc, x, y, width, height, fixedWidth){
    if (trc != null) { trc.Begin('Grid(' + x + ', ' + y + ', ' + width + ', ' + height + ')'); }

    this.Rows = [];
    this.cellSpacing = 1;
    this.numberOfColumns = 1;
    this.columnWidth = null;
    this.oldWidth = null;
    this.data = null;
    this.clickEvent = null;
    this.header = null;
    this.fixedWidth = fixedWidth;
    this.activityView = null;
    this.activityIndicator = null;
    this.activityMilliseconds = null;
    this.activityStartTime = null;
	this.activityThreshold = 300;
	this.tableViewData = null;
	this.dataChanged = false;

	var viewOptions = {
        left: x,
        top: y,
        width: width
	};
	
	if (height != null) {
		viewOptions.height = height;
	}
	
    this.view = Ti.UI.createView(viewOptions);

    this.headerView = Ti.UI.createView({
        left: 0,
        top: 0,
        width: width,
        height: GridRowHeight() + this.cellSpacing,
        backgroundColor: '#c0c0c0',
        zIndex: 1
    });
    this.view.add(this.headerView);
    
    var tableviewTop = this.headerView.height;
    if (Ti.Platform.osname !== 'android') {
		var border = Titanium.UI.createView({
			top: tableviewTop,
			height: 1,
			backgroundColor: '#c0c0c0'
		});
		this.view.add(border);
		tableviewTop++;
    }

	var tableViewOptions = {
        left: 0,
        top: tableviewTop,
        width: width,
        backgroundColor: '#c0c0c0',
        separatorColor: '#c0c0c0',
        allowSelection: false,
        zIndex: 1
	};

	if (height != null) {
        tableViewOptions.height = height - this.headerView.height;
	}
	
    this.tableView = Titanium.UI.createTableView(tableViewOptions);
    this.view.add(this.tableView);

    //
    // ShowActivityIndicator
    // Darkens the screen and shows an activity indicator.
    // trc: Optional trace object (Trace for Titanium). 
    // msg: Message to display.
    // milliseconds: Timespan, after which the activity indicator will be shown. null: show directly.
    //
    this.ShowActivityIndicator = function(trc, msg, milliseconds) {
        if (trc != null) { trc.Begin('Grid.ShowActivityIndicator(' + msg + ', ' + milliseconds + ')'); }
        
        if (milliseconds == null) {
            if (Ti.Platform.osname !== 'android') {
                if (this.activityView == null) {
                    this.activityView = Ti.UI.createView({
                        backgroundColor: '#000000',
                        opacity: 0.5,
                        left: this.view.left,
                        top: this.view.top,
                        width: this.view.width,
                        height: this.view.height,
                        zIndex: 2
                    });
                    
                    this.view.add(this.activityView);
                }
                else {
                    this.activityView.show();
                }
            }
            
            if (this.activityIndicator == null) {
                this.activityIndicator = Ti.UI.createActivityIndicator({
                    width: 32,
                    height: 32,
                    style: (Ti.Platform.osname === 'android')? null:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
                });
            }
            
            if (this.activityView != null) {
                this.activityView.add(this.activityIndicator);
            }
            
            this.activityIndicator.message = msg;
            this.activityIndicator.show();
        }
        else {
            this.activityMilliseconds = milliseconds;
            this.activityStartTime = new Date();
        }
        
        if (trc != null) { trc.End('Grid.ShowActivityIndicator'); }
    };

    //
    // UpdateActivityIndicator
    // Update the message.
    // trc: Optional trace object (Trace for Titanium).
    // msg: Message.
    // 
    this.UpdateActivityIndicator = function(trc, msg) {
        if (trc != null) { trc.Begin('Grid.UpdateActivityIndicator(' + msg + ')'); }

        if (this.activityMilliseconds != null) {
            var now = new Date();
            var delta = now - this.activityStartTime;
            if (trc != null) { trc.Info('Grid.UpdateActivityIndicator - delta: ' + delta); }
            
            if (delta > this.activityMilliseconds) {
                if (Ti.Platform.osname !== 'android') {
                    if (this.activityView == null) {
                        this.activityView = Ti.UI.createView({
                            backgroundColor: '#000000',
                            opacity: 0.5,
                            left: this.view.left,
                            top: this.view.top,
                            width: this.view.width,
                            height: this.view.height,
                            zIndex: 2
                        });
                    
                        this.view.add(this.activityView);
                    }
                    else {
                        this.activityView.show();
                    }
                }
                
                if (this.activityIndicator == null) {
                    this.activityIndicator = Ti.UI.createActivityIndicator({
                        width: 32,
                        height: 32,
                        style: (Ti.Platform.osname === 'android')? null:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
                    });
                }
                
                if (this.activityView != null) {
                    this.activityView.add(this.activityIndicator);
                }
                
                this.activityIndicator.message = msg;
                this.activityIndicator.show();

                this.activityMilliseconds = null;
                this.activityStartTime = null;
            }
        }
        else {
            if (this.activityIndicator != null) {
                this.activityIndicator.message = msg;
            }
        }
        
        if (trc != null) { trc.End('Grid.UpdateActivityIndicator'); }
    };

    //
    // HideActivityIndicator
    // Hides the activity indicator.
    // trc: Optional trace object (Trace for Titanium).
    //
    this.HideActivityIndicator = function(trc) {
        if (trc != null) { trc.Begin('Grid.HideActivityIndicator'); }

        if (this.activityIndicator != null) {
            this.activityIndicator.hide();
        }
        
        if (this.activityView != null) {
            this.activityView.hide();
        }
        
        if (trc != null) { trc.End('Grid.HideActivityIndicator'); }
    };

    //
    // calculateColumnWidth
    // Calcultes the widths of all columns based on the width of the grid and the number of columns.
    // width: Width of the grid.
    //
    this.calculateColumnWidth = function(trc, width) {
        if (trc) { trc.Begin('Grid.calculateColumnWidth(' + width + ')'); }
        
        // Check if something has changed
        if ((this.columnWidth == null) || (width != this.oldWidth) || (this.columnWidth.length != this.numberOfColumns)) {
            this.oldWidth = width;
            
            // Android has a small margin on both sides of the tableview
            if (Ti.Platform.osname === 'android') {
                width -= 12;
            }
            
            this.columnWidth = [];
            var numberOfColumns = this.numberOfColumns;
            
            // Assign the fixed widths first
            if (this.fixedWidth != null) {
                for (var f = 0; f < this.fixedWidth.length; f++) {
                    this.columnWidth.push(this.fixedWidth[f]);
                    if (trc) { trc.Info('columnWidth[' + (this.columnWidth.length - 1) + ']: ' + this.columnWidth[this.columnWidth.length - 1]); }
                    
                    width -= this.fixedWidth[f] + this.cellSpacing;
                    numberOfColumns--;
                }	
            }
            
            var w = Math.floor(width / numberOfColumns) - this.cellSpacing;

            if (Ti.Platform.osname !== 'android') {
                w -= w%2;
            }

			var w1 = width - (numberOfColumns - 1) * (w + this.cellSpacing);
            if (Ti.Platform.osname !== 'android') {
                w1 -= w1%2;
            }
            this.columnWidth.push(w1);
            if (trc) { trc.Info('columnWidth[' + (this.columnWidth.length - 1) + ']: ' + this.columnWidth[this.columnWidth.length - 1]); }
            
            for (var c = 1; c < numberOfColumns; c++) {
                this.columnWidth.push(w);
                if (trc) { trc.Info('columnWidth[' + (this.columnWidth.length - 1) + ']: ' + this.columnWidth[this.columnWidth.length - 1]); }
            }
        }
        
        if (trc) { trc.End('calculateColumnWidth calculates widths for ' + this.columnWidth.length + ' columns.'); }
    };

    //
    // BindCell
    // Binds the data to one cell.
    // For internal use only!
    // trc: Optional Trace object.
    // r: Number of the row.
    // c: Number of the column.
    // x: X-coordinate.
    // width: Width of the column.
    // height: Height of the row.
    // dataCell: GridCell object with cell data.
    //
    this.BindCell = function(trc, r, c, x, width, height, dataCell) {
        if (trc != null) { trc.Begin('BindCell(' + r + ', ' + c + ', ' + x + ', ' + width + ', ' + height + ', ' + dataCell.Entry.length + ')'); }
        
		this.Rows[r].Cells[c] = new Cell();        
        var view = [];
        var label = null;

        if (dataCell.Entry.length == 0) {
            // Add blank view in order to get click coordinates
            label = Ti.UI.createLabel({
                backgroundColor: dataCell.CellColor,
                borderWidth: 1.0,
                borderColor: dataCell.CellColor,
                left: x,
                top: 0,
                width: width,
                height: height,
                touchEnabled: true
            });
            label.DataRow = r;
            label.DataColumn = c;
            label.Grid = this;
            view.push(label);
            this.Rows[r].Cells[c].Label.push(label);
        }
        else {
            var entryTop = (Ti.Platform.osname === 'android')? 0:-1;
            for (var e1 = 0; e1 < dataCell.Entry.length; e1++) {
                label = Ti.UI.createLabel({
                    text: dataCell.Entry[e1].Text,
                    textAlign: dataCell.Entry[e1].TextAlign,
                    color: dataCell.Entry[e1].Color,
                    font: dataCell.Entry[e1].Font,
                    backgroundColor: (dataCell.Entry[e1].BgColor != null)? dataCell.Entry[e1].BgColor:dataCell.CellColor,
                    left: x,
                    top: entryTop,
                    width: width,
                    height: dataCell.Entry[e1].Height,
                    touchEnabled: true
                });
                
                label.DataRow = r;
                label.DataColumn = c;
                label.Grid = this;
                view.push(label);                
                this.Rows[r].Cells[c].Label.push(label);
                
                entryTop += dataCell.Entry[e1].Height + this.cellSpacing;
            }
            
            if (entryTop < height) {
				if (entryTop > 0) {
					entryTop -= this.cellSpacing;
				}
				
                // Add blank view to fill space
                label = Ti.UI.createLabel({
                    backgroundColor: dataCell.CellColor,
                    left: x,
                    top: entryTop,
                    width: width,
                    height: height - entryTop,
                    touchEnabled: true
                });
                label.DataRow = r;
                label.DataColumn = c;
                label.Grid = this;
                view.push(label);
                this.Rows[r].Cells[c].Label.push(label);
            }
        }
        
        if (trc != null) { trc.End('BindCell'); }
        return view;
    };

    //
    // RowHeight
    // Calculates the height of the row depending on the number of entries in each cell.
    // r: Number of the row.
    // dataRow: GridRow object with row data.
    //
    this.RowHeight = function(trc, r, dataRow) {
        if (trc != null) { trc.Begin('Grid.RowHeight(' + r + ', ' + dataRow + ')'); }
        
        // Minimum height of row. Should be density dependend
        var rowHeight = GridRowHeight();
        
        // Determine the column with the biggest height
        for (var c = 0; c < dataRow.Cells.length; c++) {
            var height = 0;
            for (var e = 0; e < dataRow.Cells[c].Entry.length; e++) {
                if (e > 0) {
                    height += this.cellSpacing;
                }
                height += dataRow.Cells[c].Entry[e].Height;
            }
            
            if (height > rowHeight) {
                rowHeight = height;
            }
        }
        
        if (trc != null) { trc.End('RowHeight returning ' + rowHeight); }
        return rowHeight;
    };

    //
    // BindRow
    // Bind the data to one row
    // r: Number of row.
    // rowHeight: Height of actual row.
    // dataRow: GridRow object with row data.
    //
    this.BindRow = function(trc, r, rowHeight, dataRow) {
        if (trc != null) { trc.Begin('Grid.BindRow(' + r + ', ' + rowHeight + ', ' + dataRow.Cells.length + ')'); }
        if (trc != null) { trc.Debug('dataRow.ClassName[' + r + ']: ' + dataRow.ClassName); }
        
        this.Rows[r] = new Row();
        var row = this.Rows[r].TableViewRow = Titanium.UI.createTableViewRow({
            height: rowHeight,
            backgroundColor: '#c0c0c0',
            touchEnabled: false,
            className: dataRow.ClassName
        });
	        
        var x = 0;
        for (var c = 0; c < dataRow.Cells.length; c++) {
	        	var width = this.columnWidth[c];
            var view = this.BindCell(trc, r, c, x, width, rowHeight, dataRow.Cells[c]);
            
            for (var l = 0; l < view.length; l++) {
                row.add(view[l]);
            }			
            
            x += width + this.cellSpacing;
        }
        
        if (trc != null) { trc.End('Grid.BindRow'); }
        return row;
    };

    //
    // DataBind
    // Binds the data to the grid. Creating all rows and cells. Calculates numberOfColumns!
    // trc: Optional trace object (Trace for Titanium).
    // data: Array of GridRows.
    //
    this.DataBind = function(trc, data) {
        if (trc != null) { trc.Begin('Grid.DataBind(' + data.length + ')'); } 
        
		// Save original data for OrientationChange
		this.data = data;
		
        // Show activity indicator after n milliseconds
		this.ShowActivityIndicator(trc, '0%', this.activityThreshold);
        
        if ((data.length >= 1) && (data[0].Cells.length >= 1)) {
            this.numberOfColumns = data[0].Cells.length;
        }
        else {
        		if ((this.header != null) && (this.header.length > 0)) {
        			this.numberOfColumns = this.header.length;
        		}
        		else {
				this.numberOfColumns = 1;
			}
        }
        
        this.calculateColumnWidth(trc, this.tableView.width);
        
        this.tableViewData = [];
        this.Rows = [];

        for (var r = 0; r < data.length; r++) {
            if (trc != null) { trc.Debug('Grid.BindData - data[r]: ' + data[r] + ', data[r].Cells: ' + data[r].Cells.length); }
            
            this.UpdateActivityIndicator(trc, '' + Math.round(100*(r + 1)/data.length) + '%');
            
            var rowHeight = this.RowHeight(trc, r, data[r]);
            this.tableViewData.push(this.BindRow(trc, r, rowHeight, data[r]));
        }
        
        if (trc != null) { trc.Debug('Grid.BindData - this.tableViewData[' + this.tableViewData.length + ']'); }
        this.tableView.setData(this.tableViewData);
        
        this.HideActivityIndicator(trc);
		this.dataChanged = false;
        
        if (trc != null) { trc.End('Grid.BindData'); }
    };
	
    //
    // UpdateRow
    // Updates one single row.
    // trc: Optional trace object (Trace for Titanium).
    // r: Index of the row to update.
	// dataRow: Data of the row.
    //
	this.UpdateRow = function(trc, r, dataRow) {
		if (trc != null) { trc.Begin('Grid.UpdateRow(' + r + ')'); }
		
		this.data[r] = dataRow;
		var rowHeight = this.RowHeight(trc, r, dataRow);
		var row = this.BindRow(trc, r, rowHeight, dataRow);
		this.tableViewData[r] = row;
		
        this.tableView.setData(this.tableViewData);
		this.dataChanged = true;

		if (trc != null) { trc.End('Grid.UpdateRow'); }
	}

    //
    // UpdateRows
    // Updates n rows.
    // trc: Optional trace object (Trace for Titanium).
    // r1: Index of the first row to update.
    // r2: Index of the last row to update.
	// data: Complete data (not only from r1 to r2!).
    //
	this.UpdateRows = function(trc, r1, r2, data) {
		if (trc != null) { trc.Begin('Grid.UpdateRow(' + r1 + ', ' + r2 + ')'); }
		
        // Show activity indicator after n milliseconds
		this.ShowActivityIndicator(trc, '0%', this.activityThreshold);
        
		for (var r = r1; r <= r2; r++) {
            this.UpdateActivityIndicator(trc, '' + Math.round(100*(r + 1)/data.length) + '%');
            
			this.data[r] = data[r];
			var rowHeight = this.RowHeight(trc, r, data[r]);
			var row = this.BindRow(trc, r, rowHeight, data[r]);
			this.tableViewData[r] = row;
		}
		
        this.tableView.setData(this.tableViewData);
        this.HideActivityIndicator(trc);
		this.dataChanged = true;

		if (trc != null) { trc.End('Grid.UpdateRow'); }
	}

    this.GetView = function() {
        return this.view;
    };

    //
    // SetHeader
    // trc: Optional trace object (Trace for Titanium)
    // header: Array with label properties (text)
    //
    this.SetHeader = function(trc, header) {
        if (trc != null) { trc.Begin('Grid.SetHeader(' + ((header != null)? header.length:null) + ')'); }
        
        if (header != null) {
            // Use dimension of header to temporally calc calumn widths
            this.numberOfColumns = header.length;
            this.calculateColumnWidth(trc, this.tableView.width);
            
            var x = (Ti.Platform.osname === 'android')? 5 : 0;
            this.header = [];
            
            for (var h = 0; h < header.length; h++) {
                var headerOptions = header[h];
                
                headerOptions.left = x;
                headerOptions.top = 0;
                headerOptions.width = this.columnWidth[h];

                if (headerOptions.height == null) {
                    headerOptions.height = GridRowHeight();
                }
                if (trc != null) { trc.Debug('Creating label(' + headerOptions.left + ', ' + headerOptions.top + ', ' + headerOptions.width + ', ' + headerOptions.height + ')'); }
                                
                var label = Ti.UI.createLabel(headerOptions);
                this.headerView.add(label);
                this.header.push(label);
                 
                x += this.columnWidth[h] + this.cellSpacing;
            }
        }
        else {
            // Remove header view
            this.header = null;
        }
        
        if (trc != null) { trc.End('Grid.SetHeader'); }
    };

    //
    // OrientationChange
    // Adjusts the position and size of all display elements.
    // trc: Optional trace object (Trace for Titanium).
    // newX: New x coordinate (left).
    // newY: New y coordinate (top).
    // newWidth: New width.
    // newHeight: New height.
    //
    this.OrientationChange = function(trc, newX, newY, newWidth, newHeight) {
        if (trc != null) { trc.Begin('Grid.OrientationChange(' + newX + ', ' + newY + ', ' + newWidth + ', ' + newHeight + ')'); }
        
        // Check if anything has changed
        if ((this.view.left != newX) || (this.view.top != newY) || (this.view.width != newWidth) /* || (this.view.height != newHeight) */ ) {
            this.view.left = newX;
            this.view.top = newY;
            this.view.width = newWidth;
			if (newHeight != null) {
				this.view.height = newHeight;
			}
			
            this.headerView.width = newWidth;
            
            this.tableView.width = newWidth;
			if (newHeight != null) {
				this.tableView.height = newHeight - this.headerView.height;
			}
			
            if (this.activityView != null) {
                this.activityView.left = newX;
                this.activityView.top = newY;
                this.activityView.width = newWidth;
			    if (newHeight != null) {
                    this.activityView.height = newHeight;
			    }
            }
            
            this.calculateColumnWidth(trc, newWidth);

            // Adjust the size of the header
            var x = (Ti.Platform.osname === 'android')? 5 : 0;
            if (this.header != null) {
				for (var h = 0; h < this.header.length; h++) {
					this.header[h].left = x;
					this.header[h].width = this.columnWidth[h];
					
					x += this.columnWidth[h] + this.cellSpacing;
				}
            }
            
			if (this.dataChanged) {
				if (trc != null) { trc.Debug('Grid.OrientationChange - DataBind'); }
				this.DataBind(trc, this.data);
			}
			else {
				if (trc != null) { trc.Debug('Grid.OrientationChange - Update all rows'); }
				
				// Show activity indicator after n milliseconds
				this.ShowActivityIndicator(trc, '0%', this.activityThreshold);
				
				// Adjust the position and size of all views and labels
				for (var r = 0; r < this.Rows.length; r++) {
					this.UpdateActivityIndicator(trc, '' + Math.round(100 * (r + 1) / this.Rows.length) + '%');
					
					x = 0;
					for (var c = 0; c < this.Rows[r].Cells.length; c++) {
						if (this.Rows[r].Cells[c].View != null) {
							this.Rows[r].Cells[c].View.left = x;
							this.Rows[r].Cells[c].View.width = this.columnWidth[c];
						}
						
						for (var l = 0; l < this.Rows[r].Cells[c].Label.length; l++) {
							this.Rows[r].Cells[c].Label[l].left = x;
							this.Rows[r].Cells[c].Label[l].width = this.columnWidth[c];
						}
						
						x += this.columnWidth[c] + this.cellSpacing;
					}
				}
				
				this.tableView.setData(this.tableViewData);
			}
        }
        
        this.HideActivityIndicator(trc);
                
        if (trc != null) { trc.End('Grid.OrientationChange'); }
    };

    //
    // SetClickEvent(trc, clickEvent)
    // Sets the function pointer to the event listener for the cklick event.
    // trc: Optional trace object (Trace for Titanium).
    // clickEvent: Function pointer.
    //
    this.SetClickEvent = function(trc, clickEvent) {
        if (trc != null) { trc.Begin('Grid.SetClickEvent(' + clickEvent + ')'); }
        
        if (this.tableView != null) {
            // Remove previous event listener
            if (this.clickEvent != null) {
                this.tableView.removeEventListener('click', GridClick);
                this.clickEvent = null;
            }
        
            // Add new event listener
            if (clickEvent != null) {
                this.clickEvent = clickEvent;
                this.tableView.addEventListener('click', GridClick);
            }
        }
        
        if (trc != null) { trc.End('Grid.SetClickEvent'); }
    };

    if (trc != null) { trc.End('Grid()'); }
}
