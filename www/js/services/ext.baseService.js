define(function(require,exports,module){
	var ID=1;
	var VERSION="0.2";
	var CHECKSUM="abcdefg";
	var URL="http://ecrm.wiscape.com.cn/confcall.php"
	var ERRORCODE={
		"200":"success"
	}
	var METHODID={
		getVerifyCode:1,
		register:2,
		queryFreeTime:3,
		enterpriseBinding:4,
		changePhone:5,
		uploadContacts:6,
		startMeeting:7,
		joinMeeting:8,
		mute:9,
		record:10,
		stopRecord:11,
		getMeetingStatus:12,
		stopMeetingManage:13,
		meetingHistory:14,
		getMeetingRecord:15,
		getRecentContact:16,
		getMyMeeting:17,
		reVerify:18,
		contact:19
	}

	var checksum=function(paramN){
		var seed=JSON.stringify(paramN)+__.storage.get("signature");
		return hex_md5(seed);
	}

	var service=function(methodId,paramN,callBack,onFailed,onError){
		if(!onFailed){
			onFailed=function(data){
				console.error(data);
			}
		}
		var baseService=require("js/services/baseService");
		if(onError){
			baseService.jsonService(URL,{
				"id":ID,
				"version":VERSION,
				"methodId":methodId,
				"params":paramN,
				"checksum":checksum(paramN)},
				function(data){
					if(data.results.status==200){
						callBack(data);
					}else{
						onFailed(data);
					}
				},
				onError);
		}
		else
		{
			baseService.jsonService(URL,{
				"id":ID,
				"version":VERSION,
				"methodId":methodId,
				"params":paramN,
				"checksum":checksum(paramN)},
				function(data){
					if(data.results.status==200){
						callBack(data);
					}else{
						onFailed(data);
					}
				});

		}

		
	}
	module.exports=service;
	module.exports.ID=ID;
	module.exports.VERSION=VERSION;
	module.exports.CHECKSUM=CHECKSUM;
	module.exports.URL=URL;
	module.exports.METHODID=METHODID;
})