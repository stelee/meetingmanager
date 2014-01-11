define(function(require,exports,module){
	var rebind=function(name,oldPhoneNumber,newPhoneNumber,areaNumber,onSuccess,onFailed){
		var service=require("js/services/ext.baseService");
		service(service.METHODID.changePhone,[name,oldPhoneNumber,newPhoneNumber,areaNumber],onSuccess,onFailed)
	}
	module.exports=rebind;
})