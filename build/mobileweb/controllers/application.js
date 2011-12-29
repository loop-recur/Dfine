Controllers.application = (function() {
	var self = {}
	
	var index = Layouts.application.curry(self);
	
// delegate methods

	self.root = Controllers.content.index.p('technology');

	return {index : index}
})();
