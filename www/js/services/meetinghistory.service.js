define(function(require,exports,module){
	var history=function(onSuccess){
		var service=require("js/services/ext.baseService");
		service(service.METHODID.meetingHistory,[UUID()],function(data){
			onSuccess(data.results);
		})
	}
	module.exports=history;
})