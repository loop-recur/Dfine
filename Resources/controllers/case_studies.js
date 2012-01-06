Controllers.case_studies = (function() {
	var Api = RestApi("case_studies");
	
	var getAll = function(cb){
		log("in index!!!!!!");
		Api.all(cb);
	}
	
	return {getAll : getAll}
})();
