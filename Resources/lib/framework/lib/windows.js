Windows = {};

Windows.replaceContent = function(new_content) {		
	if(Windows.current_content) Windows.content_window.remove(Windows.current_content);
	Windows.content_window.add(new_content);
	Windows.current_content = new_content;
};
