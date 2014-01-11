Namespace.register("app.startmeeting");
var startmeeting_dial_onEnter=function(){
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
	if(__.parameters.setFromPage("dialNumber")){
		_CHG("applications/StartMeeting/index.html");
	}
}