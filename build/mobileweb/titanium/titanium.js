/**
 * WARNING: this is generated code and will be lost if changes are made.
 * This generated source code is Copyright (c) 2010-2011 by Appcelerator, Inc. All Rights Reserved.
 */

var require={
	analytics: true,
	app: {
		copyright: "2011 by brian",
		description: "not specified",
		guid: "fac535b7-f44b-4927-ac23-1f16a60bbe6e",
		id: "dfine",
		name: "dfine",
		publisher: "brian",
		url: "http://looprecur.com",
		version: "1.0"
	},
	deployType: "development",
	has: {
		"declare-property-methods": true
	},
	project: {
		id: "com.looprecur.dfine",
		name: "dfine"
	},
	ti: {
		version: "1.9.0"
	},
	vendorPrefixes: {
		css: ["", "-webkit-", "-moz-", "-ms-", "-o-", "-khtml-"],
		dom: ["", "Webkit", "Moz", "ms", "O", "Khtml"]
	}
};
/**
 * This file contains source code from the following:
 *
 * Dojo Toolkit
 * Copyright (c) 2005-2011, The Dojo Foundation
 * New BSD License
 * <http://dojotoolkit.org>
 *
 * require.js
 * Copyright (c) 2010-2011, The Dojo Foundation
 * New BSD License / MIT License
 * <http://requirejs.org>
 * 
 * curl.js
 * Copyright (c) 2011 unscriptable.com / John Hann
 * MIT License
 * <https://github.com/unscriptable/curl>
 */

