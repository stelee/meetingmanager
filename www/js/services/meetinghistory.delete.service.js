define(function(require,exports,module){
	var history=function(meetingId,onSuccess){
		var service=require("js/services/ext.baseService");
		service(service.METHODID.deleteMeeting,[UUID(),meetingId],function(data){
			onSuccess(data.results);
		})
	}
	module.exports=history;
})