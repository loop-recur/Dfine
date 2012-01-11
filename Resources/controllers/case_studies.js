Controllers.case_studies = (function() {
	var Api = RestApi("case_studies");
	
	var getAll = Api.all;
	
	return {getAll : getAll}
})();
