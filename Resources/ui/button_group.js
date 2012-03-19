UI.ButtonGroup = function() {	
	var buttons = argsToList(arguments);
	var registry = {};

	var makeActivatable = function(button) {
		registry[button.id] = {};
		registry[button.id].backgroundImage = button.backgroundImage;
		registry[button.id].backgroundSelectedImage = button.backgroundSelectedImage;
		return button;
	}
	
	var setInactive = function(button) {
		button.backgroundImage = registry[button.id].backgroundImage;
		button.zIndex = 7;
		console.log("Button : "+ button.id + " set INACTIVE has a zIndex of "+ button.zIndex);
	}
	
	var setActive = function(button) {
		button.backgroundImage = registry[button.id].backgroundSelectedImage;
		button.zIndex = 60;
		console.log("Button : "+ button.id + " set ACTIVE and has a zIndex of "+ button.zIndex + " and button.title = "+ button.title);
	}

	var toggleButtonState = function(e) {
		map(setInactive, buttons);
		setActive(e.source);
	}

	var addListeners = function(button) {
		button.addEventListener('click', toggleButtonState);
	}
	
	var activeButton = function() {
		return filter(isActive, buttons)[0];
	}
	
	var isActive = function(button) {
		return button.backgroundImage == registry[button.id].backgroundSelectedImage;
	}

	var init = map(compose(addListeners, makeActivatable));

	init(buttons);
	
	return {isActive : isActive, activeButton: activeButton, setActive: setActive};
}
