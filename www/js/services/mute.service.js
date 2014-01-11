define(function(require,exports,module){
	var mute=function(meetingId,onSuccess){
		var service=require("js/services/ext.baseService");
		service(service.METHODID.mute,[UUID(),meetingId],function(data){
			onSuccess();
		})
	}
	module.exports=mute;
})