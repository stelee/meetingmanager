define(function(require,exports,module){
	var test=function(onOK){
		var url="http://ecrm.wiscape.com.cn/confcall.php";
		var baseService=require("js/services/baseService");
		baseService.jsonService(url,{
				"id":"1",
				"version":"0,2",
				"methodId":"1",
				"params":["13910677497", "13810046186"],"checksum":"abcdefg"},
				onOK)

	};
	module.exports=test;
})