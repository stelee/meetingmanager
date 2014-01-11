define(function(require,exports,module){
	var Service=function(name,phonenumber,callBack)
	{
		
		var service=require("js/services/ext.baseService");
		service(service.METHODID.contact,[name,phonenumber],function(data){
			callBack();
		})
	}
	module.exports=Service;
})