Namespace.register("app.usermanager");
var usermanager_do_register_onEnter=function(){
	$("#getVerificationCodeBtn").click(function(){
		app.usermanager.getVerificationCode();
	});
	$("#finishRegisterBtn").click(function(){
		app.usermanager.finishRegister();
	});
	var pageheight=$(window).height()
	$(".loginMain").css("height",pageheight+"px");
	$("div[data-role=content]").css("padding","0px")
}
app.usermanager.getVerificationCode=function(){
	if(__.parameters.setFromPage("phonenumber")){
		//todo: add the verifycode here
		var name=__.parameters.get("name");
		var phonenumber=__.parameters.get("phonenumber");
		var areanumber=$("#areanumber").val();
		var service=require("js/services/ext.baseService")
		service(service.METHODID.getVerifyCode,[name,phonenumber,areanumber],function(){
				gapAlert("请稍候，验证码将发到您的手机上。");
		});
		//$("#verifyCode").val("123456");
	}else{
		gapAlert("请输入您的手机号");
	}
}
app.usermanager.finishRegister=function(){
	if(__.parameters.setFromPage("verifyCode")){
		var name=__.parameters.get("name");
		var phonenumber=__.parameters.get("phonenumber");
		var verifyCode=__.parameters.get("verifyCode");
		var service=require("js/services/ext.baseService")
		service(service.METHODID.register,[name,phonenumber,verifyCode],
			function(data){
				if(!isNull(data.results.uuid)){
					__.storage.set("uuid",data.results.uuid);
					__.storage.set("signature",data.results.signature);
					__.storage.set("name",name);
				}
				gapConfirm("是否同步手机通讯录",function(){
					console.log("sync the contact")
                    __.storage.set("allowSync","true");
					var appointment=new entity.Appointment();
					appointment.on("create table",function(){
						_loadApp("UserManager","newEnterpriseUser");
					}).createTable(true);
					
				},function(){
                    __.storage.set("allowSync","false");
					gapAlert("不同步手机通讯录将无法使用本程序");
					$("#uploadContactsContainer").show();
					$("#uploadContactsBtn").click(function(){
						console.log("sync the contact")
                        __.storage.set("allowSync","true");
						var appointment=new entity.Appointment();
						appointment.on("create table",function(){
							_loadApp("UserManager","newEnterpriseUser");
						}).createTable(true);
					})
				});
			},
			function(data){
					gapAlert("验证码输入错误。");
			}
		);
	}else{
		gapAlert("请输入您的验证码");
	}
}