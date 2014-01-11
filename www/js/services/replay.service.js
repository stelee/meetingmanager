define(function(require,exports,module){
	var replay=function(meetingId,onSuccess){
		var service=require("js/services/ext.baseService");

		service(service.METHODID.getMeetingRecord,[UUID(),meetingId],function(data){
			onSuccess(data.results);
		})
	}
	module.exports=replay;
})