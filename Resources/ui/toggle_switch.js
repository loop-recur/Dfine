ToggleSwitch = function(toggler, togglable) {
	toggler.addEventListener('click', function(){
		togglable.visible = !togglable.visible;
	});
}
