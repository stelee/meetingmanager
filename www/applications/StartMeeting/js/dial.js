Namespace.register("app.startmeeting");
app.startmeeting.meetingId=null;

var startmeeting_dial_onEnter=function(){

	var meetingService=require("js/services/ext.baseService");

	meetingService(meetingService.METHODID.getMyMeeting,[__.storage.get("uuid")],function(data){
		app.startmeeting.meetingId=data.results.meetingid;
		app.startmeeting.init();
	},function(){
		app.startmeeting.init();
	})
}

app.startmeeting.init=function()
{
	require("applications/StartMeeting/js/config");
	setTimeout(function(){
		$("#dialNumber").focus();
	},1000);
	$("#addNumberBtn").click(function(e){
		app.startmeeting.addNumber(e);
	});
}

app.startmeeting.addNumber=function(e){
	e.preventDefault();
	if(isNull(app.startmeeting.meetingId))
	{
		if(__.parameters.setFromPage("dialNumber")){
			_CHG("applications/StartMeeting/index.html");
		}
	}else
	{
		var number=$("#dialNumber").val();
		if(number=="")
		{
			_loadApp("Meeting","manager");
		}else
		{
			var service=require("js/services/addToMeeting.service");
			service(app.startmeeting.meetingId,[number]
			,function(){
				_loadApp("Meeting","manager");
			});
		}
		
	}
}