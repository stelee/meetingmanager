Namespace.register("app.usermanager");
var usermanager_index_onEnter=function(){
	$("#registerBtn").click(function(){
		app.usermanager.register();
	});
	$("#loginBtn").click(function(){
		_loadApp("UserManager","login")
	});
	var pageheight=$(window).height()
	$(".loginMain").css("height",pageheight+"px");
	//$("div[data-role=content]").css("padding","0px")
}

app.usermanager.register=function(){
	if(__.parameters.setFromPage("name")){
		$.mobile.changePage("doRegister.html");
	}else
	{
		gapAlert("请输入您的姓名")
	}
	
}