(function(global) {

	"use strict";

	var // misc variables
		x,
		odp,
		doc = global.document,
		el = doc.createElement("div"),

		// cached useful regexes
		commentRegExp = /(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,
		cjsRequireRegExp = /[^.]require\(\s*["']([^'"\s]+)["']\s*\)/g,
		reservedModuleIdsRegExp = /exports|module/,

		// the global config settings
		cfg = global.require || {},

		// shortened packagePaths variable
		pp = cfg.packagePaths || {},

		// the number of seconds to wait for a script to load before timing out
		waitSeconds = (cfg.waitSeconds || 7) * 1000,

		baseUrl = cfg.baseUrl || "./",

		// CommonJS paths
		paths = cfg.paths || {},

		// feature detection results initialize by pre-calculated tests
		hasCache = cfg.hasCache || {},

		// a queue of module definitions to evaluate once a module has loaded
		defQ = [],

		// map of module ids to functions containing an entire module, which could
		// include multiple defines. when a dependency is not defined, the loader
		// will check the cache to see if it exists first before fetching from the
		// server. this is used when the build system bundles modules into the
		// minified javascript files.
		defCache = {},

		// map of package names to package resource definitions
		packages = {},

		// map of module ids to module resource definitions that are being loaded and processed
		waiting = {},

		// map of module ids to module resource definitions
		modules = {},

		// mixin of common functions
		fnMixin;

	/******************************************************************************
	 * Utility functions
	 *****************************************************************************/

	function _mix(dest, src) {
		for (var p in src) {
			src.hasOwnProperty(p) && (dest[p] = src[p]);
		}
		return dest;
	}

	function mix(dest) {
		// summary:
		//		Copies properties by reference from a source object to a destination
		//		object, then returns the destination object. To be clear, this will
		//		modify the dest being passed in.
		var i = 1;
		dest || (dest = {});
		while (i < arguments.length) {
			_mix(dest, arguments[i++]);
		}
		return dest;
	}

	function each(a, fn) {
		// summary:
		//		Loops through each element of an array and passes it to a callback
		//		function.
		var i = 0,
			l = (a && a.length) || 0,
			args = Array.prototype.slice.call(arguments, 0);
		args.shift();
		while (i < l) {
			args[0] = a[i++];
			fn.apply(null, args);
		}
	}

	function is(it, type) {
		// summary:
		//		Tests if "it" is a specific "type". If type is omitted, then
		//		it will return the type.
		//
		// returns:
		//		Boolean if type is passed in
		//		String of type if type is not passed in

		var t = ({}).toString.call(it),
			m = t.match(/^\[object (.+)\]$/),
			v = m ? m[1] : "undefined";
		return type ? type === v : v;
	}
	
	function isDef(it) {
		// summary:
		//		Helper function that tests if "it" is defined
		//
		// returns:
		//		Boolean
		return !is(it,"Undefined");
	}

	function isEmpty(it) {
		// summary:
		//		Checks if an object is empty.
		var p;
		for (p in it) {
			break;
		}
		return !it || (!it.call && !p);
	}

	function evaluate(code, sandboxVariables, globally) {
		// summary:
		//		Evaluates code globally or in a sandbox.
		//
		// code: String
		//		The code to evaluate
		//
		// sandboxVariables: Object?
		//		When "globally" is false, an object of names => values to initialize in
		//		the sandbox. The variable names must NOT contain '-' characters.
		//
		// globally: Boolean?
		//		When true, evaluates the code in the global namespace, generally "window".
		//		If false, then it will evaluate the code in a sandbox.

		var i,
			vars = [],
			vals = [],
			r;

		if (globally) {
			r = global.eval(code);
		} else {
			for (i in sandboxVariables) {
				vars.push(i + "=__vars." + i);
				vals.push(i + ":" + i);
			}
			r = (new Function("__vars", (vars.length ? "var " + vars.join(',') + ";\n" : "") + code + "\n;return {" + vals.join(',') + "};"))(sandboxVariables);
		}

		// if the last line of a module is a console.*() call, Firebug for some reason
		// sometimes returns "_firebugIgnore" instead of undefined or null
		return r === "_firebugIgnore" ? null : r;
	}

	function compactPath(path) {
		var result = [],
			segment,
			lastSegment;
		path = path.replace(/\\/g, '/').split('/');
		while (path.length) {
			segment = path.shift();
			if (segment === ".." && result.length && lastSegment !== "..") {
				result.pop();
				lastSegment = result[result.length - 1];
			} else if (segment !== ".") {
				result.push(lastSegment = segment);
			}
		}
		return result.join("/");
	}

	/******************************************************************************
	 * has() feature detection
	 *****************************************************************************/

	function has(name) {
		// summary:
		//		Determines of a specific feature is supported.
		//
		// name: String
		//		The name of the test.
		//
		// returns: Boolean (truthy/falsey)
		//		Whether or not the feature has been detected.

		if (is(hasCache[name], "Function")) {
			hasCache[name] = hasCache[name](global, doc, el);
		}
		return hasCache[name];
	}

	has.add = function(name, test, now, force){
		// summary:
		//		Adds a feature test.
		//
		// name: String
		//		The name of the test.
		//
		// test: Function
		//		The function that tests for a feature.
		//
		// now: Boolean?
		//		If true, runs the test immediately.
		//
		// force: Boolean?
		//		If true, forces the test to override an existing test.

		if (hasCache[name] === undefined || force) {
			hasCache[name] = test;
		}
		return now && has(name);
	};

	/******************************************************************************
	 * Event handling
	 *****************************************************************************/

	function on(target, type, listener) {
		// summary:
		//		Connects a listener to an event on the specified target.

		if (type.call) {
			// event handler function
			return type.call(target, listener);
		}

		// TODO: fix touch events?

		target.addEventListener(type, listener, false);
		return function() {
			target.removeEventListener(type, listener, false);
		};
	}

	on.once = function(target, type, listener) {
		var h = on(target, type, function() {
			h && h(); // do the disconnect
			return listener.apply(this, arguments);
		});
		return h;
	};

	/******************************************************************************
	 * Configuration processing
	 *****************************************************************************/

	// make sure baseUrl ends with a slash
	if (!/\/$/.test(baseUrl)) {
		baseUrl += "/";
	}

	function configPackage(/*String|Object*/pkg, /*String?*/dir) {
		// summary:
		//		An internal helper function to configure a package and add it to the array
		//		of packages.
		//
		// pkg: String|Object
		//		The name of the package (if a string) or an object containing at a minimum
		//		the package's name, but possibly also the package's location and main
		//		source file
		//
		// dir: String?
		//		Optional. A base URL to prepend to the package location

		pkg = pkg.name ? pkg : { name: pkg };
		pkg.location = (/(^\/)|(\:)/.test(dir) ? dir : "") + (pkg.location || pkg.name);
		pkg.main = (pkg.main || "main").replace(/(^\.\/)|(\.js$)/, "");
		packages[pkg.name] = pkg;
	}

	// first init all packages from the config
	each(cfg.packages, configPackage);

	// second init all package paths and their packages from the config
	for (x in pp) {
		each(pp[x], configPackage, x + "/");
	}

	// run all feature detection tests
	for (x in cfg.has) {
		has.add(x, cfg.has[x], 0, true);
	}

	/******************************************************************************
	 * Module functionality
	 *****************************************************************************/

	function ResourceDef(name, refModule, deps, rawDef) {
		// summary:
		//		A resource definition that describes a file or module being loaded.
		//
		// description:
		//		A resource is anything that is "required" such as applications calling
		//		require() or a define() with dependencies.
		//
		//		This loader supports resources that define multiple modules, hence this
		//		object.
		//
		//		In addition, this object tracks the state of the resource (loaded,
		//		executed, etc) as well as loads a resource and executes the defintions.
		//
		// name: String
		//		The module id.
		//
		// deps: Array?
		//		An array of dependencies.
		//
		// rawDef: Object? | Function? | String?
		//		The object, function, or string that defines the resource.
		//
		// refModule: Object?
		//		A reference map used for resolving module URLs.

		var match = name && name.match(/^(.+?)\!(.*)$/),
			isRelative = /^\./.test(name),
			exports = {},
			pkg = null,
			cjs,
			_t = this;

		// name could be:
		//  - a plugin		text!/some/file.html or include!/some/file.js
		//  - a module		some/module, ../some/module
		//  - a js file		/some/file.js
		//  - a url			http://www.google.com/

		_t.name = name;
		_t.deps = deps || [];
		_t.plugin = null;
		_t.callbacks = [];

		if (!match && (/(^\/)|(\:)|(\.js$)/.test(name) || (isRelative && !refModule))) {
			_t.url = name;
		} else {
			if (match) {
				_t.plugin = _t.deps.length;
				_t.pluginArgs = match[2];
				_t.pluginCfg = cfg[match[1]];
				_t.deps.push(match[1]);
			} else if (name) {
				name = _t.name = compactPath((isRelative ? refModule.name + "/../" : "") + name);

				if (/^\./.test(name)) {
					throw new Error("Irrational path \"" + name + "\"");
				}

				// TODO: if this is a package, then we need to transform the URL into the module's path
				// MUST set pkg to anything other than null, even if this module isn't in a package
				pkg = "";

				/(^\/)|(\:)/.test(name) || (name = baseUrl + name);

				_t.url = name + ".js";
			}
		}

		_t.pkg = pkg;
		_t.rawDef = rawDef;
		_t.loaded = !!rawDef;
		_t.refModule = refModule;

		// our scoped require()
		function scopedRequire() {
			var args = Array.prototype.slice.call(arguments, 0);
			args.length > 1 || (args[1] = 0);
			args[2] = _t;
			return req.apply(null, args);
		}
		scopedRequire.toUrl = function() {
			var args = Array.prototype.slice.call(arguments, 0);
			_t.plugin === null && (args[1] = _t);
			return toUrl.apply(null, args);
		};
		mix(scopedRequire, fnMixin, {
			cache: req.cache
		});

		_t.cjs = {
			require: scopedRequire,
			exports: exports,
			module: {
				exports: exports
			}
		};
	}

	ResourceDef.prototype.load = function(sync, callback) {
		// summary:
		//		Retreives a remote script and inject it either by XHR (sync) or attaching
		//		a script tag to the DOM (async).
		//
		// sync: Boolean
		//		If true, uses XHR, otherwise uses a script tag.
		//
		// callback: Function?
		//		A function to call when sync is false and the script tag loads.

		var s,
			x,
			disconnector,
			_t = this,
			cached = defCache[_t.name],
			fireCallbacks = function() {
				each(_t.callbacks, function(c) { c(_t); });
			},
			onLoad = function(rawDef) {
				_t.loaded = 1;
				if (_t.rawDef = rawDef) {
					if (is(rawDef, "String")) {
						// if rawDef is a string, then it's either a cached string or xhr response
						if (/\.js$/.test(_t.url)) {
							rawDef = evaluate(rawDef, _t.cjs);
							_t.def = _t.rawDef = !isEmpty(rawDef.exports) ? rawDef.exports : (rawDef.module && !isEmpty(rawDef.module.exports) ? rawDef.module.exports : null);
							_t.def === null && (_t.rawDef = rawDef);
						} else {
							_t.def = rawDef;
							_t.executed = 1;
						}
					} else if (is(rawDef, "Function")) {
						// if rawDef is a function, then it's a cached module definition
						waiting[_t.name] = _t;
						rawDef();
					}
				}
				processDefQ(_t);
				fireCallbacks();
				return 1;
			};

		_t.sync = sync;
		callback && _t.callbacks.push(callback);

		// if we don't have a url, then I suppose we're loaded
		if (!_t.url) {
			_t.loaded = 1;
			fireCallbacks();
			return;
		}

		// if we're already waiting, then we can just return and our callback will be fired
		if (waiting[_t.name]) {
			return;
		}

		// if we're already loaded or the definition has been cached, then just return now
		if (_t.loaded || cached) {
			return onLoad(cached);
		}

		// mark this module as waiting to be loaded so that anonymous modules can be
		// identified
		waiting[_t.name] = _t;

		if (sync) {
			x = new XMLHttpRequest();
			x.open("GET", _t.url, false);
			x.send(null);

			if (x.status === 200) {
				return onLoad(x.responseText);
			} else {
				throw new Error("Failed to load module \"" + _t.name + "\": " + x.status);
			}
		} else {
			// insert the script tag, attach onload, wait
			x = _t.node = doc.createElement("script");
			x.type = "text/javascript";
			x.charset = "utf-8";
			x.async = true;

			disconnector = on(x, "load", function(e) {
				e = e || global.event;
				var node = e.target || e.srcElement;
				if (e.type === "load" || /complete|loaded/.test(node.readyState)) {
					disconnector();
					onLoad();
				}
			});

			// set the source url last
			x.src = _t.url;

			s = doc.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(x, s);
		}
	};

	ResourceDef.prototype.execute = function(callback) {
		// summary:
		//		Executes the resource's rawDef which defines the module.
		//
		// callback: Function?
		//		A function to call after the module has been executed.

		var _t = this;

		if (_t.executed) {
			callback && callback();
			return;
		}

		// first need to make sure we have all the deps loaded
		fetch(_t.deps, function(deps) {
			var i,
				p,
				r = _t.rawDef,
				q = defQ.slice(0), // backup the defQ
				finish = function() {
					_t.executed = 1;
					callback && callback();
				};

			// need to wipe out the defQ
			defQ = [];

			// make sure we have ourself in the waiting queue
			//waiting[_t.name] = _t;

			_t.def = _t.def
				||	(r && (is(r, "String")
						? evaluate(r, _t.cjs)
						: is(r, "Function")
							? r.apply(null, deps)
							: is(r, "Object")
								? (function(obj, vars) {
										for (var i in vars){
											this[i] = vars[i];
										}
										return obj;
									}).call({}, r, _t.cjs)
								: null
						)
					)
				||	_t.cjs.exports;

			// we might have just executed code above that could have caused a couple
			// define()'s to queue up
			processDefQ(_t);

			// restore the defQ
			defQ = q;

			// if plugin is not null, then it's the index in the deps array of the plugin
			// to invoke
			if (_t.plugin !== null) {
				p = deps[_t.plugin];

				// the plugin's content is dynamic, so just remove from the module cache
				if (p.dynamic) {
					delete modules[_t.name];
				}

				// if the plugin has a load function, then invoke it!
				p.load && p.load(_t.pluginArgs, _t.cjs.require, function(v) {
					_t.def = v;
					finish();
				}, _t.pluginCfg);
			}

			finish();
		}, function(ex) {
			throw ex;
		}, _t.refModule, _t.sync);
	};

	function getResourceDef(name, refModule, deps, rawDef, dontCache) {
		// summary:
		//		Creates a new resource definition or returns an existing one from cache.

		var module = new ResourceDef(name, refModule, deps, rawDef);

		if (name in module.cjs) {
			module.def = module[name];
			module.loaded = module.executed = 1;
			return module;
		}

		return dontCache ? module : (module.name ? modules[module.name] || (modules[module.name] = module) : module);
	}

	function processDefQ(module) {
		// summary:
		//		Executes all modules sitting in the define queue.
		//
		// description:
		//		When a resource is loaded, the remote AMD resource is fetched, it's
		//		possible that one of the define() calls was anonymous, so it should
		//		be sitting in the defQ waiting to be executed.

		var m,
			q = defQ.slice(0);
		defQ = [];

		while (q.length) {
			m = q.shift();

			// if the module is anonymous, assume this module's name
			m.name || (m.name = module.name);

			// if the module is this module, then modify this 
			if (m.name === module.name) {
				modules[m.name] = module;
				module.deps = m.deps;
				module.rawDef = m.rawDef;
				module.execute();
			} else {
				modules[m.name] = m;
				m.execute();
			}
		}

		delete waiting[module.name];
	}

	function fetch(deps, success, failure, refModule, sync) {
		// summary:
		//		Fetches all dependents and fires callback when finished or on error.
		//
		// description:
		//		The fetch() function will fetch each of the dependents either
		//		synchronously or asynchronously (default).
		//
		// deps: String | Array
		//		A string or array of module ids to load. If deps is a string, load()
		//		returns the module's definition.
		//
		// success: Function?
		//		A callback function fired once the loader successfully loads and evaluates
		//		all dependent modules. The function is passed an ordered array of
		//		dependent module definitions.
		//
		// failure: Function?
		//		A callback function fired when the loader is unable to load a module. The
		//		function is passed the exception.
		//
		// refModule: Object?
		//		A reference map used for resolving module URLs.
		//
		// sync: Boolean?
		//		Forces the async path to be sync.
		//
		// returns: Object | Function
		//		If deps is a string, then it returns the corresponding module definition,
		//		otherwise the require() function.

		var i, l, count, s = is(deps, "String");

		if (s) {
			deps = [deps];
			sync = 1;
		}

		for (i = 0, l = count = deps.length; i < l; i++) {
			deps[i] && (function(idx, name) {
				getResourceDef(deps[idx], refModule).load(!!sync, function(m) {
					m.execute(function() {
						deps[idx] = m.def;
						if (--count === 0) {
							success && success(deps);
							count = -1; // prevent success from being called the 2nd time below
						}
					});
				});
			}(i, deps[i]));
		}

		count === 0 && success && success(deps);
		return s ? deps[0] : deps;
	}

	function def(name, deps, rawDef) {
		// summary:
		//		Used to define a module and it's dependencies.
		//
		// description:
		//		Defines a module. If the module has any dependencies, the loader will
		//		resolve them before evaluating the module.
		//
		//		If any of the dependencies fail to load or the module definition causes
		//		an error, the entire definition is aborted.
		//
		// name: String|Array?
		//		Optional. The module name (if a string) or array of module IDs (if an array) of the module being defined.
		//
		// deps: Array?
		//		Optional. An array of module IDs that the rawDef being defined requires.
		//
		// rawDef: Object|Function
		//		An object or function that returns an object defining the module.
		//
		// example:
		//		Anonymous module, no deps, object definition.
		//
		//		Loader tries to detect module name, fails and ignores definition if more
		//		unable to determine name or there's already anonymous module tied to the
		//		name found.
		//
		//		If the module name is determined, then the module definition
		//		is immediately defined.
		//
		//		|	define({
		//		|		sq: function(x) { return x * x; }
		//		|	});
		//
		// example:
		//		Anonymous module, no deps, rawDef definition.
		//
		//		Loader tries to detect module name, fails and ignores definition if more
		//		unable to determine name or there's already anonymous module tied to the
		//		name found.
		//
		//		Since no deps, module definition is treated as a CommonJS module and is
		//		passed in passed require, exports, and module arguments, then immediately
		//		evaluated.
		//
		//		|	define(function(require, exports, module) {
		//		|		return {
		//		|			sq: function(x) { return x * x; }
		//		|		};
		//		|	});
		//
		// example:
		//		Named module, no deps, object definition.
		//
		//		Since no deps, the module definition is immediately defined.
		//
		//		|	define("arithmetic", {
		//		|		sq: function(x) { return x * x; }
		//		|	});
		//
		// example:
		//		Named module, no deps, rawDef definition.
		//
		//		Since no deps, module definition is treated as a CommonJS module and is
		//		passed in passed require, exports, and module arguments, then immediately
		//		evaluated.
		//
		//		|	define("arithmetic", function(require, exports, module) {
		//		|		return {
		//		|			sq: function(x) { return x * x; }
		//		|		};
		//		|	});
		//
		// example:
		//		Anonymous module, two deps, object definition.
		//
		//		Loader tries to detect module name, fails and ignores definition if more
		//		unable to determine name or there's already anonymous module tied to the
		//		name found.
		//
		//		If the module name is determined, then the loader will load the two
		//		dependencies, then once the dependencies are loaded, it will evaluate a
		//		function wrapper around the module definition.
		//
		//		|	define(["dep1", "dep2"], {
		//		|		sq: function(x) { return x * x; }
		//		|	});
		//
		// example:
		//		Anonymous module, two deps, function definition.
		//
		//		Loader tries to detect module name, fails and ignores definition if more
		//		unable to determine name or there's already anonymous module tied to the
		//		name found.
		//
		//		If the module name is determined, then the loader will load the two
		//		dependencies, then once the dependencies are loaded, it will evaluate
		//		the rawDef function.
		//
		//		|	define(["dep1", "dep2"], function(dep1, dep2) {
		//		|		return {
		//		|			sq: function(x) { return x * x; }
		//		|		};
		//		|	});
		//
		// example:
		//		Name module, two deps, object definition.
		//
		//		After the two dependencies are loaded, the loader will evaluate a
		//		function wrapper around the module definition.
		//
		//		|	define("arithmetic", ["dep1", "dep2"], {
		//		|		sq: function(x) { return x * x; }
		//		|	});
		//
		// example:
		//		Name module, two deps, function definition.
		//
		//		After the two dependencies are loaded, the loader will evaluate the
		//		function rawDef.
		//
		//		|	define("arithmetic", ["dep1", "dep2"], function(dep1, dep2) {
		//		|		return {
		//		|			sq: function(x) { return x * x; }
		//		|		};
		//		|	});

		var i = ["require"],
			module;

		if (!rawDef) {
			rawDef = deps || name;
			rawDef.length === 1 || i.concat(["exports", "module"]);
			if (typeof name !== "string") {
				deps = deps ? name : i;
				name = 0;
			} else {
				deps = i;
			}
		}

		if (reservedModuleIdsRegExp.test(name)) {
			throw new Error("Not allowed to define reserved module id \"" + name + "\"");
		}

		if (is(rawDef, "Function") && arguments.length === 1) {
			// treat rawDef as CommonJS definition and scan for any requires and add
			// them to the dependencies so that they can be loaded and passed in.
			rawDef.toString()
				.replace(commentRegExp, "")
				.replace(cjsRequireRegExp, function(match, dep) {
					deps.push(dep);
				});
		}

		module = getResourceDef(name, 0, deps, rawDef);

		// if not waiting for this module to be loaded, then the define() call was
		// possibly inline or deferred, so try fulfill dependencies, and define the
		// module right now.
		if (name && !waiting[name]) {
			module.execute();

		// otherwise we are definitely waiting for a script to load, eventhough we
		// may not know the name, we'll know when the script's onload fires.
		} else if (name || !isEmpty(waiting)) {
			defQ.push(module);

		// finally, we we're ask to define something without a name and there's no
		// scripts pending, so there's no way to know what the name is. :(
		} else {
			throw new Error("Unable to define anonymous module");
		}
	}

	// set the "amd" property and advertise supported features
	def.amd = {
		plugins: true,
		vendor: "titanium"
	};

	function toUrl(name, refModule) {
		// summary:
		//		Converts a module name including extension to a URL path.
		//
		// name: String
		//		The module name including extension.
		//
		// returns: String
		//		The fully resolved URL.
		//
		// example:
		//		Returns the URL for a HTML template file.
		//		|	define(function(require) {
		//		|		var templatePath = require.toUrl("./templates/example.html");
		//		|	});

		var	match = name.match(/(.+)(\.[^\/\.]+?)$/),
			module = getResourceDef((match && match[1]) || name, refModule, 0, 0, 1),
			url = module.url;

		module.pkg !== null && (url = url.substring(0, url.length - 3));
		return url + ((match && match[2]) || "");
	}

	function req(deps, callback, refModule) {
		// summary:
		//		Fetches a module, caches its definition, and returns the module. If an
		//		array of modules is specified, then after all of them have been
		//		asynchronously loaded, an optional callback is fired.
		//
		// deps: String | Array
		//		A string or array of strings containing valid module identifiers.
		//
		// callback: Function?
		//		Optional. A function that is fired after all dependencies have been
		//		loaded. Only applicable if deps is an array.
		//
		// refModule: Object?
		//		A reference map used for resolving module URLs.
		//
		// returns: Object | Function
		//		If calling with a string, it will return the corresponding module
		//		definition.
		//
		//		If calling with an array of dependencies and a callback function, the
		//		require() function returns itself.
		//
		// example:
		//		Synchronous call.
		//		|	require("arithmetic").sq(10); // returns 100
		//
		// example:
		//		Asynchronous call.
		//		|	require(["arithmetic", "convert"], function(arithmetic, convert) {
		//		|		convert(arithmetic.sq(10), "fahrenheit", "celsius"); // returns 37.777
		//		|	});

		return fetch(deps, function(deps) {
			callback && callback.apply(null, deps);
		}, function(ex) {
			throw ex;
		}, refModule) || req;
	}

	req.toUrl = toUrl;
	req.config = cfg;
	mix(req, fnMixin = {
		each: each,
		evaluate: evaluate,
		has: has,
		is: is,
		isDef: isDef,
		mix: mix,
		on: on
	});

	req.cache = function(subject) {
		// summary:
		//		Copies module definitions into the definition cache.
		//
		// description:
		//		When running a build, the build will call this function and pass in an
		//		object with module id => function. Each function contains the contents
		//		of the module's file.
		//
		//		When a module is required, the loader will first see if the module has
		//		already been defined.  If not, it will then check this cache and execute
		//		the module definition.  Modules not defined or cached will be fetched
		//		remotely.
		//
		// subject: String | Object
		//		When a string, returns the cached object or undefined otherwise an object
		//		with module id => function where each function wraps a module.
		//
		// example:
		//		This shows what build system would generate. You should not need to do this.
		//		|	require.cache({
		//		|		"arithmetic": function() {
		//		|			define(["dep1", "dep2"], function(dep1, dep2) {
		//		|				var api = { sq: function(x) { return x * x; } };
		//		|			});
		//		|		},
		//		|		"my/favorite": function() {
		//		|			define({
		//		|				color: "red",
		//		|				food: "pizza"
		//		|			});
		//		|		}
		//		|	});
		var p, m, re = /^url\:(.+)/;
		if (is(subject, "String")) {
			return defCache[subject];
		} else {
			for (p in subject) {
				m = p.match(re);
				if (m) {
					defCache[toUrl(m[1])] = subject[p];
				} else {
					m = getResourceDef(p, 0, 0, subject[p], 1);
					defCache[m.name] = m.rawDef;
				}
			}
		}
	};

	// expose require() and define() to the global namespace
	global.require = req;
	global.define = def;

}(window));

require.cache({
	"Ti/_": function() {
		define({
			getAbsolutePath: function(path) {
				/^app\:\/\//.test(path) && (path = path.substring(6));
				/^\//.test(path) && (path = path.substring(1));
				return /^\/\//.test(path) || path.indexOf("://") > 0 ? path : location.pathname.replace(/(.*)\/.*/, "$1") + "/" + path;
			},
			uuid: function() {
				/**
				 * Math.uuid.js (v1.4)
				 * Copyright (c) 2010 Robert Kieffer
				 * Dual licensed under the MIT and GPL licenses.
				 * <http://www.broofa.com>
				 * mailto:robert@broofa.com
				 */
				// RFC4122v4 solution:
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				}).toUpperCase();
			}
		});
	},
	"Ti/_/browser": function() {
		define(function() {
			var match = navigator.userAgent.toLowerCase().match(/(webkit|gecko|trident|presto)/);
			return {
				runtime: match ? match[0] : "unknown"
			};
		});
	},
	"Ti/_/css": function() {
		define(["Ti/_/string"], function(string) {
			function processClass(node, cls, adding) {
				var i = 0, p,
					cn = " " + node.className + " ",
					cls = require.is(cls, "Array") ? cls : cls.split(" ");

				for (; i < cls.length; i++) {
					p = cn.indexOf(" " + cls[i] + " ");
					if (adding && p === -1) {
						cn += cls[i] + " ";
					} else if (!adding && p !== -1) {
						cn = cn.substring(0, p) + cn.substring(p + cls[i].length + 1);
					}
				}

				node.className = string.trim(cn);
			}

			return {
				add: function(node, cls) {
					processClass(node, cls, 1);
				},

				remove: function(node, cls) {
					processClass(node, cls);
				},

				clean: function(cls) {
					return cls.replace(/[^A-Za-z0-9\-]/g, "");
				}
			};
		});
	},
	"Ti/_/declare": function() {
		define(["Ti/_/lang"], function(lang) {
			/**
			 * declare() functionality based on code from Dojo Toolkit.
			 *
			 * Dojo Toolkit
			 * Copyright (c) 2005-2011, The Dojo Foundation
			 * New BSD License
			 * <http://dojotoolkit.org>
			 */

			var is = require.is;

			// C3 Method Resolution Order (see http://www.python.org/download/releases/2.3/mro/)
			function c3mro(bases, className) {
				var result = [],
					roots = [ {cls: 0, refs: []} ],
					nameMap = {},
					clsCount = 1,
					l = bases.length,
					i = 0,
					j, lin, base, top, proto, rec, name, refs;

				// build a list of bases naming them if needed
				for (; i < l; ++i) {
					base = bases[i];
					if (!base) {
						throw new Error('Unknown base class for "' + className + '" [' + i + ']');
					} else if(!is(base, "Function")) {
						throw new Error('Base class not a function for "' + className + '" [' + i + ']');
					}
					lin = base._meta ? base._meta.bases : [base];
					top = 0;
					// add bases to the name map
					for (j = lin.length - 1; j >= 0; --j) {
						proto = lin[j].prototype;
						proto.hasOwnProperty("declaredClass") || (proto.declaredClass = "uniqName_" + (counter++));
						name = proto.declaredClass;
						if (!nameMap.hasOwnProperty(name)) {
							nameMap[name] = {count: 0, refs: [], cls: lin[j]};
							++clsCount;
						}
						rec = nameMap[name];
						if (top && top !== rec) {
							rec.refs.push(top);
							++top.count;
						}
						top = rec;
					}
					++top.count;
					roots[0].refs.push(top);
				}

				// remove classes without external references recursively
				while (roots.length) {
					top = roots.pop();
					result.push(top.cls);
					--clsCount;
					// optimization: follow a single-linked chain
					while (refs = top.refs, refs.length == 1) {
						top = refs[0];
						if (!top || --top.count) {
							// branch or end of chain => do not end to roots
							top = 0;
							break;
						}
						result.push(top.cls);
						--clsCount;
					}
					if (top) {
						// branch
						for (i = 0, l = refs.length; i < l; ++i) {
							top = refs[i];
							--top.count || roots.push(top);
						}
					}
				}

				if (clsCount) {
					throw new Error('Can\'t build consistent linearization for ' + className + '"');
				}

				// calculate the superclass offset
				base = bases[0];
				result[0] = base ?
					base._meta && base === result[result.length - base._meta.bases.length] ?
						base._meta.bases.length : 1 : 0;

				return result;
			}

			function makeConstructor(bases, ctorSpecial) {
				return function(){
					var a = arguments,
						args = a,
						a0 = a[0],
						f, i, m, p,
						l = bases.length,
						preArgs;

					// 1) call two types of the preamble
					if (ctorSpecial && (a0 && a0.preamble || this.preamble)) {
						// full blown ritual
						preArgs = new Array(bases.length);
						// prepare parameters
						preArgs[0] = a;
						for (i = 0;;) {
							// process the preamble of the 1st argument
							(a0 = a[0]) && (f = a0.preamble) && (a = f.apply(this, a) || a);
							// process the preamble of this class
							f = bases[i].prototype;
							f = f.hasOwnProperty("preamble") && f.preamble;
							f && (a = f.apply(this, a) || a);
							if (++i === l) {
								break;
							}
							preArgs[i] = a;
						}
					}

					// 2) call all non-trivial constructors using prepared arguments
					for (i = l - 1; i >= 0; --i) {
						f = bases[i];
						m = f._meta;
						if (m) {
							f = m.ctor;
							lang.mixProps(this, m.hidden);
						}
						is(f, "Function") && f.apply(this, preArgs ? preArgs[i] : a);
					}

					// 3) mixin args if any
					if (is(a0, "Object")) {
						for (p in a0) {
							a0.hasOwnProperty(p) && (this[p] = a0[p]);
						}
					}

					// 4) continue the original ritual: call the postscript
					f = this.postscript;
					f && f.apply(this, args);
				};
			}

			function mixClass(dest, src) {
				for (var p in src) {
					if (src.hasOwnProperty(p) && !/^(constructor|properties|constants|__values__)$/.test(p)) {
						is(src[p], "Function") && (src[p].nom = name);
						dest[p] = src[p];
					}
				}
				return dest;
			}

			function declare(className, superclass, definition) {
				// summary:
				//		Creates an instantiable class object.
				//
				// className: String?
				//		Optional. The name of the class.
				//
				// superclass: null | Object | Array
				//		The base class or classes to extend.
				//
				// definition: Object
				//		The definition of the class.

				if (!is(className, "String")) {
					definition = superclass;
					superclass = className;
					className = "";
				}
				definition = definition || {};

				var bases = [definition.constructor],
					ctor,
					i,
					mix = require.mix,
					mixins = 1,
					proto = {},
					superclassType = is(superclass),
					t;

				// build the array of bases
				if (superclassType === "Array") {
					bases = c3mro(superclass, className);
					superclass = bases[mixins = bases.length - bases[0]];
				} else if (superclassType === "Function") {
					t = superclass._meta;
					bases = bases.concat(t ? t.bases : superclass);
				} else if (superclassType === "Object") {
					ctor = new Function;
					mix(ctor.prototype, superclass);
					bases[0] = superclass = ctor;
				} else {
					superclass = 0;
				}

				// build the prototype chain
				if (superclass) {
					for (i = mixins - 1;; --i) {
						ctor = new Function;
						ctor.prototype = superclass.prototype;
						proto = new ctor;

						// stop if nothing to add (the last base)
						if (!i) {
							break;
						}

						// mix in properties
						t = bases[i];
						(t._meta ? mixClass : mix)(proto, t.prototype);

						// chain in new constructor
						ctor = new Function;
						ctor.superclass = superclass;
						ctor.prototype = proto;
						superclass = proto.constructor = ctor;
					}
				}

				// add all properties except constructor, properties, and constants
				mixClass(proto, definition);

				// if the definition is not an object, then we want to use its constructor
				t = definition.constructor;
				if (t !== Object.prototype.constructor) {
					t.nom = "constructor";
					proto.constructor = t;
				}

				// build the constructor and add meta information to the constructor
				mix(bases[0] = ctor = makeConstructor(bases, t), {
					_meta: {
						bases: bases,
						hidden: definition,
						ctor: definition.constructor
					},
					superclass: superclass && superclass.prototype,
					extend: function(src) {
						mixClass(this.prototype, src);
						return this;
					},
					prototype: proto
				});

				// now mix in just the properties and constants
				//lang.mixProps(proto, definition);

				// add "standard" methods to the prototype
				mix(proto, {
					constructor: ctor,
					// TODO: need a nice way of accessing the super method without using arguments.callee
					// getInherited: function(name, args) {
					//	return is(name, "String") ? this.inherited(name, args, true) : this.inherited(name, true);
					// },
					// inherited: inherited,
					isInstanceOf: function(cls) {
						var bases = this.constructor._meta.bases,
							i = 0,
							l = bases.length;
						for (; i < l; ++i) {
							if (bases[i] === cls) {
								return true;
							}
						}
						return this instanceof cls;
					}
				});

				// add name if specified
				if (className) {
					proto.declaredClass = className;
					lang.setObject(className, ctor);
				}

				return ctor;
			}

			return declare;
		});
	},
	"Ti/_/dom": function() {
		define(["Ti/_/style"], function(style) {
			/**
			 * create(), attr(), place(), & remove() functionality based on code from Dojo Toolkit.
			 *
			 * Dojo Toolkit
			 * Copyright (c) 2005-2011, The Dojo Foundation
			 * New BSD License
			 * <http://dojotoolkit.org>
			 */

			var is = require.is,
				forcePropNames = {
					innerHTML:	1,
					className:	1,
					value:		1
				},
				attrNames = {
					// original attribute names
					classname: "class",
					htmlfor: "for",
					// for IE
					tabindex: "tabIndex",
					readonly: "readOnly"
				},
				names = {
					// properties renamed to avoid clashes with reserved words
					"class": "className",
					"for": "htmlFor",
					// properties written as camelCase
					tabindex: "tabIndex",
					readonly: "readOnly",
					colspan: "colSpan",
					frameborder: "frameBorder",
					rowspan: "rowSpan",
					valuetype: "valueType"
				};

			return {
				create: function(tag, attrs, refNode, pos) {
					var doc = refNode ? refNode.ownerDocument : document;
					is(tag, "String") && (tag = doc.createElement(tag));
					attrs && this.attr(tag, attrs);
					refNode && this.place(tag, refNode, pos);
					return tag;
				},

				attr: function(node, name, value) {
					if (arguments.length === 2) {
						// the object form of setter: the 2nd argument is a dictionary
						for (var x in name) {
							this.attr(node, x, name[x]);
						}
						return node;
					}

					var lc = name.toLowerCase(),
						propName = names[lc] || name,
						forceProp = forcePropNames[propName],
						attrId, h;

					if (propName === "style" && !require.is(value, "String")) {
						return style.set(node, value);
					}

					if (forceProp || is(value, "Boolean") || is(value, "Function")) {
						node[name] = value;
						return node;
					}

					// node's attribute
					node.setAttribute(attrNames[lc] || name, value);
					return node;
				},

				place: function(node, refNode, pos) {
					refNode.appendChild(node);
					return node;
				},

				destroy: function(node) {
					try {
						var destroyContainer = node.ownerDocument.createElement("div");
						destroyContainer.appendChild(node.parentNode ? node.parentNode.removeChild(node) : node);
						destroyContainer.innerHTML = "";
					} catch(e) {
						/* squelch */
					}
				},

				unitize: function(x) {
					return isNaN(x-0) || x-0 != x ? x : x + "px"; // note: must be != and not !==
				},
				computeSize: function(x,totalLength) {
					if (!require.is(x,"Number") && !require.is(x,"String")) {
						return;
					}
					if (x == "auto") {
						return x;
					} else if(require.is(x,"Number")) {
						return x;
					} else {
						var value = parseFloat(x),
							units = x.substring((value + "").length),
							dpi = Ti.Platform.DisplayCaps.dpi,
							undef;
						
						function processMM(x) {
							// Convert mm to in for this calculation
							return x * 0.03937007874015748 * dpi;
						}
						
						function processIN(x) {
							return x * dpi;
						}
						
						switch(units) {
							case "%": return require.isDef(totalLength) ? value / 100 * totalLength : x;
							case "mm": return processMM(value);
							case "cm": return processMM(value * 10);
							case "in": return processIN(value);
							case "pt": return processIN(value / 72);
							case "pc": return processIN(value / 864);
							case "px": return value;
						}
					}
				}
			};
		});
	},
	"Ti/_/include": function() {
		define(function() {
			var cache = {},
				stack = [];

			return {
				dynamic: true, // prevent the loader from caching the result

				normalize: function(name, normalize) {
					var parts = name.split("!"),
						url = parts[0];
					parts.shift();
					return (/^\./.test(url) ? normalize(url) : url) + (parts.length ? "!" + parts.join("!") : "");
				},

				load: function(name, require, onLoad, config) {
					var c,
						x,
						parts = name.split("!"),
						len = parts.length,
						url,
						sandbox;

					if (sandbox = len > 1 && parts[0] === "sandbox") {
						parts.shift();
						name = parts.join("!");
					}

					url = require.toUrl(/^\//.test(name) ? name : "./" + name, stack.length ? { name: stack[stack.length-1] } : null);
					c = cache[url] || require.cache(url);

					if (!c) {
						x = new XMLHttpRequest();
						x.open("GET", url, false);
						x.send(null);
						if (x.status === 200) {
							c = x.responseText;
						} else {
							throw new Error("Failed to load include \"" + url + "\": " + x.status);
						}
					}

					stack.push(url);
					try {
						require.evaluate(cache[url] = c, 0, !sandbox);
					} catch (e) {
						throw e;
					} finally {
						stack.pop();
					}

					onLoad(c);
				}
			};
		});
	},
	"Ti/_/lang": function() {
		define(["Ti/_/string"], function(string) {
			/**
			 * hitch() and setObject() functionality based on code from Dojo Toolkit.
			 *
			 * Dojo Toolkit
			 * Copyright (c) 2005-2011, The Dojo Foundation
			 * New BSD License
			 * <http://dojotoolkit.org>
			 */

			var global = this,
				is = require.is;

			function toArray(obj, offset) {
				return [].concat(Array.prototype.slice.call(obj, offset||0));
			}

			function hitchArgs(scope, method) {
				var pre = toArray(arguments, 2);
					named = require.is(method, "String");
				return function() {
					var s = scope || global,
						f = named ? s[method] : method;
					return f && f.apply(s, pre.concat(toArray(arguments)));
				};
			}

			return {
				hitch: function(scope, method) {
					if (arguments.length > 2) {
						return hitchArgs.apply(global, arguments);
					}
					if (!method) {
						method = scope;
						scope = null;
					}
					if (require.is(method, "String")) {
						scope = scope || global;
						if (!scope[method]) {
							throw(['hitch: scope["', method, '"] is null (scope="', scope, '")'].join(''));
						}
						return function() {
							return scope[method].apply(scope, arguments || []);
						};
					}
					return !scope ? method : function() {
						return method.apply(scope, arguments || []);
					};
				},

				mixProps: function(dest, src, everything) {
					var d, i, p, v, special = { properties: 1, constants: 0 };
					for (p in src) {
						if (src.hasOwnProperty(p) && !/^(constructor|__values__)$/.test(p)) {
							if (p in special) {
								d = dest[p] || (dest[p] = {});
								d.__values__ || (d.__values__ = {});
								for (i in src[p]) {
									(function(property, externalDest, internalDest, valueDest, /* setter/getter, getter, or value */ descriptor, capitalizedName, writable) {
										var getter,
											setter;

										if (is(descriptor, "Object") && ((getter = is(descriptor.get, "Function")) || (setter = is(descriptor.set, "Function")))) {
											getter && (getter = descriptor.get);
											setter && (setter = descriptor.set);
											valueDest[property] = descriptor.value;
										} else if (is(descriptor, "Function")) {
											getter = descriptor;
										} else {
											valueDest[property] = descriptor;
										}

										// first set the internal private interface
										Object.defineProperty(internalDest, property, {
											get: function() {
												return getter ? getter.call(externalDest, valueDest[property]) : valueDest[property];
											},
											set: function(v) {
												valueDest[property] = setter ? setter.call(externalDest, v, valueDest[property]) : v;
											},
											configurable: true,
											enumerable: true
										});

										// this is the public interface
										Object.defineProperty(dest, property, {
											get: function() {
												return internalDest[property];
											},
											set: function(v) {
												if (!writable) {
													throw new Error('Property "' + property + '" is read only');
												}
												internalDest[property] = v;
											},
											configurable: true,
											enumerable: true
										});

										if (require.has("declare-property-methods") && (writable || property.toUpperCase() !== property)) {
											externalDest["get" + capitalizedName] = function() { return internalDest[property]; };
											writable && (externalDest["set" + capitalizedName] = function(v) { return internalDest[property] = v; });
										}
									}(i, dest, d, d.__values__, src[p][i], string.capitalize(i), special[p]));
								}
							} else if (everything) {
								dest[p] = src[p];
							}
						}
					}
					return dest;
				},

				setObject: function(name) {
					var parts = name.split("."),
						q = parts.pop(),
						obj = window,
						i = 0,
						p = parts[i++],
						value = {};

					if (p) {
						do {
							obj = p in obj ? obj[p] : (obj[p] = {});
						} while (obj && (p = parts[i++]));
					}

					if (!obj || !q) {
						return undefined;
					}

					// need to mix args into values
					for (i = 1; i < arguments.length; i++) {
						is(arguments[i], "Object") ? this.mixProps(value, arguments[i], 1) : (value = arguments[i]);
					}

					return obj[q] = value;
				}
			};
		});
	},
	"Ti/_/ready": function() {
		define(function() {
			/**
			 * ready() functionality based on code from Dojo Toolkit.
			 *
			 * Dojo Toolkit
			 * Copyright (c) 2005-2011, The Dojo Foundation
			 * New BSD License
			 * <http://dojotoolkit.org>
			 */

			var doc = document,
				readyStates = { "loaded": 1, "complete": 1 },
				isReady = !!readyStates[doc.readyState],
				readyQ = [];

			if (!isReady) {
				function detectReady(evt) {
					if (isReady || (evt && evt.type == "readystatechange" && !readyStates[doc.readyState])) {
						return;
					}
					while (readyQ.length) {
						(readyQ.shift())();
					}
					isReady = 1;
				}

				readyQ.concat([
					require.on(doc, "DOMContentLoaded", detectReady),
					require.on(window, "load", detectReady)
				]);

				if ("onreadystatechange" in doc) {
					readyQ.push(require.on(doc, "readystatechange", detectReady));
				} else {
					function poller() {
						readyStates[doc.readyState] ? detectReady() : setTimeout(poller, 30);
					}
					poller();
				}
			}

			function ready(context, callback) {
				var fn = callback ? function(){ callback.call(context); } : context;
				if (isReady) {
					fn();
				} else {
					readyQ.push(fn);
				}
			}

			ready.load = function(name, require, onLoad) {
				ready(onLoad);
			};

			return ready;
		});
	},
	"Ti/_/string": function() {
		define({
			capitalize: function(s) {
				s = s || "";
				return s.substring(0, 1).toUpperCase() + s.substring(1);
			},

			trim: String.prototype.trim ?
				function(str){ return str.trim(); } :
				function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); }
		});
	},
	"Ti/_/style": function() {
		define(["Ti/_", "Ti/_/string"], function(_, string) {
			var vp = require.config.vendorPrefixes.dom;

			return {
				url: function(url) {
					return !url ? "" : /^url\(/.test(url) ? url : "url(" + _.getAbsolutePath(url) + ")";
				},

				get: function(node, name) {
					if (require.is(name, "Array")) {
						for (var i = 0; i < name.length; i++) {
							name[i] = node.style[name[i]];
						}
						return name;
					}
					return node.style[name];
				},

				set: function(node, name, value) {
					var i = 0,
						x,
						uc;
					if (arguments.length > 2) {
						while (i < vp.length) {
							x = vp[i++];
							x += x ? uc || (uc = string.capitalize(name)) : name;
							if (x in node.style) {
								return node.style[x] = value;
							}
						}
					} else {
						for (x in name) {
							this.set(node, x, name[x]);
						}
					}
					return node;
				}
			};
		});
	}
});/**
 * This file contains source code from the following:
 *
 * es5-shim
 * Copyright 2009, 2010 Kristopher Michael Kowal
 * MIT License
 * <https://github.com/kriskowal/es5-shim>
 */

