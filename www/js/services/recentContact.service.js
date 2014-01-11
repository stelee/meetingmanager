define(function(require,exports,module){
	module.exports=function(success){
		var service=require("js/services/ext.baseService")
		service(service.METHODID.getRecentContact,[UUID()],function(data){
			success(data.results.contacts);
		})
	}
})