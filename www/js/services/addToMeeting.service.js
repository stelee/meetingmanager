define(function(require,exports,module){
	var addToMeeting=function(meetingId,phonenumbers,onSuccess){
		var service=require("js/services/ext.baseService");
		service(service.METHODID.joinMeeting,[UUID(),meetingId,phonenumbers],function(data){
			onSuccess();
		})
	}
	module.exports=addToMeeting;
})