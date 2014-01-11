define(function(require,exports,module){
	var record=function(recordFlg,meetingId,onSuccess){
		var service=require("js/services/ext.baseService");
		var funcId;
		if(recordFlg){
			funcId=service.METHODID.record;
		}else{
			funcId=service.METHODID.stopRecord;
		}

		service(funcId,[UUID(),meetingId],function(data){
			onSuccess();
		})
	}
	module.exports=record;
})