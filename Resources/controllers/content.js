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
	
	var _getView = function(view_name, window){
		console.log("view_name = "+ view_name);
		console.log("Views.content[view_name](window) " + Views.content[view_name](window));
		
		return Views.content[view_name](window);
	};
	
	// Takes in multiple views, the views will be added to the window in the same order as they are passed in. 
	var renderView = function(){
		var window = _getWindow();
	  var view
			, content_view =  _getBlankContentView(window);	 
		
		for( var i = 0, len = arguments.length; i < len; i++ ){
			console.log("arguments = "+ arguments);
			console.log("i = "+ i + " and arguments[i] = " + arguments[i]);
			view = _getView(arguments[i], window);
			console.log("window = "+ window);
			console.log("view = "+ view);
			content_view.add(view); // Applying content to the content_view. 
		};
		window.add(content_view);

		// Opening the window.
		window.open();
	};
	
	return {renderView: renderView};
	
})();