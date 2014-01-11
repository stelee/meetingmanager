define(function(require,exports,module){
	var reVerify=function(name,phoneNumber,verifyCode,onSuccess,onFailed){
		var service=require("js/services/ext.baseService");
		service(service.METHODID.reVerify,[name,phoneNumber,verifyCode],function(data){
			onSuccess(data.results);
		},function(data){
			onFailed(data);
		})
	}
	module.exports=reVerify;
})