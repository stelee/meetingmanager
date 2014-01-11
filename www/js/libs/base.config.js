Namespace.register("__");//global object
__.dbConfig={
		dbName:"meetingmanager",
		version:"1.0",
		description:"leesoft meetingmanager",
		size:1000
	}

__.navigatorItem=[
	{
	         url:"applications/StartMeeting/index.html",
	         id:"menu_startmeeting_index",
	         name:"发起会议",
	},
	{
	         url:"applications/Meeting/manager.html",
	         id:"menu_currentmeeting_index",
	         name:"当前会议"
	},
	{
	         url:"applications/Meeting/history.html",
	         id:"menu_meetinghistory_index",
	         name:"历史会议"
	},
	{
	         url:"applications/Meeting/appointment.html",
	         id:"menu_appointment_index",
	         name:"预约会议"
	},
	{
	         url:"applications/UserManager/newEnterpriseUser.html",
	         id:"menu_settings_index",
	         name:"帐号管理"
	}
];
