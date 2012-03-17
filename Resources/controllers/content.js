Controllers.content = (function() {
	var DEFAULT_WINDOW_NAME = 'content';

	// Will return a Ti.window.
	var _getWindow = function(window_name){
		window_name = window_name || DEFAULT_WINDOW_NAME;
		return Windows[window_name]();
	};
	
	var _makeNewBlankContentView = function(){
		return Ti.UI.createView({
			id: "content_view",
			left:0,
			height: "100%"
		});
	};
	
	// Where all the content from the views will be added to.
	var _getBlankContentView = function(window){
		var existing_content_view = findFirstByProperty('id', 'content_view', window.getChildren());
		if(existing_content_view){
			App.removeAllChildren(existing_content_view);
			return existing_content_view;
		} else {
			return _makeNewBlankContentView();
		}
	};
	
	var _getView = function(view_name){
		console.log("view_name = "+ view_name);
		console.log("Views.content[view_name](window) " + Views.content[view_name]());
		
		return Views.content[view_name](window);
	};
	
	// Takes in multiple views, the views will be added to the window in the same order as they are passed in. 
	var renderView = function(){
		var window = _getWindow();
	  var view
			, content_view =  _getBlankContentView(window)
			, arg_values = renderView.arguments
			, arg_length = arg_values.length;	 
			
		// Opening the window.
		window.open();
		
		for( var i = 0; i < arg_length; i++){
			console.log("ALL arg_values = "+ JSON.stringify(arg_values));
			console.log("arg_values = "+ arg_values + "| arg_length = "+ arg_length);
			console.log("i = "+ i + " and arg_values[i] = " + JSON.stringify(arg_values[i]));
			view = _getView(arg_values[i]);
			console.log("view = "+ view);
			content_view.add(view); // Applying content to the content_view. 
		};
		window.add(content_view);

	};
	
	return {renderView: renderView};
	
})();