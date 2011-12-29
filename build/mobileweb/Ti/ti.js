define("Ti", ["Ti/_/Evented"], function(Evented) {

	var ver = require.config.ti.version;

	return require.mix(Ti, Evented, {
		version: ver,
		buildDate: "12/29/11 13:33",
		buildHash: "8b047ab",
		userAgent: "Appcelerator Titanium/" + ver + " (" + navigator.userAgent + ")",

		include: function(files) {
			var i = 0;
			typeof files === "array" || (files = [].concat(Array.prototype.slice.call(arguments, 0)));
			for (; i < files.length; i++) {
				require("Ti/_/include!" + files[i]);
			}
		}
	});

});