(function(global){
	var cfg = require.config,
		is = require.is,
		each = require.is,
		Ti = {
			_5: {}
		},
		doc = document,
		body = doc.body,
		undef,
		ready = require("Ti/_/ready"),
		createUUID = require("Ti/_").uuid,
		sessionId,
		analyticsStorageName = "ti:analyticsEvents",
		localeData = {},
		analyticsEventSeq = 1,
		analyticsLastSent = null;

	// Object.defineProperty() shim
	if (!Object.defineProperty || !(function (obj) {
			try {
				Object.defineProperty(obj, "x", {});
				return obj.hasOwnProperty("x");
			} catch (e) { }
		}({}))) {
		// add support for Object.defineProperty() thanks to es5-shim
		Object.defineProperty = function defineProperty(obj, prop, desc) {
			if (!obj || (!is(obj, "Object") && !is(obj, "Function") && !is(obj, "Window"))) {
				throw new TypeError("Object.defineProperty called on non-object: " + obj);
			}
			desc = desc || {};
			if (!desc || (!is(desc, "Object") && !is(desc, "Function"))) {
				throw new TypeError("Property description must be an object: " + desc);
			}
	
			if (odp) {
				try {
					return odp.call(Object, obj, prop, desc);
				} catch (e) { }
			}
	
			var op = Object.prototype,
				h = function (o, p) {
					return o.hasOwnProperty(p);
				},
				a = h(op, "__defineGetter__"),
				p = obj.__proto__;
	
			if (h(desc, "value")) {
				if (a && (obj.__lookupGetter__(prop) || obj.__lookupSetter__(prop))) {
					obj.__proto__ = op;
					delete obj[prop];
					obj[prop] = desc.value;
					obj.__proto__ = p;
				} else {
					obj[prop] = desc.value;
				}
			} else {
				if (!a) {
					throw new TypeError("Getters and setters can not be defined on this javascript engine");
				}
				if (h(desc, "get")) {
					defineGetter(obj, prop, desc.get);
				}
				if (h(desc, "set")) {
					defineSetter(obj, prop, desc.set);
				} else {
					obj[prop] = null;
				}
			}
		};
	}

	Object.defineProperty(global, "Ti", { value: Ti, writable: false });
	Object.defineProperty(global, "Titanium", { value: Ti, writable: false });

	// console.*() shim	
	console === undef && (console = {});

	// make sure "log" is always at the end
	each(["debug", "info", "warn", "error", "log"], function (c) {
		console[c] || (console[c] = ("log" in console)
			?	function () {
					var a = Array.apply({}, arguments);
					a.unshift(c + ":");
					console.log(a.join(" "));
				}
			:	function () {}
		);
	});

	// JSON.parse() and JSON.stringify() shim
	if (JSON === undef || JSON.stringify({a:0}, function(k,v){return v||1;}) !== '{"a":1}') {
		function escapeString(s){
			return ('"' + s.replace(/(["\\])/g, '\\$1') + '"').
				replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").
				replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
		}
	
		JSON.parse = function (s) {
			return eval('(' + s + ')');
		};
	
		JSON.stringify = function (value, replacer, space) {
			if (is(replacer, "String")) {
				space = replacer;
				replacer = null;
			}
	
			function stringify(it, indent, key) {
				var val,
					len,
					objtype = typeof it,
					nextIndent = space ? (indent + space) : "",
					sep = space ? " " : "",
					newLine = space ? "\n" : "",
					ar = [];
	
				if (replacer) {
					it = replacer(key, it);
				}
				if (objtype === "number") {
					return isFinite(it) ? it + "" : "null";
				}
				if (is(objtype, "Boolean")) {
					return it + "";
				}
				if (it === null) {
					return "null";
				}
				if (is(it, "String")) {
					return escapeString(it);
				}
				if (objtype === "function" || objtype === "undefined") {
					return undef;
				}
	
				// short-circuit for objects that support "json" serialization
				// if they return "self" then just pass-through...
				if (is(it.toJSON, "Function")) {
					return stringify(it.toJSON(key), indent, key);
				}
				if (it instanceof Date) {
					return '"{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z"'.replace(/\{(\w+)(\+)?\}/g, function(t, prop, plus){
						var num = it["getUTC" + prop]() + (plus ? 1 : 0);
						return num < 10 ? "0" + num : num;
					});
				}
				if (it.valueOf() !== it) {
					return stringify(it.valueOf(), indent, key);
				}
	
				// array code path
				if (it instanceof Array) {
					for(key = 0, len = it.length; key < len; key++){
						var obj = it[key];
						val = stringify(obj, nextIndent, key);
						if (!is(val, "String")) {
							val = "null";
						}
						ar.push(newLine + nextIndent + val);
					}
					return "[" + ar.join(",") + newLine + indent + "]";
				}
	
				// generic object code path
				for (key in it) {
					var keyStr;
					if (is(key, "Number")) {
						keyStr = '"' + key + '"';
					} else if (is(key, "String")) {
						keyStr = escapeString(key);
					} else {
						continue;
					}
					val = stringify(it[key], nextIndent, key);
					if (!is(val, "String")) {
						// skip non-serializable values
						continue;
					}
					// At this point, the most non-IE browsers don't get in this branch 
					// (they have native JSON), so push is definitely the way to
					ar.push(newLine + nextIndent + keyStr + ":" + sep + val);
				}
				return "{" + ar.join(",") + newLine + indent + "}"; // String
			}
	
			return stringify(value, "", "");
		};
	}

	// print the Titanium version *after* the console shim
	console.info("[INFO] Appcelerator Titanium " + cfg.ti.version + " Mobile Web");

	// make sure we have some vendor prefixes defined
	cfg.vendorPrefixes || (cfg.vendorPrefixes = ["", "Moz", "Webkit", "O", "ms"]);

	// expose JSON functions to Ti namespace
	Ti.parse = JSON.parse;
	Ti.stringify = JSON.stringify;

	require.on(global, "beforeunload", function() {
		Ti.App.fireEvent("close");
		Ti._5.addAnalyticsEvent("ti.end", "ti.end");
	});

	Ti._5.prop = function(obj, property, value, descriptor) {
		if (require.is(property, "Object")) {
			for (var i in property) {
				Ti._5.prop(obj, i, property[i]);
			}
		} else {
			var skipSet,
				capitalizedName = require("Ti/_/string").capitalize(property);

			// if we only have 3 args, so need to check if it's a default value or a descriptor
			if (arguments.length === 3 && require.is(value, "Object") && (value.get || value.set)) {
				descriptor = value;
				// we don't have a default value, so skip the set
				skipSet = 1;
			}

			// if we have a descriptor, then defineProperty
			if (descriptor) {
				if ("value" in descriptor) {
					skipSet = 2;
					if (descriptor.get || descriptor.set) {
						// we have a value, but since there's a custom setter/getter, we can't have a value
						value = descriptor.value;
						delete descriptor.value;
						value !== undef && (skipSet = 0);
					} else {
						descriptor.writable = true;
					}
				}
				descriptor.configurable = true;
				descriptor.enumerable = true;
				Object.defineProperty(obj, property, descriptor);
			}

			// create the get/set functions
			obj["get" + capitalizedName] = function(){ return obj[property]; };
			(skipSet | 0) < 2 && (obj["set" + capitalizedName] = function(val){ return obj[property] = val; });

			// if there's no default value or it's already been set with defineProperty(), then we skip setting it
			skipSet || (obj[property] = value);
		}
	};

	Ti._5.propReadOnly = function(obj, property, value) {
		var i;
		if (require.is(property, "Object")) {
			for (i in property) {
				Ti._5.propReadOnly(obj, i, property[i]);
			}
		} else {
			Ti._5.prop(obj, property, undef, require.is(value, "Function") ? { get: value, value: undef } : { value: value });
		}
	};

	Ti._5.createClass = function(className, value){
		var i,
			classes = className.split("."),
			klass,
			parent = global;
		for (i = 0; i < classes.length; i++) {
			klass = classes[i];
			parent[klass] === undef && (parent[klass] = i == classes.length - 1 && value !== undef ? value : new Object());
			parent = parent[klass];
		}
		return parent;
	};

	sessionId = "sessionStorage" in global && sessionStorage.getItem("mobileweb_sessionId");
	sessionId || sessionStorage.setItem("mobileweb_sessionId", sessionId = createUUID());

	Ti._5.addAnalyticsEvent = function(eventType, eventEvent, data, isUrgent){
		if (!cfg.analytics) {
			return;
		}
		// store event
		var storage = localStorage.getItem(analyticsStorageName);
		if(storage == null){
			storage = [];
		} else {
			storage = JSON.parse(storage);
		}
		var now = new Date();
		var ts = "yyyy-MM-dd'T'HH:mm:ss.SSSZ".replace(/\w+/g, function(str){
			switch(str){
				case "yyyy":
					return now.getFullYear();
				case "MM":
					return now.getMonth() + 1;
				case "dd":
					return now.getDate();
				case "HH":
					return now.getHours();
				case "mm":
					return now.getMinutes();
				case "ss":
					return now.getSeconds();
				case "SSSZ":
					var tz = now.getTimezoneOffset();
					var atz = Math.abs(tz);
					tz = (tz < 0 ? "-" : "+") + (atz < 100 ? "00" : (atz < 1000 ? "0" : "")) + atz;
					return now.getMilliseconds() + tz;
				default:
					return str;
			}
		});
		var formatZeros = function(v, n){
			var d = (v+'').length;
			return (d < n ? (new Array(++n - d)).join("0") : "") + v;
		};

		storage.push({
			eventId: createUUID(),
			eventType: eventType,
			eventEvent: eventEvent,
			eventTimestamp: ts,
			eventPayload: data
		});
		localStorage.setItem(analyticsStorageName, JSON.stringify(storage));
		Ti._5.sendAnalytics(isUrgent);
	};

	// collect and send Ti.Analytics notifications
	Ti._5.sendAnalytics = function(isUrgent){
		if (!cfg.analytics) {
			return;
		}

		var i,
			evt,
			storage = JSON.parse(localStorage.getItem(analyticsStorageName)),
			now = (new Date()).getTime(),
			jsonStrs = [],
			ids = [],
			iframe,
			form,
			hidden,
			rand = Math.floor(Math.random() * 1e6),
			iframeName = "analytics" + rand,
			callback = "mobileweb_jsonp" + rand;

		if (storage === null || (!isUrgent && analyticsLastSent !== null && now - analyticsLastSent < 300000 /* 5 minutes */)) {
			return;
		}

		analyticsLastSent = now;

		for (i = 0; i < storage.length; i++) {
			evt = storage[i];
			ids.push(evt.eventId);
			jsonStrs.push(JSON.stringify({
				seq: analyticsEventSeq++,
				ver: "2",
				id: evt.eventId,
				type: evt.eventType,
				event: evt.eventEvent,
				ts: evt.eventTimestamp,
				mid: Ti.Platform.id,
				sid: sessionId,
				aguid: cfg.guid,
				data: require.is(evt.eventPayload, "object") ? JSON.stringify(evt.eventPayload) : evt.eventPayload
			}));
		}

		function onIframeLoaded() {
			form.parentNode.removeChild(form);
			iframe.parentNode.removeChild(iframe);
		}

		iframe = doc.createElement("iframe");
		iframe.style.display = "none";
		iframe.id = iframe.name = iframeName;

		form = doc.createElement("form");
		form.style.display = "none";
		form.target = iframeName;
		form.method = "POST";
		form.action = "https://api.appcelerator.net/p/v2/mobile-track?callback=" + callback;

		hidden = doc.createElement("input");
		hidden.type = "hidden";
		hidden.name = "content";
		hidden.value = "[" + jsonStrs.join(",") + "]";

		body.appendChild(iframe);
		body.appendChild(form);
		form.appendChild(hidden);

		global[callback] = function(response){
			if(response && response.success){
				// remove sent events on successful sent
				var j, k, found,
					storage = localStorage.getItem(analyticsStorageName),
					ev,
					evs = [];

				for (j = 0; j < storage.length; j++) {
					ev = storage[j];
					found = 0;
					for (k = 0; k < ids.length; k++) {
						if (ev.eventId == ids[k]) {
							found = 1;
							ids.splice(k, 1);
							break;
						}
					}
					found || evs.push(ev);
				}

				localStorage.setItem(analyticsStorageName, JSON.stringify(evs));
				
			}
		};

		// need to delay attaching of iframe events so they aren't prematurely called
		setTimeout(function() {
			iframe.onload = onIframeLoaded;
			iframe.onerror = onIframeLoaded;
			form.submit();
		}, 25);
	};

	Ti._5.extend = function(dest, source){
		for (var key in source) {
			dest[key] = source[key];
		}
		return dest;
	};

	Ti._5.setLocaleData = function(obj){
		localeData = obj;
	};

	Ti._5.getLocaleData = function(){
		return localeData;
	};

	// Get browser window sizes
	Ti._5.getWindowSizes = function() {
		var n,
			docElem = doc.documentElement;
		if (body.offsetWidth) {
			n = {
				width: body.offsetWidth|0,
				height: body.offsetHeight|0
			};
		} else if (doc.compatMode === "CSS1Compat" && docElem && docElem.offsetWidth) {
			n = {
				width: docElem.offsetWidth,
				height: docElem.offsetHeight
			};
		} else if (global.innerWidth && global.innerHeight) {
			n = {
				width: global.innerWidth,
				height: global.innerHeight
			};
		}
		return n;
	};

	ready(function() {
		body.style.margin = 0;
		body.style.padding = 0;
		global.scrollTo(0, 1);

		if (cfg.analytics) {
			// enroll event
			if (localStorage.getItem("mobileweb_enrollSent") === null) {
				// setup enroll event
				Ti._5.addAnalyticsEvent('ti.enroll', 'ti.enroll', {
					mac_addr: null,
					oscpu: null,
					app_name: cfg.appName,
					platform: Ti.Platform.name,
					app_id: cfg.appId,
					ostype: Ti.Platform.osname,
					osarch: Ti.Platform.architecture,
					model: Ti.Platform.model,
					deploytype: cfg.deployType
				});
				localStorage.setItem("mobileweb_enrollSent", true)
			}

			// app start event
			Ti._5.addAnalyticsEvent('ti.start', 'ti.start', {
				tz: (new Date()).getTimezoneOffset(),
				deploytype: cfg.deployType,
				os: Ti.Platform.osname,
				osver: Ti.Platform.ostype,
				version: cfg.tiVersion,
				un: null,
				app_version: cfg.appVersion,
				nettype: null
			});

			// try to sent previously sent analytics events on app load
			Ti._5.sendAnalytics();
		}

		// load app.js when ti and dom is ready
		ready(function() {
			require(["app.js"]);
		});
	});

}(window));
Ti._5.EventDriven = function(obj) {
	var listeners = null;

	obj.addEventListener = function(eventName, handler){
		listeners || (listeners = {});
		(listeners[eventName] = listeners[eventName] || []).push(handler);
	};

	obj.removeEventListener = function(eventName, handler){
		if (listeners) {
			if (handler) {
				var i = 0,
					events = listeners[eventName],
					l = events && events.length || 0;

				for (; i < l; i++) {
					events[i] === handler && events.splice(i, 1);
				}
			} else {
				delete listeners[eventName];
			}
		}
	};

	obj.hasListener = function(eventName) {
		return listeners && listeners[eventName];
	};

	obj.fireEvent = function(eventName, eventData){
		if (listeners) {
			var i = 0,
				events = listeners[eventName],
				l = events && events.length,
				data = require.mix({
					source: obj,
					type: eventName
				}, eventData);

			while (i < l) {
				events[i++].call(obj, data);
			}
		}
	};
};
;
define("Ti/_/Evented", function() {

	return {
		listeners: null,

		addEventListener: function(name, handler) {
			this.listeners || (this.listeners = {});
			(this.listeners[name] = this.listeners[name] || []).push(handler)
		},

		removeEventListener: function(name, handler) {
			if (this.listeners) {
				if (handler) {
					var i = 0,
						events = this.listeners[name],
						l = events && events.length || 0;
	
					for (; i < l; i++) {
						events[i] === handler && events.splice(i, 1);
					}
				} else {
					delete this.listeners[name];
				}
			}
		},

		fireEvent: function(name, eventData) {
			var i = 0,
				events = this.listeners && this.listeners[name],
				l = events && events.length,
				data = require.mix({
					source: this,
					type: name
				}, eventData);

			while (i < l) {
				events[i++].call(this, data);
			}
		}
	};

});;
define("Ti/_/UI/Element",
	["Ti/_/browser", "Ti/_/css", "Ti/_/declare", "Ti/_/dom", "Ti/_/lang", "Ti/_/style", "Ti/_/Evented"],
	function(browser, css, declare, dom, lang, style, Evented) {

	var undef,
		unitize = dom.unitize,
		on = require.on,
		transitionEvents = {
			webkit: "webkitTransitionEnd",
			trident: "msTransitionEnd",
			gecko: "transitionend",
			presto: "oTransitionEnd"
		},
		transitionEnd = transitionEvents[browser.runtime] || "transitionEnd",
		curTransform;

	return declare("Ti._.UI.Element", Evented, {

		domType: null,
		domNode: null,
		parent: null,

		constructor: function() {
			var bgSelPrevColor,
				bgSelPrevImage,
				bgFocusPrevColor;

			this.domNode = dom.create(this.domType || "div", {
				className: "TiUIElement " + css.clean(this.declaredClass)
			});

			// TODO: mixin JSS rules (http://jira.appcelerator.org/browse/TIMOB-6780)

			on(this.domNode, "click", lang.hitch(this, function(evt) {
				this.fireEvent("click", {
					x: evt.pageX,
					y: evt.pageY
				});
			}));

			on(this.domNode, "dblclick", lang.hitch(this, function(evt) {
				this.fireEvent('dblclick', {
					x: evt.pageX,
					y: evt.pageY
				});
			}));

			on(this.domNode, "focus", lang.hitch(this, function() {
				var tmp, node = this.domNode;

				this._origBg = style.get(node, ["backgroundColor", "backgroundImage"]);

				(tmp = this.backgroundSelectedColor) && style.set(node, "backgroundColor", tmp);
				(tmp = this.backgroundSelectedImage) && style.set(node, "backgroundImage", style.url(tmp));

				if (this.focusable) {
					(tmp = this.backgroundFocusedColor) && style.set(node, "backgroundColor", tmp);
					(tmp = this.backgroundFocusedImage) && style.set(node, "backgroundImage", style.url(tmp));
				}
			}));

			on(this.domNode, "blur", lang.hitch(this, function() {
				var bg = (this._origBg || []).concat([0, 0]);

				this.focusable && this.backgroundSelectedColor && (bg[0] = this.backgroundSelectedColor);
				bg[0] && style.set(this.domNode, "backgroundColor", bg[0]);

				this.focusable && this.backgroundSelectedImage && (bg[1] = this.backgroundSelectedImage);
				bg[1] && style.set(this.domNode, "backgroundImage", style.url(bg[1]));
			}));
		},

		destroy: function() {
			dom.destroy(this.domNode);
			this.domNode = null;
		},
		
		doLayout: function() {
			this._layout && this._layout.doLayout(this);
		},
		
		doFullLayout: function() {
			var node = this;
			while(node.parent) {
				node = node.parent
			}
			node.doLayout();
		},

		show: function() {
			this.visible = true;
			//this.fireEvent("ti:shown");
		},

		hide: function() {
			this.visible = false;
			//obj.fireEvent("ti:hidden");
		},

		animate: function(anim, callback) {
			var curve = "ease",
				fn = lang.hitch(this, function() {
					var transform = "";

					// Set the color and opacity properties
					anim.backgroundColor !== undef && (obj.backgroundColor = anim.backgroundColor);
					anim.opacity !== undef && style.set(this.domNode, "opacity", anim.opacity);
					style.set(this.domNode, "display", anim.visible !== undef && !anim.visible ? "none" : "");

					// Set the position and size properties
					require.each(["top", "bottom", "left", "right", "height", "width"], lang.hitch(this, function(p) {
						anim[p] !== undef && style.set(this.domNode, p, unitize(anim[p]));
					}));

					// Set the z-order
					anim.zIndex !== undef && style.set(this.domNode, "zIndex", anim.zIndex);

					// Set the transform properties
					if (anim.transform) {
						curTransform = curTransform ? curTransform.multiply(anim.transform) : anim.transform;
						transform = curTransform.toCSS();
					}

					style.set(this.domNode, "transform", transform);
				});

			switch (anim.curve) {
				case Ti.UI.ANIMATION_CURVE_LINEAR: curve = "linear"; break;
				case Ti.UI.ANIMATION_CURVE_EASE_IN: curve = "ease-in"; break;
				case Ti.UI.ANIMATION_CURVE_EASE_OUT: curve = "ease-out"; break
				case Ti.UI.ANIMATION_CURVE_EASE_IN_OUT: curve = "ease-in-out";
			}

			anim.duration = anim.duration || 0;
			anim.delay = anim.delay || 0;

			// Determine which coordinates are valid and combine with previous coordinates where appropriate.
			if (anim.center) {
				anim.left = anim.center.x - this.domNode.offsetWidth / 2;
				anim.top = anim.center.y - this.domNode.offsetHeight / 2;
			}

			anim.transform && style.set("transform", "");

			if (anim.duration > 0) {
				// Create the transition, must be set before setting the other properties
				style.set(this.domNode, "transition", "all " + anim.duration + "ms " + curve + (anim.delay ? " " + anim.delay + "ms" : ""));
				callback && on.once(window, transitionEnd, lang.hitch(this, function(e) {
					// Clear the transform so future modifications in these areas are not animated
					style.set(this.domNode, "transition", "");
					callback();
				}));
				setTimeout(fn, 0);
			} else {
				fn();
				callback && callback();
			}
		},

		properties: {
			
			// Properties that are handled by the element
			backgroundColor: {
				set: function(value) {
					return style.set(this.domNode, "backgroundColor", value);
				}
			},
			backgroundFocusedColor: undef,
			backgroundFocusedImage: undef,
			backgroundGradient: {
				set: function(value) {
					var value = value || {},
						output = [],
						colors = value.colors || [],
						type = value.type,
						start = value.startPoint,
						end = value.endPoint;

					if (type === "linear") {
						start && end && start.x != end.x && start.y != end.y && output.concat([
							unitize(value.startPoint.x) + " " + unitize(value.startPoint.y),
							unitize(value.endPoint.x) + " " + unitize(value.startPoint.y)
						]);
					} else if (type === "radial") {
						start = value.startRadius;
						end = value.endRadius;
						start && end && output.push(unitize(start) + " " + unitize(end));
						output.push("ellipse closest-side");
					} else {
						style.set(this.domNode, "backgroundImage", "none");
						return;
					}

					require.each(colors, function(c) {
						output.push(c.color ? c.color + " " + (c.position * 100) + "%" : c);
					});

					output = type + "-gradient(" + output.join(",") + ")";

					require.each(vendorPrefixes.css, function(p) {
						style.set(this.domNode, "backgroundImage", p + output);
					});

					return value;
				}
			},
			backgroundImage: {
				set: function(value) {
					return style.set(this.domNode, "backgroundImage", value ? style.url(value) : "");
				}
			},
			backgroundSelectedColor: undef,
			backgroundSelectedImage: undef,
			borderColor: {
				set: function(value) {
					if (style.set(this.domNode, "borderColor", value)) {
						this.borderWidth | 0 || (this.borderWidth = 1);
						style.set(this.domNode, "borderStyle", "solid");
					} else {
						this.borderWidth = 0;
					}
					return value;
				}
			},
			borderRadius: {
				set: function(value) {
					style.set(this.domNode, "borderRadius", unitize(value));
					return value;
				}
			},
			borderWidth: {
				set: function(value) {
					style.set(this.domNode, "borderWidth", unitize(value));
					this.borderColor || style.set(this.domNode, "borderColor", "black");
					style.set(this.domNode, "borderStyle", "solid");
					return value;
				}
			},
			color: {
				set: function(value) {
					return style.set(this.domNode, "color", value);
				}
			},
			focusable: undef,
			opacity: {
				set: function(value) {
					return this.domNode.style.opacity = value;
				}
			},
			visible: {
				set: function(value, orig) {
					if (value !== orig) {
						!value && (this._lastDisplay = style.get(this.domNode, "display"));
						style.set(this.domNode, "display", !!value ? this._lastDisplay || "" : "none");
						!!value && this.doFullLayout();
					}
					return value;
				}
			},
			
			// Properties that are handled by the layout manager
			bottom: undef,
			center: undef,
			height: undef,
			left: undef,
			right: undef,
			top: undef,
			width: undef,
			zIndex: undef,
			size: {
				set: function(value) {
					console.debug('Property "Titanium._.UI.Element#.size" is not implemented yet.');
					return value;
				}
			}
		}

	});

});;
define("Ti/_/Layouts/Base", ["Ti/_/css", "Ti/_/declare", "Ti/_/style", "Ti/_/dom"], function(css, declare, style, dom) {
	
	var unitize = dom.unitize,
		computeSize = dom.computeSize,
		set = style.set,
		isDef = require.isDef,
		undef;

	return declare("Ti._.Layouts.Base", null, {

		constructor: function(element) {
			this.element = element;
			css.add(element.domNode, css.clean(this.declaredClass));
		},

		destroy: function() {
			css.remove(this.element.domNode, css.clean(this.declaredClass));
		},

		doLayout: function(element,isAbsolute) {
			if (element.children) {
				
				var elementHeight = isDef(element.height) ?  computeSize(element.height) : element.domNode.clientHeight,
					elementWidth = isDef(element.width) ?  computeSize(element.width) : element.domNode.clientWidth;
					
				if (isAbsolute) {
					var leftField = "left",
						rightField = "right",
						topField = "top",
						bottomField = "bottom";
				} else {
					var leftField = "marginLeft",
						rightField = "marginRight",
						topField = "marginTop",
						bottomField = "marginBottom";
				}
				
				for(var i = 0; i < element.children.length; i++) {
					
					var child = element.children[i];
					
					// Layout the child
					child.doLayout();
					
					var left = computeSize(child.left),
						top = computeSize(child.top),
						right = computeSize(child.right),
						bottom = computeSize(child.bottom),
						centerX = isDef(child.center) ? computeSize(child.center.X,elementWidth) : undef,
						centerY = isDef(child.center) ? computeSize(child.center.Y,elementHeight) : undef,
						width = computeSize(child.width),
						height = computeSize(child.height);
					
					// Unfortunately css precidence doesn't match the titanium, so we have to handle it ourselves
					if (isDef(width)) {
						if (isDef(left)) {
							right = undef;
						} else if (isDef(centerX)){
							left = centerX - width / 2;
							right = undef;
						} else if (isDef(right)) {
							// Do nothing
						} else {
							// Set the default position if this is an absolute layout
							isAbsolute && (left = computeSize("50%",elementWidth) - width / 2);
						}
					} else {
						if (isDef(centerX)) {
							if (isDef(left)) {
								width = (centerX - left) * 2;
								right = undef;
							} else if (isDef(right)) {
								width = (right - centerX) * 2;
							} else {
								// Set the default position if this is an absolute layout
								width = computeSize(child._defaultWidth);
							}
						} else {
							if (isDef(left) && isDef(right)) {
								// Do nothing
							} else {
								width = computeSize(child._defaultWidth);
								if(!isDef(left) && !isDef(right) & isAbsolute) {
									isAbsolute && (left = computeSize("50%",elementWidth) - (width ? width : 0) / 2);
								}
							}
						}
					}
					if (isDef(height)) {
						if (isDef(top)) {
							bottom = undef;
						} else if (isDef(centerY)){
							top = centerY - height / 2;
							bottom = undef;
						} else if (isDef(bottom)) {
							// Do nothing
						} else {
							// Set the default position if this is an absolute layout
							isAbsolute && (top = computeSize("50%",elementHeight) - height / 2);
						}
					} else {
						if (isDef(centerY)) {
							if (isDef(top)) {
								height = (centerY - top) * 2;
								bottom = undef;
							} else if (isDef(bottom)) {
								height = (bottom - centerY) * 2;
							} else {
								// Set the default position if this is an absolute layout
								height = computeSize(child._defaultHeight);
							}
						} else {
							if (isDef(top) && isDef(bottom)) {
								// Do nothing
							} else {
								height = computeSize(child._defaultHeight);
								if(!isDef(top) && !isDef(bottom) & isAbsolute) {
									isAbsolute && (top = computeSize("50%",elementHeight) - (height ? height : 0) / 2);
								}
							}
						}
					}
					
					!isAbsolute && set(child.domNode,"position","relative");
					
					// Set the position, size and z-index
					isDef(bottom) && set(child.domNode, bottomField, unitize(bottom));
					isDef(top) && set(child.domNode, topField, unitize(top));
					isDef(height) && set(child.domNode, "height", unitize(height));
					isDef(right) && set(child.domNode, rightField, unitize(right));
					isDef(left) && set(child.domNode, leftField, unitize(left));
					isDef(width) && set(child.domNode, "width", unitize(width));
					set(child.domNode, "zIndex", isDef(child.zIndex) ? child.zIndex : 0);
				}
			}
		}

	});

});;
define("Ti/_/Layouts/Absolute", ["Ti/_/Layouts/Base", "Ti/_/declare"], function(Base, declare) {

	return declare("Ti._.Layouts.Absolute", Base, {

		doLayout: function(element) {
			Base.prototype.doLayout.apply(this,[element,true]);
		}

	});

});
;
define("Ti/_/Layouts/Horizontal", ["Ti/_/Layouts/Base", "Ti/_/declare"], function(Base, declare) {

	return declare("Ti._.Layouts.Horizontal", Base, {

		doLayout: function(element) {
			Base.prototype.doLayout.apply(this,[element,false]);
		}

	});

});
;
define("Ti/_/Layouts/Vertical", ["Ti/_/Layouts/Base", "Ti/_/declare"], function(Base, declare) {

	return declare("Ti._.Layouts.Vertical", Base, {

		doLayout: function(element) {
			Base.prototype.doLayout.apply(this,[element,false]);
		}

	});

});
;
define("Ti/_/Layouts",
	["Ti/_/Layouts/Absolute", "Ti/_/Layouts/Horizontal", "Ti/_/Layouts/Vertical"],
	function(Absolute, Horizontal, Vertical) {

	return {
		Absolute: Absolute,
		Horizontal: Horizontal,
		Vertical: Vertical
	};

});;
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
;
define("Ti/API", ["Ti/_/Evented", "Ti/_/lang"], function(Evented, lang) {

	var api = {};

	require.each(["debug", "error", "info", "log", "warn"], function(fn) {
		api[fn] = function(msg) {
			console[fn]("[" + fn.toUpperCase() + "] " + msg);
		};
	});

	return lang.setObject("Ti.API", Evented, api);

});;
define("Ti/App", ["Ti/_/Evented"], function(Evented) {

	(function(api){
		// Interfaces
		Ti._5.EventDriven(api);
	
		require.mix(api, require.config.app, {
			idleTimerDisabled: true,
			proximityDetection: false,
			proximityState: 0
		});
	
		// Methods
		api.getArguments = function(){
			console.debug('Method "Titanium.App.getArguments" is not implemented yet.');
		};
	})(Ti._5.createClass('Ti.App'));

});;
define("Ti/App/Properties", ["Ti/_/Evented"], function(Evented) {

	(function(api){
		// Interfaces
		Ti._5.EventDriven(api);
		var STORAGE = "ti:LocalStorage";
		var _getProp = function(prop, def, transform){
			if(prop == null){
				return;
			}
			var storage = localStorage.getItem(STORAGE);
			if(storage == null){
				storage = [];
			} else {
				storage = JSON.parse(storage);
			}
			var val =  storage[prop];
			if(val != null){
				return typeof transform !== 'undefined' ? transform(val) : val;
			} else if (typeof def !== 'undefined'){
				return def;
			}
	
			return val;
		};
	
		var _setProp = function(prop, val, transform){
			if(prop == null || typeof val === 'undefined'){
				return;
			}
			val = typeof transform !== 'undefined' ? transform(val) : val;
			var storage = localStorage.getItem(STORAGE);
			if(storage == null){
				storage = {};
			} else {
				storage = JSON.parse(storage);
			}
			if(prop != null){
				storage[prop] = val;
			}
			localStorage.setItem(STORAGE, JSON.stringify(storage));
		};
	
		var _parseBoolean = function(val){return Boolean(val);};
		// Methods
		api.getBool = function(prop, def){
			return _getProp(prop, def, _parseBoolean);
		};
		api.getDouble = function(prop, def){
			return _getProp(prop, def, parseFloat);
		};
		api.getInt = function(prop, def){
			return _getProp(prop, def, parseInt);
		};
		api.getList = function(prop, def){
			return _getProp(prop, def, function(val){
				if(val instanceof Array){
					return val;
				}
				return [val];
			});
		};
		api.getString = function(prop, def){
			return _getProp(prop, def, function(val){
				if(typeof val === 'string'){
					return val;
				}
				return val.toString();
			});
		};
		api.hasProperty = function(prop){
			return typeof _getProp(prop) !== 'undefined';
		};
		api.listProperties = function(){
			var storage = localStorage.getItem(STORAGE);
			if(storage == null){
				return [];
			} else {
				storage = JSON.parse(storage);
			}
			var props = [];
			for(var key in storage){
				props.push(key);
			}
	
			return props;
		};
		api.removeProperty = function(prop){
			var storage = localStorage.getItem(STORAGE);
			if(storage == null){
				return;
			} else {
				storage = JSON.parse(storage);
			}
			
			delete storage[prop];
	
			localStorage.setItem(STORAGE, JSON.stringify(storage));
		};
		api.setBool = function(prop, val){
			_setProp(prop, val, _parseBoolean);
		};
		api.setDouble = function(prop, val){
			_setProp(prop, val, parseFloat);
		};
		api.setInt = function(prop, val){
			_setProp(prop, val, parseInt);
		};
		api.setList = function(prop, val){
			_setProp(prop, val, function(val){
				if(val instanceof Array){
					return val;
				}
				return [val];
			});
		};
		api.setString = function(prop, val){
			_setProp(prop, val, function(val){
				return val !== null ? ""+val : null;
			});
		};
	})(Ti._5.createClass('Ti.App.Properties'));

});;
define("Ti/Facebook", ["Ti/_/Evented"], function(Evented) {

	(function(api){

		var undef,
			facebookInitialized = false,
			loginAfterInitialization = false,
			appid = null,
			notLoggedInMessage = "not logged in",
			facebookDiv = document.createElement("div"),
			facebookScriptTagID = "facebook-jssdk",
			facebookLoaded = false;
	
		// Interfaces
		Ti._5.EventDriven(api);
	
		function initFacebook() {
			FB.init({
				appId: appid, // App ID
				status: false, // do NOT check login status because we're gonna do it after init() anyways
				cookie: true, // enable cookies to allow the server to access the session
				oauth: true, // enable OAuth 2.0
				xfbml: true  // parse XFBML
			});
			FB.getLoginStatus(function(response){
				facebookInitialized = true;
				(response.status == "connected" && initSession(response)) || loginAfterInitialization && loginInternal();
			});
		}
	
		function initSession(response) {
			var ar = response.authResponse;
			if (ar) {
				// Set the various status members
				loggedIn = true;
				api.uid = ar.userID;
				api.expirationDate = new Date((new Date()).getTime() + ar.expiresIn * 1000);
	
				// Set a timeout to match when the token expires
				ar.expiresIn && setTimeout(function(){ 
					api.logout();
				}, ar.expiresIn * 1000);
	
				// Fire the login event
				api.fireEvent("login", {
					cancelled: false,
					data: response,
					success: true,
					uid: api.uid
				});
	
				return true;
			}
		}
	
		// Properties
		Ti._5.prop(api, {
			accessToken: undef,
			appid: {
				get: function(){return appid;},
				set: function(val){
					appid = val;
					facebookLoaded && initFacebook();
				}
			},
			expirationDate: undef,
			forceDialogAuth: {
				get: function(){return true;},
				set: function(){}
			},
			loggedIn: false,
			permissions: undef,
			uid: undef
		});
	
		// Create the div required by Facebook
		facebookDiv.id = "fb-root";
		document.body.appendChild(facebookDiv);
	
		// Load the Facebook SDK Asynchronously.
		if (!document.getElementById(facebookScriptTagID)) {
			var facebookScriptTag = document.createElement("script"),
				head = document.getElementsByTagName("head")[0];
			facebookScriptTag.id = facebookScriptTagID; 
			facebookScriptTag.async = true;
			facebookScriptTag.src = "//connect.facebook.net/en_US/all.js";
			head.insertBefore(facebookScriptTag, head.firstChild);
		}
	
		window.fbAsyncInit = function() {
			facebookLoaded = true;
			appid && initFacebook();
		};
	
		function processResponse(response, requestParamName, requestParamValue, callback) {
			result = {source:api,success:false};
			result[requestParamName] = requestParamValue;
			if (!response || response.error) {
				response && (result["error"] = response.error);
			} else {
				result["success"] = true;
				result["result"] = JSON.stringify(response);
			}
			callback(result);
		}
			
		function loginInternal() {
			FB.login(function(response) {
				initSession(response) || api.fireEvent("login", {
					cancelled	: true,
					data		: response,
					error		: "user cancelled or an internal error occured.",
					success		: false,
					uid			: response.id
				});
			}, {"scope":api.permissions.join()});
		}
	
		// Methods
		api.authorize = function() {
			// Sanity check
			if (appid == null) {
				throw new Error("App ID not set. Facebook authorization cancelled.");
			}
	
			// Check if facebook is still initializing, and if so queue the auth request
			if (facebookInitialized) {
				// Authorize
				loginInternal();
			} else {
				loginAfterInitialization = true;
			}
		};
		api.createLoginButton = function(parameters) {
			throw new Error('Method "Titanium.Facebook.createLoginButton" is not implemented yet.');
		};
		api.dialog = function(action, params, callback) {
			if (loggedIn) {
				params.method = action;
				FB.ui(params,function(response){
					processResponse(response,"action",action,callback);
				});
			} else {
				callback({
					success	: false,
					error	: notLoggedInMessage,
					action	: action,
					source	: api
				});
			}
		};
		api.logout = function() {
			loggedIn && FB.logout(function(response) {
				loggedIn = false;
				api.fireEvent("logout", {
					success	: true
				});
			});
		};
		api.request = function(method, params, callback) {
			if (loggedIn) {
				params.method = method;
				params.urls = "facebook.com,developers.facebook.com";
				FB.api(params,function(response){
					processResponse(response,"method",method,callback);
				});
			} else {
				callback({
					success	: false,
					error	: notLoggedInMessage,
					method	: method,
					source	: api
				});
			}
		};
		api.requestWithGraphPath = function(path, params, httpMethod, callback) {
			if (loggedIn) {
				FB.api(path,httpMethod,params,function(response){
					processResponse(response,"path",path,callback);
				});
			} else {
				callback({
					success	: false,
					error	: notLoggedInMessage,
					path	: path,
					source	: api
				});
			}
		};
	})(Ti._5.createClass("Ti.Facebook"));

});;
define("Ti/Filesystem", ["Ti/_/Evented"], function(Evented) {

	(function(api){
		// Interfaces
		Ti._5.EventDriven(api);
	
		// Properties
		Ti._5.propReadOnly(api, {
			MODE_APPEND: 1,
			MODE_READ: 2,
			MODE_WRITE: 3,
			applicationDataDirectory: "/",
			applicationDirectory: "/",
			lineEnding: "\n",
			resourcesDirectory: "/",
			separator: "/",
			tempDirectory: null
		});
	
		// Methods
		api.createFile = function(){
			console.debug('Method "Titanium.Filesystem.createFile" is not implemented yet.');
		};
		api.createTempDirectory = function(){
			console.debug('Method "Titanium.Filesystem.createTempDirectory" is not implemented yet.');
		};
		api.createTempFile = function(){
			console.debug('Method "Titanium.Filesystem.createTempFile" is not implemented yet.');
		};
		api.getFile = function(){
			console.debug('Method "Titanium.Filesystem.getFile" is not implemented yet.');
			return new Ti.Filesystem.File;
		};
		api.isExternalStoragePresent = function(){
			console.debug('Method "Titanium.Filesystem.isExternalStoragePresent" is not implemented yet.');
		};
	})(Ti._5.createClass('Ti.Filesystem'));

});;
define("Ti/Media", ["Ti/_/Evented", "Ti/_/lang"], function(Evented, lang) {

	return lang.setObject("Ti.Media", Evented, {

		constants: {
			UNKNOWN_ERROR: 0,
			DEVICE_BUSY: 1,
			NO_CAMERA: 2,
			NO_VIDEO: 3,

			VIDEO_CONTROL_DEFAULT: 4,
			VIDEO_CONTROL_EMBEDDED: 5,
			VIDEO_CONTROL_FULLSCREEN: 6,
			VIDEO_CONTROL_NONE: 7,
			VIDEO_CONTROL_HIDDEN: 8,

			VIDEO_SCALING_NONE: 9,
			VIDEO_SCALING_ASPECT_FILL: 10,
			VIDEO_SCALING_ASPECT_FIT: 11,
			VIDEO_SCALING_MODE_FILL: 12,

			VIDEO_PLAYBACK_STATE_STOPPED: 13,
			VIDEO_PLAYBACK_STATE_PLAYING: 14,
			VIDEO_PLAYBACK_STATE_PAUSED: 15,

			VIDEO_LOAD_STATE_PLAYABLE: 16,
			VIDEO_LOAD_STATE_PLAYTHROUGH_OK: 17,
			VIDEO_LOAD_STATE_STALLED: 18,
			VIDEO_LOAD_STATE_UNKNOWN: 19,

			VIDEO_REPEAT_MODE_NONE: 20,
			VIDEO_REPEAT_MODE_ONE: 21,

			VIDEO_FINISH_REASON_PLAYBACK_ENDED: 22,
			VIDEO_FINISH_REASON_PLAYBACK_ERROR: 23,
			VIDEO_FINISH_REASON_USER_EXITED: 24
		},

		beep: function() {
			console.debug('Method "Titanium.Media.beep" is not implemented yet.');
		},

		createAudioPlayer: function() {
			console.debug('Method "Titanium.Media.createAudioPlayer" is not implemented yet.');
		},

		createAudioRecorder: function() {
			console.debug('Method "Titanium.Media.createAudioRecorder" is not implemented yet.');
		},

		createItem: function() {
			console.debug('Method "Titanium.Media.createItem" is not implemented yet.');
		},

		createSound: function() {
			console.debug('Method "Titanium.Media.createSound" is not implemented yet.');
		},

		createVideoPlayer: function(args) {
			return new Ti.Media.VideoPlayer(args);
		}

	});
	
});;
define("Ti/Media/VideoPlayer", ["Ti/_/Evented", "Ti/Media"], function(Evented, Media) {

	var on = require.on,
		STOPPED = 0,
		STOPPING = 1,
		PAUSED = 2,
		PLAYING = 3,
		nativeFullscreen,
		fakeFullscreen = true,
		mimeTypes = {
			"m4v": "video/mp4",
			"mov": "video/quicktime",
			"mp4": "video/mp4",
			"ogg": "video/ogg",
			"ogv": "video/ogg",
			"webm": "video/webm"
		};
/*
	return declare("Ti.Media.VideoPlayer", Evented, {

		constructor: function(args) {
			require.mix(this, args || {});

			this.currentState = STOPPED;
			this.video = document.createElement("video");
			this._setDuration(0.0);

			//////

			// if we have a url, then create the video
			this.url && createVideo();
		},

		_setDuration: function(value) {
			this.duration = this.playableDuration = this.endPlaybackTime = value;
		},

		properties: {
			autoplay: false,
			repeatMode: Media.VIDEO_REPEAT_MODE_NONE,
			fullscreen: {
				// TODO: Add check for Firefox <http://www.thecssninja.com/javascript/fullscreen>
				value: (function(s){
					return s && s();
				}(document.createElement("video").webkitDisplayingFullscreen)),

				set: function(value){
					var h;

					value = !!value;
					if (nativeFullscreen) {
						try {
							if (value) {
								video.webkitEnterFullscreen();
							} else {
								video.webkitExitFullscreen();
							}
						} catch(ex) {}
					} else if (fakeFullscreen) {
						video.className = value ? "fullscreen" : "";
						value && (h = on(window, "keydown", function(e){
							if (e.keyCode === 27) {
								this.fullscreen = 0;
								h();
							}
						}));
					}

					this.fireEvent("fullscreen", {
						entering: value
					});

					return value;
				}
			},
			scalingMode: {
				get: function() {
					return _scalingMode;
				},
				set: function(val) {
					_scalingMode = val;
					setSize();
				}
			},
			url: {
				get: function() { return _url; },
				set: function(val) {
					_url = val;
					_playing = false;
					currentState = STOPPED;
					createVideo();
				}
			},
			mediaControlStyle: {
				get: function() { return _mediaControlStyle; },
				set: function(val) {
					video.controls = val === media.VIDEO_CONTROL_DEFAULT;
					_mediaControlStyle = val;
				}
			}
		},

		constants: {
			playbackState: function(){ return _playbackState; },
			playing: function(){ return _playing; },
			initialPlaybackTime: 0,
			currentPlaybackTime: function(){ return _currentPlaybackTime; },
			endPlaybackTime: function(){ return _endPlaybackTime; },
			playableDuration: function(){ return _playableDuration; },
			loadState: function(){ return _loadState; },
			duration: function(){ return _duration; }
		}

	});


		handles,

		
		_playbackState = media.VIDEO_PLAYBACK_STATE_STOPPED,
		_playing = false,
		_currentPlaybackTime = 0,
		_endPlaybackTime = 0,
		_playableDuration = 0,
		_duration = 0,
		_loadState = media.VIDEO_LOAD_STATE_UNKNOWN,
		_scalingMode = args.scalingMode || media.VIDEO_SCALING_ASPECT_FIT,
		_mediaControlStyle = args.mediaControlStyle || media.VIDEO_CONTROL_DEFAULT,
		_url = args.url;

	

	function setSize() {
		self.dom.className = self.dom.className.replace(/(scaling\-[\w\-]+)/, "") + ' '
			+ (_scalingMode === media.VIDEO_SCALING_NONE ? "scaling-none" : "scaling-aspect-fit");
	}

	function setPlaybackState(state) {
		self.fireEvent("playbackState", {
			playbackState: _playbackState = state
		});
	}

	function setLoadState(state) {
		self.fireEvent("loadstate", {
			loadState: _loadState = state
		});
	}

	function complete(evt) {
		var ended = evt.type === "ended";
		_playing = false;
		currentState = STOPPED;
		self.fireEvent("complete", {
			reason: ended ? media.VIDEO_FINISH_REASON_PLAYBACK_ENDED : media.VIDEO_FINISH_REASON_USER_EXITED
		});
		ended && self.repeatMode === media.VIDEO_REPEAT_MODE_ONE && setTimeout(function(){ video.play(); }, 1);
	}

	function stalled() {
		setLoadState(media.VIDEO_LOAD_STATE_STALLED);
	}

	_fullscreenChange: function(e) {
		this.fullscreen && (this.fullscreen = !_fullscreen);
	}

	function metaDataLoaded() {
		// TODO: Add check for Firefox <http://www.thecssninja.com/javascript/fullscreen>
		nativeFullscreen = this.webkitSupportsFullscreen;
		durationChange();
	}

	function durationChange() {
		var d = this.duration;
		if (d !== Infinity) {
			self.duration || self.fireEvent("durationAvailable", {
				duration: d
			});
			setDuration(d);
		}
	}

	function paused() {
		var pbs = media.VIDEO_PLAYBACK_STATE_STOPPED;
		_playing = false;
		if (currentState === PLAYING) {
			currentState = PAUSED;
			pbs = media.VIDEO_PLAYBACK_STATE_PAUSED;
		} else if (currentState === STOPPING) {
			video.currentTime = 0;
		}
		setPlaybackState(pbs);
	}

	function createVideo(dontCreate) {
		var i, src, match,
			url = self.url;

		if (dontCreate && video && video.parentNode) {
			return video;
		}

		self.release();

		video = document.createElement("video");
		video.tabindex = 0;
		_mediaControlStyle === media.VIDEO_CONTROL_DEFAULT && (video.controls = 1);

		handles = [
			on(video, "playing", function() {
				currentState = PLAYING;
				_playing = true;
				self.fireEvent("playing", {
					url: video.currentSrc
				});
				setPlaybackState(media.VIDEO_PLAYBACK_STATE_PLAYING);
			}),
			on(video, "pause", paused),
			on(video, "canplay", function() {
				setLoadState(media.VIDEO_LOAD_STATE_PLAYABLE);
				currentState === STOPPED && self.autoplay && video.play();
			}),
			on(video, "canplaythrough", function() {
				setLoadState(media.VIDEO_LOAD_STATE_PLAYTHROUGH_OK);
				self.fireEvent("preload");
			}),
			on(video, "loadeddata", function() {
				self.fireEvent("load");
			}),
			on(video, "loadedmetadata", metaDataLoaded),
			on(video, "durationchange", durationChange),
			on(video, "timeupdate", function(){
				_currentPlaybackTime = Math.round(this.currentTime);
				currentState === STOPPING && this.pause();
			}),
			on(video, "error", function() {
				var msg = "Unknown error";
				switch (this.error.code) {
					case 1: msg = "Aborted"; break;
					case 2: msg = "Decode error"; break;
					case 3: msg = "Network error"; break;
					case 4: msg = "Unsupported format";
				}
				_playing = false;
				setLoadState(media.VIDEO_LOAD_STATE_UNKNOWN);
				self.fireEvent("error", {
					message: msg
				});
				self.fireEvent("complete", {
					reason: media.VIDEO_FINISH_REASON_PLAYBACK_ERROR
				});
			}),
			on(video, "abort", complete),
			on(video, "ended", complete),
			on(video, "stalled", stalled),
			on(video, "waiting", stalled),
			on(video, "mozfullscreenchange", fullscreenChange),
			on(video, "webkitfullscreenchange", fullscreenChange)
		];

		setSize();
		self.dom.appendChild(video);

		require.is(url, "Array") || (url = [url]);

		for (i = 0; i < url.length; i++) {
			src = document.createElement("source");
			src.src = url[i];
			match = url[i].match(/.+\.([^\/\.]+?)$/);
			match && mimeTypes[match[1]] && (src.type = mimeTypes[match[1]]);
			video.appendChild(src);
		}

		return video;
	}

	// Methods
	self.play = function(){
		currentState !== PLAYING && createVideo(1).play();
	};

	self.pause = function(){
		currentState === PLAYING && createVideo(1).pause();
	};

	self.release = function(){
		var i,
			parent = video && video.parentNode;
		if (parent) {
			for (i = 0; i < handles.length; i++) {
				handles[i]();
			}
			parent.removeChild(video);
		}
		video = null;
	};

	self.stop = function(){
		currentState = STOPPING;
		video.pause();
		video.currentTime = 0;
	};

	
});
	});
*/
});;
define("Ti/Network", ["Ti/_/Evented"], function(Evented) {

	(function(api){
		// Interfaces
		Ti._5.EventDriven(api);
	
		var _httpURLFormatter = null,
		    _online = navigator.onLine;
	
		// Properties
		Ti._5.propReadOnly(api, {
			INADDR_ANY: null,
			NETWORK_LAN: 1,
			NETWORK_MOBILE: 3,
			NETWORK_NONE: 0,
			NETWORK_UNKNOWN: -1,
			NETWORK_WIFI: 2,
			NOTIFICATION_TYPE_ALERT: 0,
			NOTIFICATION_TYPE_BADGE: 1,
			NOTIFICATION_TYPE_SOUND: 2,
			READ_MODE: 0,
			READ_WRITE_MODE: 2,
			WRITE_MODE: 1,
			networkType: function() {
				if (!_online) {
					return api.NETWORK_NONE;
				}		
				if (navigator.connection && navigator.connection.type == navigator.connection.WIFI) {
					return api.NETWORK_WIFI;
				}
				if (navigator.connection && navigator.connection.type == navigator.connection.ETHERNET) {
					return api.NETWORK_LAN;
				}
				if (
					navigator.connection &&
					(navigator.connection.type == navigator.connection.CELL_2G ||
					navigator.connection.type == navigator.connection.CELL_3G)			
				) {
					return api.NETWORK_MOBILE;
				}
				
				return api.NETWORK_UNKNOWN;
			},
			networkTypeName: function() {
				if (!_online) {
					return "NONE";
				}		
				if (navigator.connection && navigator.connection.type == navigator.connection.WIFI) {
					return "WIFI";
				}
				if (navigator.connection && navigator.connection.type == navigator.connection.ETHERNET) {
					return "LAN";
				}
				if (
					navigator.connection &&
					(navigator.connection.type == navigator.connection.CELL_2G ||
					navigator.connection.type == navigator.connection.CELL_3G)			
				) {
					return "MOBILE";
				}
				
				return "UNKNOWN";
			},
			online: function() {
				return navigator.onLine;
			}
		});
		
		Ti._5.prop(api, "httpURLFormatter", {
			get: function() {return _httpURLFormatter;},
			set: function(val) {_httpURLFormatter = val;}
		});
	
		// Methods
		api.createHTTPClient = function(args) {
			return new Ti.Network.HTTPClient(args);
		};
	
		api.decodeURIComponent = function(value) {
			return decodeURIComponent(value);
		};
	
		api.encodeURIComponent = function(value) {
			return encodeURIComponent(value);
		};
	
		// Events
		require.on(window, "online", function(evt) {
			if (!_online) {
				_online = true;
				api.fireEvent("change", {
					networkType		: api.networkType,
					networkTypeName	: api.networkTypeName,
					online			: true,
					source			: evt.target,
					type			: evt.type
				});
			}
		});
		
		require.on(window, "offline", function(evt) {
			if (_online) {
				_online = false;
				api.fireEvent("change", {
					networkType		: api.networkType,
					networkTypeName	: api.networkTypeName,
					online			: false,
					source			: evt.target,
					type			: evt.type
				});
			}
		});
	})(Ti._5.createClass("Ti.Network"));


});;
define("Ti/Network/HTTPClient", ["Ti/_/Evented"], function(Evented) {

	Ti._5.createClass("Ti.Network.HTTPClient", function(args){
	
		var undef,
			obj = this,
			is = require.is,
			on = require.on,
			xhr = new XMLHttpRequest,
			UNSENT = 0,
			OPENED = 1,
			HEADERS_RECEIVED = 2,
			LOADING = 3,
			DONE = 4,
			_readyState = UNSENT, // unsent
			_completed, // This completed stuff is a hack to get around a non-obvious bug.
			timeoutTimer;
		
		Ti._5.EventDriven(obj);
		
		function fireStateChange() {
			is(obj.onreadystatechange, "Function") && obj.onreadystatechange.call(obj);
		}
	
		xhr.onreadystatechange = function() {
			switch (xhr.readyState) {
				case 0: _readyState = UNSENT; break;
				case 1: _readyState = OPENED; break;
				case 2: _readyState = LOADING; break;
				case 3: _readyState = HEADERS_RECEIVED; break;
				case 4:
					clearTimeout(timeoutTimer);
					_completed = true;
					_readyState = DONE;
					if (xhr.status == 200) {
						obj.responseText = xhr.responseText;
						obj.responseXML = xhr.responseXML;
						obj.responseData = xhr.responceHeader;
						is(obj.onload, "Function") && obj.onload.call(obj);
					} else {
						xhr.status / 100 | 0 > 3 && onerror();
					}
			}
			fireStateChange();
		};
	
		function onerror(error) {
			obj.abort();
			is(error, "Object") || (error = { message: error });
			error.error || (error.error = error.message || xhr.status);
			parseInt(error.error) || (error.error = "Can't reach host");
			is(obj.onerror, "Function") && obj.onerror.call(obj, error);
		}
	
		on(xhr, "error", onerror);
		on(xhr.upload, "error", onerror);
	
		function onprogress(evt) {
			evt.progress = evt.lengthComputable ? evt.loaded / evt.total : false;
			is(obj.onsendstream, "Function") && obj.onsendstream.call(obj, evt);
		}
	
		on(xhr, "progress", onprogress);
		on(xhr.upload, "progress", onprogress);
	
		// Properties
		Ti._5.propReadOnly(obj, {
			UNSENT: UNSENT,
			OPENED: OPENED,
			HEADERS_RECEIVED: HEADERS_RECEIVED,
			LOADING: LOADING,
			DONE: DONE,
			connected: function() { return _readyState >= OPENED; },
			readyState: function() { return _readyState; },
			status: function() { return xhr.status; }
		});
	
		Ti._5.prop(obj, {
			connectionType: undef,
			file: undef,
			location: undef,
			ondatastream: undef,
			onerror: undef,
			onload: undef,
			onreadystatechange: undef,
			onsendstream: undef,
			responseData: "",
			responseText: "",
			responseXML: "",
			timeout: undef,
			validatesSecureCertificate: false
		});
	
		require.mix(obj, args);
	
		// Methods
		obj.abort = function() {
			obj.responseText = obj.responseXML = obj.responseData = "";
			_completed = true;
			clearTimeout(timeoutTimer);
			obj.connected && xhr.abort();
			_readyState = UNSENT;
			fireStateChange();
		};
	
		obj.getResponseHeader = function(name) {
			return xhr.readyState === 2 ? xhr.getResponseHeader(name) : null;
		};
	
		obj.open = function(method, url, async) {
			var httpURLFormatter = Ti.Network.httpURLFormatter;
			obj.abort();
			xhr.open(
				obj.connectionType = method,
				obj.location = require("Ti/_").getAbsolutePath(httpURLFormatter ? httpURLFormatter(url) : url),
				!!async
			);
			xhr.setRequestHeader("UserAgent", Ti.userAgent);
		};
	
		obj.send = function(args){
			_completed = false;
			try {
				xhr.send(args || null);
				clearTimeout(timeoutTimer);
				obj.timeout && (timeoutTimer = setTimeout(function() {
					if (obj.connected) {
						obj.abort();
						!_completed && onerror("Request timed out");
					}
				}, obj.timeout));
			} catch (error) {
				onerror(error);
			}
		};
	
		obj.setRequestHeader = function(label,value) {
			xhr.setRequestHeader(label,value);
		};
	});


});;
define("Ti/Platform", ["Ti/_", "Ti/_/browser", "Ti/_/Evented", "Ti/_/lang"], function(_, browser, Evented, lang) {

	var id = localStorage && localStorage.getItem("ti:titaniumPlatformId") ?
			localStorage.getItem("ti:titaniumPlatformId") : _.uuid();

	localStorage.setItem("ti:titaniumPlatformId", id);

	return lang.setObject("Ti.Platform", Evented, {

		createUUID: _.uuid,

		canOpenURL: function() {
			return true;
		},

		openURL: function(url){
			var m = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?/.exec(url);
			if ( (/^([tel|sms|mailto])/.test(url) || /^([\/?#]|[\w\d-]+^:[\w\d]+^@)/.test(m[1])) && !/^(localhost)/.test(url) ) {
				setTimeout(function () {
					window.location.href = url;
				}, 1);
			} else {
				window.open(url);
			}
		},

		constants: {
			BATTERY_STATE_CHARGING: 1,
			BATTERY_STATE_FULL: 2,
			BATTERY_STATE_UNKNOWN: -1,
			BATTERY_STATE_UNPLUGGED: 0,
			address: null,
			architecture: null,
			availableMemory: null,
			batteryLevel: null,
			batteryMonitoring: null,
			batteryState: this.BATTERY_STATE_UNKNOWN,
			id: id,
			isBrowser: true,
			locale: navigator.language,
			macaddress: null,
			model: null,
			name: navigator.userAgent,
			netmask: null,
			osname: "mobileweb",
			ostype: navigator.platform,
			runtime: browser.runtime,
			processorCount: null,
			username: null,
			version: require.config.ti.version
		}

	});

});
;
define("Ti/Platform/DisplayCaps", ["Ti/_/Evented", "Ti/_/lang"], function(Evented, lang) {
	
	// Pre-calculate the screen DPI
	var body = document.body,
		measureDiv = document.createElement('div');
	measureDiv.style.width = "1in";
	measureDiv.style.visibility = "hidden";
	body.appendChild(measureDiv);
	var dpi = parseInt(measureDiv.clientWidth);
	body.removeChild(measureDiv);
	
	var ua = navigator.userAgent.toLowerCase(),
		api = lang.setObject("Ti.Platform.DisplayCaps", Evented, {

			constants: {
				density: function(){
					switch (ua) {
						case "iphone":
							return "medium";
						case "ipad":
							return "medium";
						default:
							return "";
					}
				},

				dpi: dpi,

				platformHeight: window.innerHeight,

				platformWidth: window.innerWidth
			}
	
		});

	return Ti.Platform.displayCaps = api;

});;
define("Ti/UI", ["Ti/_/dom", "Ti/_/Evented", "Ti/_/lang", "Ti/_/style"], function(dom, Evented, lang, style) {

	return lang.setObject("Ti.UI", Evented, {
		
		_init: function() {
			this._container = Ti.UI.createView({left: 0, right: 0, width: "100%", height: "100%"});
			document.body.appendChild(this._container.domNode);
			return this._container;
		},
		
		_container: null,
		
		properties: {
			backgroundColor: {
				set: function(value) {
					this._container.backgroundColor = value;
				}
			},
			backgroundImage: {
				set: function(value) {
					this._container.backgroundImage = value;
				}
			}
		},

		constants: {
			UNKNOWN: 0,
			FACE_DOWN: 1,
			FACE_UP: 2,
			PORTRAIT: 3,
			UPSIDE_PORTRAIT: 4,
			LANDSCAPE_LEFT: 5,
			LANDSCAPE_RIGHT: 6,
			INPUT_BORDERSTYLE_BEZEL: 3,
			INPUT_BORDERSTYLE_LINE: 1,
			INPUT_BORDERSTYLE_NONE: 0,
			INPUT_BORDERSTYLE_ROUNDED: 2,
			INPUT_BUTTONMODE_ALWAYS: 1,
			INPUT_BUTTONMODE_NEVER: 0,
			INPUT_BUTTONMODE_ONBLUR: 0,
			INPUT_BUTTONMODE_ONFOCUS: 1,
			KEYBOARD_APPEARANCE_ALERT: 1,
			KEYBOARD_APPEARANCE_DEFAULT: 0,
			KEYBOARD_ASCII: 1,
			KEYBOARD_DEFAULT: 2,
			KEYBOARD_EMAIL: 3,
			KEYBOARD_NAMEPHONE_PAD: 4,
			KEYBOARD_NUMBERS_PUNCTUATION: 5,
			KEYBOARD_NUMBER_PAD: 6,
			KEYBOARD_PHONE_PAD: 7,
			KEYBOARD_URL: 8,
			NOTIFICATION_DURATION_LONG: 1,
			NOTIFICATION_DURATION_SHORT: 2,
			PICKER_TYPE_COUNT_DOWN_TIMER: 1,
			PICKER_TYPE_DATE: 2,
			PICKER_TYPE_DATE_AND_TIME: 3,
			PICKER_TYPE_PLAIN: 4,
			PICKER_TYPE_TIME: 5,
			RETURNKEY_DEFAULT: 0,
			RETURNKEY_DONE: 1,
			RETURNKEY_EMERGENCY_CALL: 2,
			RETURNKEY_GO: 3,
			RETURNKEY_GOOGLE: 4,
			RETURNKEY_JOIN: 5,
			RETURNKEY_NEXT: 6,
			RETURNKEY_ROUTE: 7,
			RETURNKEY_SEARCH: 8,
			RETURNKEY_SEND: 9,
			RETURNKEY_YAHOO: 10,
			TEXT_ALIGNMENT_CENTER: 1,
			TEXT_ALIGNMENT_RIGHT: 2,
			TEXT_ALIGNMENT_LEFT: 3,
			TEXT_AUTOCAPITALIZATION_ALL: 3,
			TEXT_AUTOCAPITALIZATION_NONE: 0,
			TEXT_AUTOCAPITALIZATION_SENTENCES: 2,
			TEXT_AUTOCAPITALIZATION_WORDS: 1,
			TEXT_VERTICAL_ALIGNMENT_BOTTOM: 2,
			TEXT_VERTICAL_ALIGNMENT_CENTER: 1,
			TEXT_VERTICAL_ALIGNMENT_TOP: 3
		},

		create2DMatrix: function(args) {
			return new Ti.UI["2DMatrix"](args);
		},

		createActivityIndicator: function(args) {
			return new Ti.UI.ActivityIndicator(args);
		},

		createAlertDialog: function(args) {
			return new Ti.UI.AlertDialog(args);
		},

		createAnimation: function(args) {
			return new Ti.UI.Animation(args);
		},

		createButton: function(args) {
			return new Ti.UI.Button(args);
		},

		createButtonBar: function() {
			console.debug('Method "Titanium.UI.createButtonBar" is not implemented yet.');
		},

		createDashboardItem: function() {
			console.debug('Method "Titanium.UI.createDashboardItem" is not implemented yet.');
		},

		createDashboardView: function() {
			console.debug('Method "Titanium.UI.createDashboardView" is not implemented yet.');
		},

		createEmailDialog: function() {
			console.debug('Method "Titanium.UI.createEmailDialog" is not implemented yet.');
		},

		createImageView: function(args) {
			return new Ti.UI.ImageView(args);
		},

		createLabel: function(args) {
			return new Ti.UI.Label(args);
		},

		createOptionDialog: function() {
			console.debug('Method "Titanium.UI.createOptionDialog" is not implemented yet.');
		},

		createPicker: function(args) {
			return new Ti.UI.Picker(args);
		},

		createPickerColumn: function() {
			console.debug('Method "Titanium.UI.createPickerColumn" is not implemented yet.');
		},

		createPickerRow: function(args) {
			return new Ti.UI.PickerRow(args);
		},

		createProgressBar: function() {
			console.debug('Method "Titanium.UI.createProgressBar" is not implemented yet.');
		},

		createScrollView: function(args) {
			return new Ti.UI.ScrollView(args);
		},

		createScrollableView: function(args) {
			return new Ti.UI.ScrollableView(args);
		},

		createSearchBar: function(args) {
			return new Ti.UI.SearchBar(args);
		},

		createSlider: function(args) {
			return new Ti.UI.Slider(args);
		},

		createSwitch: function(args) {
			return new Ti.UI.Switch(args);
		},

		createTab: function(args) {
			return new Ti.UI.Tab(args);
		},

		createTabGroup: function(args) {
			return new Ti.UI.TabGroup(args);
		},

		createTableView: function(args) {
			return new Ti.UI.TableView(args);
		},

		createTableViewRow: function(args) {
			return new Ti.UI.TableViewRow(args);
		},

		createTableViewSection: function(args) {
			return new Ti.UI.TableViewSection(args);
		},

		createTextArea: function(args) {
			return new Ti.UI.TextArea(args);
		},

		createTextField: function(args) {
			return new Ti.UI.TextField(args);
		},

		createView: function(args) {
			return new Ti.UI.View(args);
		},

		createWebView: function(args) {
			return new Ti.UI.WebView(args);
		},

		createWindow: function(args) {
			return new Ti.UI.Window(args);
		}

	});

});;
define("Ti/Gesture", ["Ti/_/Evented", "Ti/_/lang", "Ti/UI"], function(Evented, lang, UI) {

	var undef,
		win = window,
		on = require.on,
		lastOrient = null,
		lastShake = (new Date()).getTime(),
		lastAccel = {},
		api = lang.setObject("Ti.Gesture", Evented, {
			properties: {
				orientation: UI.UNKNOWN
			}
		});

	function getWindowOrientation() {
		api.orientation = UI.PORTRAIT;
		switch (win.orientation) {
			case 90:
				api.orientation = UI.LANDSCAPE_LEFT;
				break;
			case -90:
				api.orientation = UI.LANDSCAPE_RIGHT;
				break;
			case 180:
				api.orientation = UI.UPSIDE_PORTRAIT;
				break;
		}
		return api.orientation;
	}
	getWindowOrientation();

	on(win, "orientationchange", function(evt) {
		getWindowOrientation();
		lastOrient !== api.orientation && api.fireEvent('orientationchange', {
			orientation: lastOrient = api.orientation,
			source: evt.source
		});
	});

	function deviceOrientation(evt) {
		var orient = null,
			beta = Math.abs(evt.beta || evt.y|0 * 90),
			gamma = Math.abs(evt.gamma || evt.x|0 * 90);

		beta < 5 && gamma > 170 && (orient = UI.FACE_DOWN);
		beta < 5 && gamma < 5 && (orient = UI.FACE_UP);
		beta > 50 && 0 > beta && lastOrient != orient && (orient = UI.UPSIDE_PORTRAIT);

		if (orient !== null && lastOrient !== orient) {
			api.fireEvent('orientationchange', {
				orientation: lastOrient = orient,
				source: evt.source
			});
		}
	}

	on(win, "MozOrientation", deviceOrientation);
	on(win, "deviceorientation", deviceOrientation);

	on(win, "devicemotion", function(evt) {
		var e = evt.acceleration || evt.accelerationIncludingGravity,
			x, y, z,
			currentTime,
			accel = e && {
				x: e.x,
				y: e.y,
				z: e.z,
				source: evt.source
			};

		if (accel) {
			if (lastAccel.x !== undef) {
				x = Math.abs(lastAccel.x - accel.x) > 10;
				y = Math.abs(lastAccel.y - accel.y) > 10;
				z = Math.abs(lastAccel.z - accel.z) > 10;
				if ((x && (y || z)) || (y && z)) {
					currentTime = (new Date()).getTime();
					if ((accel.timestamp = currentTime - lastShake) > 300) {
						lastShake = currentTime;
						api.fireEvent('shake', accel);
					}
				}
			}
			lastAccel = accel;
		}
	});

	return api;

});;
define("Ti/Utils", ["Ti/_/Evented"], function(Evented) {

	(function(api){
		// Interfaces
		Ti._5.EventDriven(api);
		
		function _clone(oSource) {
			if(!oSource || 'object' !== typeof oSource)  {
				return oSource;
			}
			var oClone = 'function' === typeof oSource.pop ? [] : {};
			var sIndex = null;
			for(sIndex in oSource) {
				if(oSource.hasOwnProperty(sIndex)) {
					var oProp = oSource[sIndex];
					if(oProp && 'object' === typeof oProp) {
						oClone[sIndex] = _clone(oProp);
					} else {
						oClone[sIndex] = oProp;
					}
				}
			}
			return oClone;
		}
	
		var _DOMParser = new DOMParser();
		api.DOMDocument = null;
		
		function _NodeList() {
			var _nodes = [];
	
			Ti._5.prop(this, 'length', {
				get: function() {return _nodes.length}
			});
		
			this.item = function (iIndex) {
				return _nodes[iIndex]; 
			}
			this.add = function (oNode) {
				_nodes.push(oNode);
			}
			this.remove = function (oNode) {
				for (var iCounter=_nodes.length; iCounter--;) {
					if (oNode == _nodes[iCounter]) {
						_nodes.splice(iCounter,1);
					}
				}
			}
		}
		
		function _addEvaluate(oNode) {
			oNode.evaluate = function (xml) {
				tempXPathResult = _DOMParser.parseFromString(_serialize1Node(oNode),"text/xml");
				var oNodes = tempXPathResult.evaluate(xml, tempXPathResult, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
				var oResult = new _NodeList();
				var oTemp = null;
				if (oNodes) {
					while (oTemp = oNodes.iterateNext()) {
						oResult.add(_nodeWrapper(oTemp));
					}
				}
				return oResult;
			};
			return oNode;
		}
		
		function _nodeWrapper(oNode) {
			if (!oNode.nodeValue) {
				oNode.nodeValue = oNode;
			}
			if (!oNode.text) {
				oNode.text = oNode.nodeValue;
			}
			
			return _addEvaluate(oNode);
		}
		
		// Methods
		api.parseString = function(xml) {
			domDocument = _DOMParser.parseFromString(xml.replace(/>\s*</gi, "><"),"text/xml");
			var oResult = domDocument.firstChild || domDocument;
	
			// Add some functionality for compatibility with Mobile SDK
			oResult = _addEvaluate(oResult);
			oResult.documentElement = _addEvaluate(domDocument.documentElement);
			oResult.getElementsByTagName = function (sName) {
				return oResult.parentNode ? oResult.parentNode.getElementsByTagName(sName) : oResult.getElementsByTagName(sName);
			}
			
			return api.DOMDocument = oResult;
		};
		
		function _serialize1Node (node) {
			if ('undefined' != typeof node.outerHTML) {
				return node.outerHTML;
			}
			
			if ('undefined' != typeof XMLSerializer) {
				var serializer = new XMLSerializer();
				return serializer.serializeToString(node);
			} else if (node.xml) {
				return node.xml;
			} else {
				var oNode = document.createElement("div");
				oNode.appendChild(node);
				return oNode.innerHTML;
			}
		};
		
		api.serializeToString = function (nodeList) {
			if ('array' != typeof nodeList && '[object NodeList]' !== nodeList.toString()) {
				return _serialize1Node(nodeList);
			}
			var sResult = "";
			for (var iCounter=0; iCounter < nodeList.length; iCounter++) {
				sResult += _serialize1Node(nodeList[iCounter]);
			}
			return sResult;
		}
		
	})(Ti._5.createClass('Ti.XML'));

});;
define("Ti/UI/View",
	["Ti/_/declare", "Ti/_/dom", "Ti/_/UI/Element", "Ti/_/lang", "Ti/_/string", "Ti/_/Layouts"],
	function(declare, dom, Element, lang, string, Layouts) {

	return declare("Ti.UI.View", Element, {

		parent: null,

		constructor: function() {
			this.children = [];
			this.layout = "absolute";
			this.containerNode = this.domNode;
		},

		add: function(view) {
			view.parent = this;
			this.children.push(view);
			this.containerNode.appendChild(view.domNode);
			this.doFullLayout();
		},

		remove: function(view) {
			var i = 0,
				l = this.children.length;
			for (; i < l; i++) {
				if (this.children[i] === view) {
					this.children.splice(i, 1);
					break;
				}
			}
			dom.destroy(view.domNode);
			this.doFullLayout();
		},
		
		destroy: function() {
			var i = 0,
				l = this.children.length;
			for (; i < l; i++) {
				this.children[i].destroy();
			}
			Element.prototype.destroy.apply(this, arguments);
		},

		properties: {
			_defaultWidth: "100%",
			_defaultHeight: "100%",
			layout: {
				set: function(value) {
					var match = value.toLowerCase().match(/^(horizontal|vertical)$/),
						value = match ? match[0] : "absolute";

					if (this._layout) {
						this._layout.destroy();
						this._layout = null;
					}

					this._layout = new Layouts[string.capitalize(value)](this);

					return value;
				}
			}
		}

	});

});;
define("Ti/UI/TableViewRow", ["Ti/_/declare", "Ti/UI/View", "Ti/_/dom", "Ti/_/css", "Ti/_/style"], function(declare, View, dom, css, style) {

	var set = style.set,
		undef;

	return declare("Ti.UI.TableViewRow", View, {
		
		constructor: function(args) {
			
			this.leftView = Ti.UI.createView({
				left: 0,
				top: 0,
				width: "auto",
				layout: "horizontal"
			}),
			set(this.leftView.domNode,"boxAlign","center");
			this.add(this.leftView);
			
			this.leftImageView = Ti.UI.createImageView();
			this.leftView.add(this.leftImageView); 
			
			this.titleLabel = Ti.UI.createLabel({width: "auto"});
			this.leftView.add(this.titleLabel);
			
			this.rightView = Ti.UI.createView({
				right: 0,
				top: 0,
				width: "auto",
				layout: "horizontal"
			}),
			set(this.rightView.domNode,"boxAlign","center");
			this.add(this.rightView);
			
			this.rightImageView = Ti.UI.createImageView();
			this.rightView.add(this.rightImageView);
			
			// Holds detail, child, or check
			this.extraView = Ti.UI.createView({width: "auto"});
			this.rightView.add(this.extraView);
		},

		properties: {
			_defaultHeight: "auto",
			_defaultWidth: "100%",
			_tableRowHeight: undef,
			hasCheck: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewRow#.hasCheck" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewRow#.hasCheck" is not implemented yet.');
					return value;
				}
			},
			hasChild: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewRow#.hasChild" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewRow#.hasChild" is not implemented yet.');
					return value;
				}
			},
			hasDetail: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewRow#.hasDetail" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewRow#.hasDetail" is not implemented yet.');
					return value;
				}
			},
			leftImage: {
				set: function(value) {
					this.leftImageView.image = value;
					return value;
				}
			},
			rightImage: {
				set: function(value) {
					this.rightImageView.image = value;
					return value;
				}
			},
			selectedBackgroundColor: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewRow#.selectedBackgroundColor" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewRow#.selectedBackgroundColor" is not implemented yet.');
					return value;
				}
			},
			selectedBackgroundImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewRow#.selectedBackgroundImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewRow#.selectedBackgroundImage" is not implemented yet.');
					return value;
				}
			},
			selectedColor: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewRow#.selectedColor" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewRow#.selectedColor" is not implemented yet.');
					return value;
				}
			},
			title: {
				set: function(value) {
					this.titleLabel.text = value;
					return value;
				}
			}
		}

	});

});;
define("Ti/_/UI/Widget", ["Ti/_/declare", "Ti/UI/View"], function(declare, View) {

	// base class for various widgets that will eventually merge with Ti._.UI.Element in 1.9
	return declare("Ti._.UI.Widget", View);

});;
define("Ti/_/UI/FontWidget", ["Ti/_/declare", "Ti/_/style", "Ti/_/dom", "Ti/_/UI/Widget"], function(declare, style, dom, Widget) {
		
	var set = style.set,
		isDef = require.isDef,
		undef;

	return declare("Ti._.UI.FontWidget", Widget, {
		
		constructor: function(args) {
			this._styleableDomNodes = [];
		},
		
		_setFont: function(font,domNode) {
			isDef(font.fontFamily) && set(domNode,"fontFamily",font.fontFamily);
			isDef(font.fontSize) && set(domNode,"fontSize",dom.unitize(font.fontSize));
			isDef(font.fontStyle) && set(domNode,"fontStyle",font.fontStyle);
			isDef(font.fontWeight) && set(domNode,"fontWeight",font.fontWeight);
		},
		
		_addStyleableDomNode: function(styleableDomNode) {
			this._styleableDomNodes.push(styleableDomNode);
		},
		
		_removeStyleableDomNode: function(styleableDomNode) {
			var index = this._styleableDomNodes.indexOf(styleableDomNode);
			index != -1 && this._styleableDomNodes.splice(index,1);
		},
		
		properties: {
			font: {
				set: function(value) {
					for(var domNode in this._styleableDomNodes) {
						this._setFont(value,this._styleableDomNodes[domNode]);
					}
					return value;
				}
			}
		}
	});
	
});;
define("Ti/UI/2DMatrix", ["Ti/_/declare", "Ti/_/Evented", "Ti/Platform", "Ti/UI"], function(declare, Evented, Platform, UI) {

	var isFF = Platform.runtime === "gecko",
		px = function(x) {
			return isFF ? x + "px" : x;
		};

	function detMinor(y, x, m) {
		var x1 = x == 0 ? 1 : 0,
			x2 = x == 2 ? 1 : 2,
			y1 = y == 0 ? 1 : 0,
			y2 = y == 2 ? 1 : 2;
		return (m[y1][x1] * m[y2][x2]) - (m[y1][x2] * m[y2][x1]);
	}

	function mult(obj, a, b, c, d, tx, ty, r) {
		return {
			a: obj.a * a + obj.b * c,
			b: obj.a * b + obj.b * d,
			c: obj.c * a + obj.d * c,
			d: obj.c * b + obj.d * d,
			tx: obj.a * tx + obj.b * ty + obj.tx,
			ty: obj.c * tx + obj.d * ty + obj.ty,
			rotation: obj.rotation + r
		};
	}

	return declare("Ti.UI.2DMatrix", Evented, {

		properties: {
			a: 1,
			b: 0,
			c: 0,
			d: 1,
			tx: 0,
			ty: 0,
			rotation: 0
		},

		constructor: function(matrix) {
			matrix && require.mix(this, matrix);
		},

		invert: function() {
			var x = 0,
				y = 0,
				m = [[this.a, this.b, this.tx], [this.c, this.d, this.ty], [0, 0, 1]],
				n = m,
				det = this.a * detMinor(0, 0, m) - this.b * detMinor(0, 1, m) + this.tx * detMinor(0, 2, m);

			if (Math.abs(det) > 1e-10) {
				det = 1.0 / det;
				for (; y < 3; y++) {
					for (; x < 3; x++) {
						n[y][x] = detMinor(x, y, m) * det;
						(x + y) % 2 == 1 && (n[y][x] = -n[y][x]);
					}
				}
			}

			return new UI["2DMatrix"](mult(this, n[0][0], n[0][1], n[1][0], n[1][1], n[0][2], n[1][2]));
		},

		multiply: function(other) {
			return new UI["2DMatrix"](mult(this, other.a, other.b, other.c, other.d, other.tx, other.ty, other.rotation));
		},

		rotate: function(angle) {
			return new UI["2DMatrix"]({ a: this.a, b: this.b, c: this.c, d: this.d, tx: this.tx, ty: this.ty, rotation: this.rotation + angle });
		},

		scale: function(x, y) {
			return new UI["2DMatrix"](mult(this, x, 0, 0, y, 0, 0));
		},

		translate: function(x, y) {
			return new UI["2DMatrix"](mult(this, 0, 0, 0, 0, x, y));
		},

		toCSS: function() {
			var i = 0,
				v = [this.a, this.b, this.c, this.d, this.tx, this.ty];
	
			for (; i < 6; i++) {
				v[i] = v[i].toFixed(6);
				i > 4 && (v[i] = px(v[i]));
			}

			return "matrix(" + v.join(",") + ") rotate(" + this.rotation + "deg)";
		}

	});

});
;
define("Ti/UI/ActivityIndicator", ["Ti/_/declare", "Ti/_/UI/Element"], function(declare, Element) {

	return declare("Ti.UI.ActivityIndicator", Element, {

		show: function() {
			console.debug('Method "Titanium.UI.ActivityIndicator#.show" is not implemented yet.');
		},

		hide: function() {
			console.debug('Method "Titanium.UI.ActivityIndicator#.hide" is not implemented yet.');
		},
		
		properties: {
			_defaultWidth: "auto",
			_defaultHeight: "auto",
			color: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ActivityIndicator#.color" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ActivityIndicator#.color" is not implemented yet.');
					return value;
				}
			},
			
			font: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ActivityIndicator#.font" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ActivityIndicator#.font" is not implemented yet.');
					return value;
				}
			},
			
			message: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ActivityIndicator#.message" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ActivityIndicator#.message" is not implemented yet.');
					return value;
				}
			},
			
			messageid: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ActivityIndicator#.messageid" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ActivityIndicator#.messageid" is not implemented yet.');
					return value;
				}
			},
			
		}

	});

});;
define("Ti/UI/AlertDialog", ["Ti/_/declare", "Ti/_/Evented"], function(declare, Evented) {

	return declare("Ti.UI.AlertDialog", Evented, {
		show: function() {
			console.debug('Method "Titanium.UI.AlertDialog#.show" is not implemented yet.');
		},

		hide: function() {
			console.debug('Method "Titanium.UI.AlertDialog#.hide" is not implemented yet.');
		},
		
		properties: {
			
			buttonNames: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.AlertDialog#.buttonNames" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.AlertDialog#.buttonNames" is not implemented yet.');
					return value;
				}
			},
			
			cancel: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.AlertDialog#.cancel" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.AlertDialog#.cancel" is not implemented yet.');
					return value;
				}
			},
			
			message: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.AlertDialog#.message" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.AlertDialog#.message" is not implemented yet.');
					return value;
				}
			},
			
			messageid: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.AlertDialog#.messageid" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.AlertDialog#.messageid" is not implemented yet.');
					return value;
				}
			},
			
			ok: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.AlertDialog#.ok" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.AlertDialog#.ok" is not implemented yet.');
					return value;
				}
			},
			
			okid: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.AlertDialog#.okid" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.AlertDialog#.okid" is not implemented yet.');
					return value;
				}
			},
			
			title: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.AlertDialog#.title" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.AlertDialog#.title" is not implemented yet.');
					return value;
				}
			},
			
			titleid: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.AlertDialog#.titleid" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.AlertDialog#.titleid" is not implemented yet.');
					return value;
				}
			}
		}

	});

});
;
define("Ti/UI/Button", ["Ti/_/declare", "Ti/_/UI/FontWidget", "Ti/_/dom", "Ti/_/css", "Ti/_/style"], function(declare, FontWidget, dom, css, style) {
	
	var set = style.set,
		undef;
		
	function arrayContains(array,object) {
		for (var i in array) {
			if (array[i] == object) {
				return true;
			}
		}
		return false;
	}
	
	return declare("Ti.UI.Button", FontWidget, {
		
		constructor: function(args) {
			
			set(this.domNode, "backgroundSize","100% 100%");
			set(this.domNode, "backgroundRepeat","no-repeat");
			
			this.button = dom.create("button", {
				className: css.clean("TiUIButtonButton")
			});
			this.domNode.appendChild(this.button);
			set(this.button,"width","100%");
			set(this.button,"height","100%");
			
			this.contentContainer = dom.create("div", {
				className: css.clean("TiUIButtonContentContainer")
			});
			this.button.appendChild(this.contentContainer)
			set(this.contentContainer, "display", "-webkit-box");
			set(this.contentContainer, "display", "-moz-box");
			set(this.contentContainer, "boxOrient", "horizontal");
			set(this.contentContainer, "boxPack", "center");
			set(this.contentContainer, "boxAlign", "center");
			
			this.buttonImage = dom.create("img", {
				className: css.clean("TiUIButtonImage")
			});
			this.contentContainer.appendChild(this.buttonImage);
			
			this.buttonTitle = dom.create("div", {
				className: css.clean("TiUIButtonTitle")
			});
			this.contentContainer.appendChild(this.buttonTitle);
			this._addStyleableDomNode(this.buttonTitle);
		},

		properties: {
			_defaultWidth: "auto",
			_defaultHeight: "auto",
			backgroundColor: {
				set: function(value) {
					set(this.button,"color",value);
					return value;
				}
			},
			backgroundImage: {
				set: function(value) {
					if (value) {
						set(this.domNode, "backgroundImage", value ? style.url(value) : "");
						if (arrayContains(this.domNode.children, this.button)) {
							this.domNode.removeChild(this.button);
							this.domNode.appendChild(this.contentContainer);
						}
					} else {
						set(this.domNode, "backgroundImage", "");
						if (arrayContains(this.domNode.children, this.contentContainer)) {
							this.domNode.removeChild(this.contentContainer);
							this.domNode.appendChild(this.button);
						}
					}
					return value;
				}
			},
			backgroundLeftCap: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Button#.backgroundLeftCap" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Button#.backgroundLeftCap" is not implemented yet.');
					return value;
				}
			},
			backgroundTopCap: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Button#.backgroundTopCap" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Button#.backgroundTopCap" is not implemented yet.');
					return value;
				}
			},
			color: {
				set: function(value) {
					set(this.buttonTitle,"color",value);
					return value;
				}
			},
			enabled: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Button#.enabled" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Button#.enabled" is not implemented yet.');
					return value;
				},
				value: true
			},
			"font-family": {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Button#.font-family" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Button#.font-family" is not implemented yet.');
					return value;
				}
			},
			image: {
				set: function(value) {
					this.buttonImage.src = value;
					return value;
				}
			},
			selectedColor: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Button#.selectedColor" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Button#.selectedColor" is not implemented yet.');
					return value;
				}
			},
			style: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Button#.style" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Button#.style" is not implemented yet.');
					return value;
				}
			},
			title: {
				set: function(value) {
					this.buttonTitle.innerHTML = value;
					return value;
				}
			},
			titleid: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Button#.titleid" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Button#.titleid" is not implemented yet.');
					return value;
				}
			},
			touchEnabled: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Button#.touchEnabled" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Button#.touchEnabled" is not implemented yet.');
					return value;
				},
				value: true
			}
		}

	});

});;
define("Ti/UI/ImageView", 
	["Ti/_/declare", "Ti/_/UI/Widget", "Ti/_/dom", "Ti/_/css", "Ti/_/style", "Ti/_/lang"], 
	function(declare, Widget, dom, css, style, lang) {
		
	var set = style.set;

	return declare("Ti.UI.ImageView", Widget, {
		
		constructor: function() {
			
			var container = dom.create("div", {
				className: css.clean("TiUIImageViewAligner")
			});
			set(container, "width", "100%");
			set(container, "height", "100%");
			set(container, "display", "-webkit-box");
			set(container, "display", "-moz-box");
			set(container, "boxOrient", "horizontal");
			set(container, "boxPack", "center");
			set(container, "boxAlign", "center");
			this.domNode.appendChild(container);
			
			this.imageDisplay = dom.create("img", {
				className: css.clean("TiUIImageViewDisplay")
			});
			container.appendChild(this.imageDisplay);
			set(this.imageDisplay, "width", "100%");
			set(this.imageDisplay, "height", "100%");
		},
		
		pause: function(){
			console.debug('Method "Titanium.UI.ImageView#.pause" is not implemented yet.');
		},
		start: function(){
			console.debug('Method "Titanium.UI.ImageView#.start" is not implemented yet.');
		},
		stop: function(){
			console.debug('Method "Titanium.UI.ImageView#.stop" is not implemented yet.');
		},
		toBlob: function(){
			console.debug('Method "Titanium.UI.ImageView#.toBlob" is not implemented yet.');
		},
		
		doLayout: function() {
			Widget.prototype.doLayout.apply(this);
			setTimeout(lang.hitch(this, function(){
				if (this.canScale) {
					var controlRatio = this.domNode.clientWidth / this.domNode.clientHeight,
						imageRatio = this.imageDisplay.width / this.imageDisplay.height;
					if (controlRatio > imageRatio) {
						set(this.imageDisplay,"width","auto");
						set(this.imageDisplay,"height","100%");
					} else {
						set(this.imageDisplay,"width","100%");
						set(this.imageDisplay,"height","auto");
					}
				} else {
					set(this.imageDisplay,"width","auto");
					set(this.imageDisplay,"height","auto");
				}
			}),0);
		},

		properties: {
			_defaultWidth: "auto",
			_defaultHeight: "auto",
			animating: false,
			canScale: {
				set: function(value, oldValue){
					if (value !== oldValue) {
						this.doFullLayout();
					}
					return value;
				},
				value: true
			},
			defaultImage: null,
			duration: 0,
			image: {
				set: function(value) {
					this.defaultImage && (this.imageDisplay.src = value);
					var tempImage = new Image();
					require.on(tempImage, "load", lang.hitch(this, function () {
						this.imageDisplay.src = value;
						
						// Force a layout to take the image size into account
						this.doFullLayout();
					}));
					tempImage.src = value;
					return value;
				}
			},
			images: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ImageView#.images" is not implemented yet.');
					return value;
				},
				set: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ImageView#.images" is not implemented yet.');
					return value;
				}
			},
			paused: false,
			preventDefaultImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ImageView#.preventDefaultImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ImageView#.preventDefaultImage" is not implemented yet.');
					return value;
				}
			},
			repeatCount: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ImageView#.repeatCount" is not implemented yet.');
					return value;
				},
				set: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ImageView#.repeatCount" is not implemented yet.');
					return value;
				}
			},
			reverse: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ImageView#.reverse" is not implemented yet.');
					return value;
				},
				set: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ImageView#.reverse" is not implemented yet.');
					return value;
				}
			}
		}

	});

});;
define("Ti/UI/Label", ["Ti/_/declare", "Ti/_/UI/FontWidget", "Ti/_/dom", "Ti/_/css", "Ti/_/style"], function(declare, FontWidget, dom, css, style) {

	var set = style.set,
		undef;

	return declare("Ti.UI.Label", FontWidget, {
		
		constructor: function() {
			
			// Create the aligner div. This sets up a flexbox to float the text to the middle
			this.textAlignerDiv = dom.create("div", {
				className: css.clean("TiUILabelTextAligner")
			});
			this.domNode.appendChild(this.textAlignerDiv);
			set(this.textAlignerDiv, "display", "-webkit-box");
			set(this.textAlignerDiv, "display", "-moz-box");
			set(this.textAlignerDiv, "boxOrient", "vertical");
			set(this.textAlignerDiv, "boxPack", "center");
			set(this.textAlignerDiv, "width", "100%");
			set(this.textAlignerDiv, "height", "100%");
			set(this.textAlignerDiv,"overflow","hidden");
			
			// Create the container div. This gets floated by the flexbox
			this.textContainerDiv = dom.create("div", {
				className: css.clean("TiUILabelTextContainer")
			});
			this.textAlignerDiv.appendChild(this.textContainerDiv);
			set(this.textContainerDiv,"userSelect","none");
			this._addStyleableDomNode(this.textContainerDiv);
		},

		toImage: function(callback) {
			// TODO
		},
		
		properties: {
			_defaultWidth: "auto",
			_defaultHeight: "auto",
			color: {
				set: function(value) {
					this.textContainerDiv.style.color = value;
					return value;
				}
			},
			highlightedColor: undef,
			shadowColor: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Label#.shadowColor" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Label#.shadowColor" is not implemented yet.');
					return value;
				}
			},
			shadowOffset: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Label#.shadowOffset" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Label#.shadowOffset" is not implemented yet.');
					return value;
				}
			},
			text: {
				set: function(value) {
					this.textContainerDiv.innerHTML = value;
					return value;
				}
			},
			textAlign: {
				set: function(value) {
					this.textContainerDiv.style.textAlign = value;
					return value;
				}
			},
			textid: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Label#.textid" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Label#.textid" is not implemented yet.');
					return value;
				}
			},
			wordWrap: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Label#.wordWrap" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Label#.wordWrap" is not implemented yet.');
					return value;
				},
				value: false
			}
		}

	});

});;
define("Ti/UI/ScrollableView", 
	["Ti/_/declare", "Ti/_/UI/Widget", "Ti/_/lang", "Ti/_/dom", "Ti/_/css", "Ti/_/style"], 
	function(declare, Widget, lang, dom, css, style) {

	var set = style.set,
		is = require.is,
		isDef = require.isDef,
		unitize = dom.unitize,
		undef;

	return declare("Ti.UI.ScrollableView", Widget, {
		
		constructor: function(args){
			
			this._setContent();
			
			// State variables
			this._viewToRemoveAfterScroll = -1;
			this._interval = null
			this._currentPage = 0;
		},
		
		addView: function(view){
			// Sanity check
			if (view) {
				this.views.push(view);
	
				// Check if any children have been added yet, and if not load this view
				this.views.length == 1 && this.scrollToView(0);
			}
		},
		
		removeView: function(view) {
			
			// Get and validate the location of the view
			var viewIndex = is(view,"Number") ? view : this.views.indexOf(view);
			if (viewIndex < 0 || viewIndex >= this.views.length) {
				return;
			}
	
			// Update the view if this view was currently visible
			if (viewIndex == this.currentPage) {
				if (this.views.length == 1) {
					this._setContent();
					this._removeViewFromList(viewIndex);
				} else {
					this._viewToRemoveAfterScroll = viewIndex;
				    this.scrollToView(viewIndex == this.views.length - 1 ? --viewIndex : ++viewIndex);
				}
			} else {
				this._removeViewFromList(viewIndex);
			}
		},
		
		_removeViewFromList: function(viewIndex) {
			// Remove the view
			this.views.splice(viewIndex,1);
	
			// Update the current view if necessary
			if (viewIndex < this.currentPage){
				this.currentPage--;
			}
		},
		
		_setContent: function(view) {
			
			// Remove and garbage collect the old container
			this.container && this.remove(this.container);
			this.container = null;
			
			// Create the new container
			this.container = Ti.UI.createView({
				left: 0,
				top: 0,
				width: "100%",
				height: "100%"
			});
			set(this.container.domNode,"overflow","hidden");
			this.add(this.container);
			
			// Add the view to the container
			view && this.container.add(view);
		},
		
		scrollToView: function(view) {
			var viewIndex = is(view,"Number") ? view : this.views.indexOf(view)
			
			// Sanity check
			if (viewIndex < 0 || viewIndex >= this.views.length || viewIndex == this.currentPage) {
				return;
			}
	
			// If the scrollableView hasn't been laid out yet, we can't do much since the scroll distance is unknown.
			// At the same time, it doesn't matter since the user won't see it anyways. So we just append the new
			// element and don't show the transition animation.
			if (!this.container.domNode.offsetWidth) {
				this._setContent(this.views[viewIndex]);
			} else {
				// Stop the previous timer if it is running (i.e. we are in the middle of an animation)
				this._interval && clearInterval(this._interval);
	
				// Calculate the views to be scrolled
				var width = this.container.domNode.offsetWidth,
					viewsToScroll = [],
					scrollingDirection = -1,
					initialPosition = 0;
				if (viewIndex > this.currentPage) {
					for (var i = this.currentPage; i <= viewIndex; i++) {
						viewsToScroll.push(this.views[i]);
					}
				} else {
					for (var i = viewIndex; i <= this.currentPage; i++) {
						viewsToScroll.push(this.views[i]);
					}
					initialPosition = -(viewsToScroll.length - 1) * width;
					scrollingDirection = 1;
				}
	
				// Create the animation div
				var animationView = Ti.UI.createView({
					width: unitize(viewsToScroll.length * width),
					height: "100%",
					layout: "absolute"
				});
	
				// Attach the child views, each contained in their own div so we can mess with positioning w/o touching the views
				for (var i = 0; i < viewsToScroll.length; i++) {
					var viewContainer = Ti.UI.createView({
						left: unitize(i * width),
						top: 0,
						width: unitize(width),
						height: "100%",
						layout: "horizontal" // Do a horizontal to force the child to (0,0) without overwriting the original position values
					});
					set(viewContainer.domNode,"overflow","hidden");
					viewContainer.add(viewsToScroll[i]);
					animationView.add(viewContainer);
				}
				
				// Set the initial position
				animationView.left = unitize(initialPosition);
				this._setContent(animationView);
	
				// Set the start time
				var duration = 300 + 0.2 * width, // Calculate a weighted duration so that larger views take longer to scroll.
					distance = (viewsToScroll.length - 1) * width;
					
				animationView.animate({
					duration: 300 + 0.2 * width, // Calculate a weighted duration so that larger views take longer to scroll.
					left: initialPosition + scrollingDirection * (viewsToScroll.length - 1) * width,
					curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
				},lang.hitch(this,function(){
					clearInterval(this._interval);
					this._interval = null;
					this._setContent(this.views[viewIndex]);
					this._currentPage = viewIndex;
					if (this._viewToRemoveAfterScroll != -1) {
						this._removeViewFromList(this._viewToRemoveAfterScroll);
						this._viewToRemoveAfterScroll = -1;
					}
				}));
			}
		},

		properties: {
			_defaultWidth: "100%",
			_defaultHeight: "100%",
			currentPage: {
				get: function() {
					return this._currentPage;
				},
				set: function(value) {
					if (value >= 0 && value < this.views.length) {
						this.scrollToView(value);
					}
					this._currentPage = value;
					return value;
				}
			},
			pagingControlColor: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollableView#.pagingControlColor" is not implemented yet.');
					return value;
				},
				set: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollableView#.pagingControlColor" is not implemented yet.');
					return value;
				}
			},
			pagingControlHeight: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollableView#.pagingControlHeight" is not implemented yet.');
					return value;
				},
				set: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollableView#.pagingControlHeight" is not implemented yet.');
					return value;
				}
			},
			pagingControlTimeout: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollableView#.pagingControlTimeout" is not implemented yet.');
					return value;
				},
				set: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollableView#.pagingControlTimeout" is not implemented yet.');
					return value;
				}
			},
			showPagingControl: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollableView#.showPagingControl" is not implemented yet.');
					return value;
				},
				set: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollableView#.showPagingControl" is not implemented yet.');
					return value;
				}
			},
			views: {
				set: function(value, oldValue) {
					// Value must be an array
					if (!is(value,"Array")) {
						return;
					}
					oldValue.length == 0 && value.length > 0 && this._setContent(value[0]);
					return value;
				},
				value: []
			}
		}

	});

});;
define("Ti/UI/ScrollView", ["Ti/_/declare", "Ti/_/UI/Widget"], function(declare, Widget) {

	return declare("Ti.UI.ScrollView", Widget, {
		
		scrollTo: function(x,y) {
			console.debug('Method "Titanium.UI.ScrollView#.scrollTo" is not implemented yet.');
		},

		properties: {
			_defaultWidth: "100%",
			_defaultHeight: "100%",
			canCancelEvents: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollView#.canCancelEvents" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ScrollView#.canCancelEvents" is not implemented yet.');
					return value;
				}
			},
			
			contentHeight: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollView#.contentHeight" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ScrollView#.contentHeight" is not implemented yet.');
					return value;
				}
			},
			
			contentOffset: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollView#.contentOffset" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ScrollView#.contentOffset" is not implemented yet.');
					return value;
				}
			},
			
			contentWidth: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollView#.contentWidth" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ScrollView#.contentWidth" is not implemented yet.');
					return value;
				}
			},
			
			scrollType: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollView#.scrollType" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ScrollView#.scrollType" is not implemented yet.');
					return value;
				}
			},
			
			showHorizontalScrollIndicator: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollView#.showHorizontalScrollIndicator" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ScrollView#.showHorizontalScrollIndicator" is not implemented yet.');
					return value;
				}
			},
			
			showVerticalScrollIndicator: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.ScrollView#.showVerticalScrollIndicator" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.ScrollView#.showVerticalScrollIndicator" is not implemented yet.');
					return value;
				}
			}
		}

	});

});;
define("Ti/UI/Slider", ["Ti/_/declare", "Ti/_/UI/Widget"], function(declare, Widget) {

	return declare("Ti.UI.Slider", Widget, {

		properties: {
			_defaultWidth: "100%",
			_defaultHeight: "auto",
			disabledLeftTrackImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.disabledLeftTrackImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.disabledLeftTrackImage" is not implemented yet.');
					return value;
				}
			},
			
			disabledRightTrackImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.disabledRightTrackImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.disabledRightTrackImage" is not implemented yet.');
					return value;
				}
			},
			
			disabledThumbImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.disabledThumbImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.disabledThumbImage" is not implemented yet.');
					return value;
				}
			},
			
			highlightedLeftTrackImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.highlightedLeftTrackImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.highlightedLeftTrackImage" is not implemented yet.');
					return value;
				}
			},
			
			highlightedRightTrackImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.highlightedRightTrackImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.highlightedRightTrackImage" is not implemented yet.');
					return value;
				}
			},
			
			highlightedThumbImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.highlightedThumbImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.highlightedThumbImage" is not implemented yet.');
					return value;
				}
			},
			
			leftTrackImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.leftTrackImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.leftTrackImage" is not implemented yet.');
					return value;
				}
			},
			
			max: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.max" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.max" is not implemented yet.');
					return value;
				}
			},
			
			min: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.min" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.min" is not implemented yet.');
					return value;
				}
			},
			
			rightTrackImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.rightTrackImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.rightTrackImage" is not implemented yet.');
					return value;
				}
			},
			
			selectedLeftTrackImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.selectedLeftTrackImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.selectedLeftTrackImage" is not implemented yet.');
					return value;
				}
			},
			
			selectedRightTrackImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.selectedRightTrackImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.selectedRightTrackImage" is not implemented yet.');
					return value;
				}
			},
			
			selectedThumbImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.selectedThumbImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.selectedThumbImage" is not implemented yet.');
					return value;
				}
			},
			
			thumbImage: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.thumbImage" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.thumbImage" is not implemented yet.');
					return value;
				}
			},
			
			value: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Slider#.value" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Slider#.value" is not implemented yet.');
					return value;
				}
			}
		}

	});

});;
define("Ti/UI/Switch", ["Ti/_/declare", "Ti/_/UI/Widget"], function(declare, Widget) {

	return declare("Ti.UI.Switch", Widget, {

		properties: {
			_defaultWidth: "auto",
            _defaultHeight: "auto",
            
            title: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Switch#.title" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Switch#.title" is not implemented yet.');
					return value;
				}
			},
			
            titleOff: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Switch#.titleOff" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Switch#.titleOff" is not implemented yet.');
					return value;
				}
			},
			
            titleOn: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Switch#.titleOn" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Switch#.titleOn" is not implemented yet.');
					return value;
				}
			},
			
            value: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Switch#.value" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Switch#.value" is not implemented yet.');
					return value;
				}
			}
		}

	});

});;
define("Ti/UI/TableView", ["Ti/_/declare", "Ti/UI/View", "Ti/_/dom", "Ti/_/css", "Ti/_/style"], function(declare, View, dom, css, style) {

	var set = style.set,
		is = require.is,
		isDef = require.isDef,
		undef;

	return declare("Ti.UI.TableView", View, {
		
		constructor: function(args) {
			
			// Create the parts out of Ti controls so we can make use of the layout system
			this.layout = 'vertical';
			set(this.domNode,"overflow-x","hidden");
			set(this.domNode,"overflow-y","auto");
			
			// Use horizontal layouts so that the default location is always (0,0)
			this.header = Ti.UI.createView({height: 'auto', layout: 'horizontal'});
			this.rows = Ti.UI.createView({height: 'auto', layout: 'vertical'});
			this.footer = Ti.UI.createView({height: 'auto', layout: 'horizontal'});
			
			this.add(this.header);
			this.add(this.rows);
			this.add(this.footer);
		},

		appendRow: function(row, properties) {
			console.debug('Property "Titanium.UI.TableView#.appendRow" is not implemented yet.');
		},
		deleteRow: function(row, properties) {
			console.debug('Property "Titanium.UI.TableView#.deleteRow" is not implemented yet.');
		},
		insertRowAfter: function(index, row, properties) {
			console.debug('Property "Titanium.UI.TableView#.insertRowAfter" is not implemented yet.');
		},
		insertRowBefore: function(index, row, properties) {
			console.debug('Property "Titanium.UI.TableView#.insertRowBefore" is not implemented yet.');
		},
		updateRow: function(row, properties) {
			console.debug('Property "Titanium.UI.TableView#.updateRow" is not implemented yet.');
		},
		
		doLayout: function() {
			
			// Update the row height info
			for (var i in this.data) {
				var row = this.data[i];
				if (isDef(row.declaredClass) && row.declaredClass == "Ti.UI.TableViewRow") {
					row._defaultHeight = this.rowHeight;
					set(row.domNode,'minHeight',this.minRowHeight);
					set(row.domNode,'maxHeight',this.maxRowHeight);
				}
			}
			
			View.prototype.doLayout.apply(this,arguments);
			
			// TODO HACK: Not sure why this is necessary, but it works. Might indicate a bug in layouts.
			set(this.rows.domNode,"position","absolute");
		},
		
		properties: {
			_defaultWidth: "100%",
			_defaultHeight: "100%",
			data: {
				set: function(value,oldValue) {
					if (is(value,'Array')) {
						
						// Remove the old children
						for(var i in oldValue) {
							this.remove(oldValue[i]);
						}
						
						// Convert any object literals to TableViewRow instances, and update TableViewRow instances with row info
						for (var i in value) {
							if (!isDef(value[i].declaredClass) || value[i].declaredClass != "Ti.UI.TableViewRow") {
								value[i] = Ti.UI.createTableViewRow(value[i]);
							}
						}
						
						// Add the new children
						for (var i in value) {
							this.rows.add(value[i]);
							this.rows.add(Ti.UI.createView({height: "1px", width: "100%", backgroundColor: this.separatorColor}));
						}
						
						// Relayout the screen
						this.doFullLayout();
						
						return value;
					} else {
						// Data must be an array
						return;
					}
				}
			},
			footerTitle: {
				set: function(value, oldValue) {
					if (oldValue != value) {
						this.footerTitleControl && this.footer.remove(this.footerTitleControl);
						this.footerTitleControl = Ti.UI.createLabel({text: value});
						this.footer.add(this.footerTitleControl);
						this.doFullLayout();
					}
					return value;
				}
			},
			footerView: {
				set: function(value, oldValue) {
					if (oldValue != value) {
						this.footerTitleControl && this.footer.remove(this.footerTitleControl);
						this.footerTitleControl = value;
						this.footer.add(this.footerTitleControl);
						this.doFullLayout();
					}
					return value;
				}
			},
			headerTitle: {
				set: function(value, oldValue) {
					if (oldValue != value) {
						this.headerTitleControl && this.header.remove(this.headerTitleControl);
						this.headerTitleControl = Ti.UI.createLabel({text: value});
						this.header.add(this.headerTitleControl);
						this.doFullLayout();
					}
					return value;
				}
			},
			headerView: {
				set: function(value, oldValue) {
					if (oldValue != value) {
						this.headerTitleControl && this.header.remove(this.headerTitleControl);
						this.headerTitleControl = value;
						this.header.add(this.headerTitleControl);
						this.doFullLayout();
					}
					return value;
				}
			},
			maxRowHeight: "100%",
			minRowHeight: "0%",
			rowHeight: "50px",
			separatorColor: {
				set: function(value) {
					console.debug('Property "Titanium.UI.TableView#.separatorColor" is not implemented yet.');
					return value;
				},
				value: "lightGrey"
			},
			separatorStyle: {
				set: function(value) {
					console.debug('Property "Titanium.UI.TableView#.separatorStyle" is not implemented yet.');
					return value;
				}
			}
		}

	});

});;
define("Ti/UI/TableViewSection", ["Ti/_/declare", "Ti/_/UI/Widget"], function(declare, Widget) {

	return declare("Ti.UI.TableViewSection", Widget, {

		properties: {
			_defaultHeight: "auto",
			_defaultWidth: "auto",
			footerTitle: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewSection#.footerTitle" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewSection#.footerTitle" is not implemented yet.');
					return value;
				}
			},
			
			footerView: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewSection#.footerView" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewSection#.footerView" is not implemented yet.');
					return value;
				}
			},
			
			headerTitle: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewSection#.headerTitle" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewSection#.headerTitle" is not implemented yet.');
					return value;
				}
			},
			
			headerView: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewSection#.headerView" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewSection#.headerView" is not implemented yet.');
					return value;
				}
			},
			
			rowCount: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TableViewSection#.rowCount" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TableViewSection#.rowCount" is not implemented yet.');
					return value;
				}
			}
		}

	});

});;
define("Ti/UI/TextArea", ["Ti/_/declare", "Ti/_/UI/FontWidget", "Ti/_/dom", "Ti/_/css", "Ti/_/style"], function(declare, FontWidget, dom, css, style) {

    var set = style.set,
        undef;

	return declare("Ti.UI.TextArea", FontWidget, {

		constructor: function(args) {
			this.textArea = dom.create("textarea", {
				className: css.clean("TiUITextAreaTextArea")
			});
			this.domNode.appendChild(this.textArea);
			this._addStyleableDomNode(this.textArea);
			set(this.textArea,"resize","none");
			set(this.textArea,"backgroundColor","transparent");
			set(this.textArea,"borderStyle","none");
			set(this.textArea,"width","100%");
			set(this.textArea,"height","100%");
		},
		
		blur: function() {
			console.debug('Method "Titanium.UI.TextArea#.blur" is not implemented yet.');
		},
		
		focus: function() {
			console.debug('Method "Titanium.UI.TextArea#.focus" is not implemented yet.');
		},
		
		hasText: function() {
			console.debug('Method "Titanium.UI.TextArea#.hasText" is not implemented yet.');
		},

		properties: {
            _defaultWidth: "auto",
            _defaultHeight: "auto",
            
			hintText: {
				set: function(value) {
					this.textArea.placeholder = value;
					return value;
				}
			},
			
			value: {
				set: function(value) {
					this.textArea.value = value;
					return value;
				}
			},
			
			editable: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TextArea#.editable" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TextArea#.editable" is not implemented yet.');
					return value;
				}
			},
			
			textAlign: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TextArea#.textAlign" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TextArea#.textAlign" is not implemented yet.');
					return value;
				}
			},
			
		}
	});

});
;
define("Ti/UI/TextField", ["Ti/_/declare", "Ti/_/UI/FontWidget", "Ti/_/dom", "Ti/_/css", "Ti/_/style"], function(declare, FontWidget, dom, css, style) {

	var set = style.set,
        undef;

	return declare("Ti.UI.TextField", FontWidget, {

		constructor: function(args) {
			this.textField = dom.create("input", {
				className: css.clean("TiUITextFieldField"),
			});
			this.domNode.appendChild(this.textField);
			this._addStyleableDomNode(this.textField);
			set(this.textField,"backgroundColor","transparent");
			set(this.textField,"borderStyle","none");
			set(this.textField,"width","100%");
			set(this.textField,"height","100%");
		},
		
		blur: function() {
			console.debug('Method "Titanium.UI.TextArea#.blur" is not implemented yet.');
		},
		
		focus: function() {
			console.debug('Method "Titanium.UI.TextArea#.focus" is not implemented yet.');
		},
		
		hasText: function() {
			console.debug('Method "Titanium.UI.TextArea#.hasText" is not implemented yet.');
		},

		properties: {
            _defaultWidth: "auto",
            _defaultHeight: "auto",
            
			hintText: {
				set: function(value) {
					this.textField.placeholder = value;
					return value;
				}
			},
			
			value: {
				set: function(value) {
					this.textField.value = value;
					return value;
				}
			},
			
			editable: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TextField#.editable" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TextField#.editable" is not implemented yet.');
					return value;
				}
			},
			
			paddingLeft: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TextField#.paddingLeft" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TextField#.paddingLeft" is not implemented yet.');
					return value;
				}
			},
			
			paddingRight: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TextField#.paddingRight" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TextField#.paddingRight" is not implemented yet.');
					return value;
				}
			},
			
			passwordMask: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TextField#.passwordMask" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TextField#.passwordMask" is not implemented yet.');
					return value;
				}
			},
			
			textAlign: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TextField#.textAlign" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TextField#.textAlign" is not implemented yet.');
					return value;
				}
			},
			
			verticalAlign: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TextField#.verticalAlign" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TextField#.verticalAlign" is not implemented yet.');
					return value;
				}
			}
		}

	});

});
;
define("Ti/UI/WebView", ["Ti/_/declare", "Ti/_/UI/Widget"], function(declare, Widget) {

	return declare("Ti.UI.WebView", Widget, {
		
		canGoBack: function(x,y) {
			console.debug('Method "Titanium.UI.WebView#.canGoBack" is not implemented yet.');
		},
		
		canGoForward: function(x,y) {
			console.debug('Method "Titanium.UI.WebView#.canGoForward" is not implemented yet.');
		},
		
		evalJS: function(x,y) {
			console.debug('Method "Titanium.UI.WebView#.evalJS" is not implemented yet.');
		},
		
		goBack: function(x,y) {
			console.debug('Method "Titanium.UI.WebView#.goBack" is not implemented yet.');
		},
		
		goForward: function(x,y) {
			console.debug('Method "Titanium.UI.WebView#.goForward" is not implemented yet.');
		},
		
		reload: function(x,y) {
			console.debug('Method "Titanium.UI.WebView#.reload" is not implemented yet.');
		},
		
		repaint: function(x,y) {
			console.debug('Method "Titanium.UI.WebView#.repaint" is not implemented yet.');
		},
		
		stopLoading: function(x,y) {
			console.debug('Method "Titanium.UI.WebView#.stopLoading" is not implemented yet.');
		},
		
		properties: {
			_defaultWidth: "100%",
			_defaultHeight: "100%",
			data: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.WebView#.data" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.WebView#.data" is not implemented yet.');
					return value;
				}
			},
			
			html: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.WebView#.html" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.WebView#.html" is not implemented yet.');
					return value;
				}
			},
			
			loading: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.WebView#.loading" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.WebView#.loading" is not implemented yet.');
					return value;
				}
			},
			
			url: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.WebView#.url" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.WebView#.url" is not implemented yet.');
					return value;
				}
			}
		}

	});

});;
define("Ti/Utils", ["Ti/_/Evented"], function(Evented) {

	(function(api){
		// Interfaces
		Ti._5.EventDriven(api);
		
		// private property
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		// private method for UTF-8 encoding
		function _utf8_encode (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
	
			for (var n = 0; n < string.length; n++) {
	
				var c = string.charCodeAt(n);
	
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	
			}
	
			return utftext;
		};
		// private method for UTF-8 decoding
		function _utf8_decode (utftext) {
		   var string = "";
		   var i = 0;
		   var c = c1 = c2 = 0;
	
		   while ( i < utftext.length ) {
	
			   c = utftext.charCodeAt(i);
	
			   if (c < 128) {
				   string += String.fromCharCode(c);
				   i++;
			   }
			   else if((c > 191) && (c < 224)) {
				   c2 = utftext.charCodeAt(i+1);
				   string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				   i += 2;
			   }
			   else {
				   c2 = utftext.charCodeAt(i+1);
				   c3 = utftext.charCodeAt(i+2);
				   string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				   i += 3;
			   }
	
		   }
	
			return string;
		};
		
		// Methods
		api.base64decode = function(input){
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
	
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
			while (i < input.length) {
	
				enc1 = _keyStr.indexOf(input.charAt(i++));
				enc2 = _keyStr.indexOf(input.charAt(i++));
				enc3 = _keyStr.indexOf(input.charAt(i++));
				enc4 = _keyStr.indexOf(input.charAt(i++));
	
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
	
				output = output + String.fromCharCode(chr1);
	
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
	
			}
	
			output = _utf8_decode(output);
	
			return output;
		};
		api.base64encode = function(input){
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
	
			input = _utf8_encode(input);
	
			while (i < input.length) {
	
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
	
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
	
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
	
				output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
	
			}
	
			return output;
		};
		api.md5HexDigest = function(input){
			// +   original by: javascript.ru (http://www.javascript.ru/)
	
			var RotateLeft = function(lValue, iShiftBits) {
					return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
				};
		 
			var AddUnsigned = function(lX,lY) {
					var lX4,lY4,lX8,lY8,lResult;
					lX8 = (lX & 0x80000000);
					lY8 = (lY & 0x80000000);
					lX4 = (lX & 0x40000000);
					lY4 = (lY & 0x40000000);
					lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
					if (lX4 & lY4) {
						return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
					}
					if (lX4 | lY4) {
						if (lResult & 0x40000000) {
							return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
						} else {
							return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
						}
					} else {
						return (lResult ^ lX8 ^ lY8);
					}
				};
		 
			var F = function(x,y,z) { return (x & y) | ((~x) & z); };
			var G = function(x,y,z) { return (x & z) | (y & (~z)); };
			var H = function(x,y,z) { return (x ^ y ^ z); };
			var I = function(x,y,z) { return (y ^ (x | (~z))); };
		 
			var FF = function(a,b,c,d,x,s,ac) {
					a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
					return AddUnsigned(RotateLeft(a, s), b);
				};
		 
			var GG = function(a,b,c,d,x,s,ac) {
					a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
					return AddUnsigned(RotateLeft(a, s), b);
				};
		 
			var HH = function(a,b,c,d,x,s,ac) {
					a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
					return AddUnsigned(RotateLeft(a, s), b);
				};
		 
			var II = function(a,b,c,d,x,s,ac) {
					a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
					return AddUnsigned(RotateLeft(a, s), b);
				};
		 
			var ConvertToWordArray = function(str) {
					var lWordCount;
					var lMessageLength = str.length;
					var lNumberOfWords_temp1=lMessageLength + 8;
					var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
					var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
					var lWordArray=Array(lNumberOfWords-1);
					var lBytePosition = 0;
					var lByteCount = 0;
					while ( lByteCount < lMessageLength ) {
						lWordCount = (lByteCount-(lByteCount % 4))/4;
						lBytePosition = (lByteCount % 4)*8;
						lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
						lByteCount++;
					}
					lWordCount = (lByteCount-(lByteCount % 4))/4;
					lBytePosition = (lByteCount % 4)*8;
					lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
					lWordArray[lNumberOfWords-2] = lMessageLength<<3;
					lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
					return lWordArray;
				};
		 
			var WordToHex = function(lValue) {
					var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
					for (lCount = 0;lCount<=3;lCount++) {
						lByte = (lValue>>>(lCount*8)) & 255;
						WordToHexValue_temp = "0" + lByte.toString(16);
						WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
					}
					return WordToHexValue;
				};
		 
			var x=Array();
			var k,AA,BB,CC,DD,a,b,c,d;
			var S11=7, S12=12, S13=17, S14=22;
			var S21=5, S22=9 , S23=14, S24=20;
			var S31=4, S32=11, S33=16, S34=23;
			var S41=6, S42=10, S43=15, S44=21;
		 
			str = _utf8_encode(input);
			x = ConvertToWordArray(str);
			a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
		 
			for (k=0;k<x.length;k+=16) {
				AA=a; BB=b; CC=c; DD=d;
				a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
				d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
				c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
				b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
				a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
				d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
				c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
				b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
				a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
				d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
				c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
				b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
				a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
				d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
				c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
				b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
				a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
				d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
				c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
				b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
				a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
				d=GG(d,a,b,c,x[k+10],S22,0x2441453);
				c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
				b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
				a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
				d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
				c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
				b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
				a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
				d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
				c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
				b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
				a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
				d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
				c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
				b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
				a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
				d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
				c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
				b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
				a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
				d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
				c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
				b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
				a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
				d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
				c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
				b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
				a=II(a,b,c,d,x[k+0], S41,0xF4292244);
				d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
				c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
				b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
				a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
				d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
				c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
				b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
				a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
				d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
				c=II(c,d,a,b,x[k+6], S43,0xA3014314);
				b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
				a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
				d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
				c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
				b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
				a=AddUnsigned(a,AA);
				b=AddUnsigned(b,BB);
				c=AddUnsigned(c,CC);
				d=AddUnsigned(d,DD);
			}
		 
			var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
		 
			return temp.toLowerCase();
	
		};
	})(Ti._5.createClass('Ti.Utils'));

});;
define("Ti/_/UI/SuperView", ["Ti/_/declare", "Ti/_/dom", "Ti/UI", "Ti/UI/View"], function(declare, dom, UI, View) {
	
	var container = UI._init(),
		windows = [],
		activeWindow;

	require.on(window, "popstate", function(evt) {
		var win;
		evt && evt.state && evt.state.screenIndex !== null && (win = windows[evt.state.windowIdx]) && win.open({ isBack:1 });
	});

	require.on(window, "resize", function() {
		container.doLayout();
	});

	return declare("Ti._.UI.SuperView", View, {

		_windowIdx: null,
		_opened: 0,

		constructor: function() {
			this._windowIdx = windows.length;
			windows.push(this);
		},

		destroy: function() {
			windows[this._windowIdx] = null;
			View.prototype.destroy.apply(this, arguments);
		},

		open: function(args) {
			if (!this._opened) {
				// TODO: if args, then do animation on open
				this._opened = 1;
				this.show();
				container.add(this);
				(args && args.isBack) || window.history.pushState({ windowIdx: this._windowIdx }, "", "");
				container.doLayout();
			}
			activeWindow = this;
		},

		close: function(args) {
			if (this._opened) {
				// TODO: if args, then do animation on close
				this._opened = 0;
				container.remove(this);
				window.history.go(-1);
				container.doLayout();
				this.fireEvent("blur", { source: this.domNode });
			}
		},

		setWindowTitle: function(title) {
			activeWindow === this && (document.title = title || require.config.project.name);
			return title;
		}

	});

});;
define("Ti/UI/Tab", ["Ti/_/declare", "Ti/_/UI/SuperView"], function(declare, SuperView) {

	var undef;

	return declare("Ti.UI.Tab", SuperView, {

		properties: {
			_defaultWidth: "100%",
			_defaultHeight: "100%",
			active: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Tab#.active" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Tab#.active" is not implemented yet.');
					return value;
				}
			},
			
			icon: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Tab#.icon" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Tab#.icon" is not implemented yet.');
					return value;
				}
			},
			
			title: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Tab#.title" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Tab#.title" is not implemented yet.');
					return value;
				}
			},
			
			titleid: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Tab#.titleid" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Tab#.titleid" is not implemented yet.');
					return value;
				}
			},
			
			"window": {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Tab#.window" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Tab#.window" is not implemented yet.');
					return value;
				}
			}
		}

	});

});
;
define("Ti/UI/TabGroup", ["Ti/_/declare", "Ti/_/UI/SuperView"], function(declare, SuperView) {

	return declare("Ti.UI.TabGroup", SuperView, {

		addTab: function(x,y) {
			console.debug('Method "Titanium.UI.TabGroup#.addTab" is not implemented yet.');
		},
		
		removeTab: function(x,y) {
			console.debug('Method "Titanium.UI.TabGroup#.removeTab" is not implemented yet.');
		},

		properties: {
			_defaultWidth: "100%",
			_defaultHeight: "100%",
			activeTab: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TabGroup#.activeTab" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TabGroup#.activeTab" is not implemented yet.');
					return value;
				}
			},
			
			tabs: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.TabGroup#.tabs" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.TabGroup#.tabs" is not implemented yet.');
					return value;
				}
			}
			
		}

	});

});
;
define("Ti/UI/Window", ["Ti/_/declare", "Ti/Gesture", "Ti/_/UI/SuperView", "Ti/UI"], function(declare, Gesture, SuperView, UI) {

	var undef;

	return declare("Ti.UI.Window", SuperView, {

		properties: {
			orientation: {
				get: function() {
					return Gesture.orientation;
				}
			},

			title: {
				set: function(value) {
					return this.setWindowTitle(value);
				}
			},

			titleid: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Window#.titleid" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Window#.titleid" is not implemented yet.');
					return value;
				}
			},

			titlePrompt: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Window#.titlePrompt" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Window#.titlePrompt" is not implemented yet.');
					return value;
				}
			},

			titlepromptid: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Window#.titlepromptid" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Window#.titlepromptid" is not implemented yet.');
					return value;
				}
			},

			url: {
				get: function(value) {
					// TODO
					console.debug('Property "Titanium.UI.Window#.url" is not implemented yet.');
					return value;
				},
				set: function(value) {
					console.debug('Property "Titanium.UI.Window#.url" is not implemented yet.');
					return value;
				}
			}
		},

		open: function() {
			SuperView.prototype.open.apply(this);
			this.setWindowTitle(this.title);
			this.fireEvent("open", { source: null });
			this.fireEvent("focus", { source: this.domNode });
		},

		close: function() {
			SuperView.prototype.close.apply(this, arguments);
			this.fireEvent("blur", { source: this.domNode });
			this.fireEvent("close", { source: null });
		}

	});

});;
