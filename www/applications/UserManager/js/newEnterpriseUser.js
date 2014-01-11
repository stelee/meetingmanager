define(function(require,exports,module){
	var onEnter=function(){
		$.mobile.activePage.find(".loginMain").height(
			$(window).height()-15
			)
		$("#entNumber").val(__.storage.get("entNumber"));
		$("#entCode").val(__.storage.get("entCode"));
		if(__.storage.get("0launch")){
			$.mobile.activePage.attr('self-menuIndex', '4');
		}else
		{
			__.storage.set("0launch","true");
		}
		
	}
	var freeTry=function(){
		//_loadApp("StartMeeting");
		var service=require("js/services/ext.baseService");
		service(service.METHODID.queryFreeTime,
			[
				__.storage.get("uuid")
			],
			function(data){
				$("#entNumber").val("");
				$("#entCode").val("");
				__.storage.remove("entNumber");
				__.storage.remove("entCode");

				gapAlert("免费帐户绑定成功，还有剩余通话次数 "+data.results.freenumber+"，剩余通话时间 "+data.results.freeminutes+" 分钟");
				_loadApp("StartMeeting");
			},
			function(data){
				gapAlert("免费帐户绑定失败")
			}
		);
	}
	var register=function(){
		var service=require("js/services/ext.baseService");
		service(service.METHODID.enterpriseBinding,[
			__.storage.get("uuid"),
			_getVar("entNumber"),
			_getVar("entCode")
			],function(data){
				__.storage.set("entNumber",_getVar("entNumber"));
				__.storage.set("entCode",_getVar("entCode"));
				gapAlert("企业用户绑定成功");
				_loadApp("StartMeeting");
			},function(data){
				gapAlert("企业总机或者验证码不正确");
			})
		//_loadApp("UserManager","user")
	}
	var cancel=function(){
		history.back();
	}
	var contactUs=function(){
		_loadApp('UserManager','contact');
	}
	module.exports.onEnter=onEnter;
	module.exports.freeTry=freeTry;
	module.exports.register=register;
	module.exports.cancel=cancel;
	module.exports.contactUs=contactUs;
})