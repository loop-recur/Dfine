Controllers.content = (function() {
	var DEFAULT_WINDOW_NAME = 'content';
	var window = null
		, content_view = null;


	var _getWindow = function(window_name){
		window_name = window_name || DEFAULT_WINDOW_NAME;
		if(window && window.id == window_name){
			return window;
		} 
		window = Windows[window_name]();
		window.id = window_name; 
		return window;
	};
	
	var _makeNewContentView = function(){
		return Ti.UI.createView({
			id: "content_view",
			left:0,
			height: "100%"
		});
	};

	// Where all the content from the views will be added to.
	var _getContentView = function(view_type){
		window = window ||  _getWindow();
		content_view = findFirstByProperty('id', 'content_view', window.getChildren()) || _makeNewContentView();
		if(view_type == 'blank'){ App.removeAllChildren(content_view);}
		return content_view;
	};
	
	var _getView = function(view_name){
		console.log("view_name = "+ view_name);
		return Views.content[view_name](window);
	};
	
	// Checks the view for a layout container that the view will go into. And then applies the view.
	var	_applyView = function(view_name){
		var new_view = _getView(view_name)
		 	, parent_view = {};
		
		var lc_name = new_view.layout_container;
		console.log("_applyview: lc_name = "+ lc_name)
	  if(lc_name){  // Use a Layout Container
			parent_view = findFirstByProperty('id', "lc_"+lc_name, content_view.getChildren()) || Views.layout_containers[lc_name]();
			content_view.add(parent_view);
		} else { // Just use the content_view 
			parent_view = content_view;
		}
		App.removeAllChildren(parent_view);
		parent_view.add(new_view);
		return new_view;
	};
	
	
	/* Will render a completely new view, wiping out everything that was previously on the screen. 
	*  Takes in multiple views, the views will be added to the window in the same order as they are passed in. 
	*/
	var renderView = function(){
		_getContentView('blank');
	  var view
			, arg_values = renderView.arguments
			, arg_length = arg_values.length;	 
			
		// Opening the window.
		window.open();
		
		for( var i = 0; i < arg_length; i++){
			console.log("ALL arg_values = "+ JSON.stringify(arg_values));
			console.log("arg_values = "+ arg_values + "| arg_length = "+ arg_length);
			console.log("i = "+ i + " and arg_values[i] = " + JSON.stringify(arg_values[i]));
			view = _applyView(arg_values[i]);
			console.log("view = "+ view);
		};
		window.add(content_view);
	};
	

	/* 
	* For rendering a simple content view on top of another view. Useful for quick view swaps. 
	* This assumes that the view has a 'layout_container' element. If it can't find one, then will simply attach to the main content_view 
	*/
	var renderSubView = function(view_name){
		content_view = content_view || _getContentView();
		var new_view = _applyView(view_name);
	};
	
	// A super hackey nasty bit of code that clears out the layout containers.
	var clearLayoutContainers = function(){
		var arg_values = clearLayoutContainers.arguments
			, arg_length = arg_values.length;	 
		content_view = _getContentView();
		console.log("clearLCs: arg_values = "+ JSON.stringify(arg_values));
		cv_children = content_view.getChildren();
		console.log("clearLCs: cv_children = " + JSON.stringify(cv_children));
		for(var i=0, len = arg_length; i < len; i++){
			var lc = findFirstByProperty('id', "lc_"+ arg_values[i], cv_children);
			if(lc){ content_view.remove(lc);}
		};
	};
	
	return {renderView: renderView, renderSubView: renderSubView, clearLayoutContainers: clearLayoutContainers};
	
})();

