define(function(require,exports,module){
	var onEnter=function(){
		var pageheight=$(window).height()
		$(".loginMain").css("height",pageheight+"px");
	}
	var getVerifyCode=function(){
		var name=_getVar("name"),
		newPhoneNumber=_getVar("newPhoneNumber"),
		oldPhoneNumber=_getVar("oldPhoneNumber"),
		areaNumber=_getVar("areaNumber");

		var rebind=require("js/services/rebind.service");
		rebind(name,oldPhoneNumber,newPhoneNumber,areaNumber,function(){
			gapAlert("请查询老手机号上收到的验证短信");
		},function(data){
			if(data.results.status==214){
				gapAlert("无此老用户，请注册。");
				_loadApp("UserManager");
			}else{
				gapAlert("重新绑定失败，请稍后再试。");
			}
		});
	}
	var verified=function(){
		var name=_getVar("name"),
		newPhoneNumber=_getVar("newPhoneNumber"),
		oldPhoneNumber=_getVar("oldPhoneNumber"),
		verifyCode=_getVar("verifyCode");
		var reVerify=require("js/services/reverify.service");
		reVerify(name,newPhoneNumber,verifyCode,function(results){
			if(results.status==200){
				if(!isNull(results.uuid)){
					__.storage.set("uuid",results.uuid);
					__.storage.set("signature",results.signature);
					__.storage.set("name",name);
				}
				gapConfirm("是否同步手机通讯录",function(){
					console.log("sync the contact")
					var appointment=new entity.Appointment();
					appointment.on("create table",function(){
						_loadApp("UserManager","newEnterpriseUser");
					}).createTable(true);
					//_loadApp("UserManager","newEnterpriseUser");
				},function(){
					gapAlert("不同步手机通讯录将无法使用本程序");
				});
			}else{
				gapAlert("重新绑定失败，请确认您的验证码稍后再试。");
			}
		},function(data){
			gapAlert("重新绑定失败，请确认您的验证码稍后再试。");
		})
		
	}
	module.exports.onEnter=onEnter;
	module.exports.getVerifyCode=getVerifyCode;
	module.exports.verified=verified;
	module.exports.cancel=function(){history.back();}
})