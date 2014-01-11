define(function(require,exports,module){
	var meetingId=null;
	var onEnter=function(){
		var meetingService=require("js/services/ext.baseService");

		meetingService(meetingService.METHODID.getMyMeeting,[__.storage.get("uuid")],function(data){

			meetingId=data.results.meetingid;
			if(isNull(meetingId)){
				gapAlert("目前无可管理的会议");
				_loadApp("Meeting","history");
			}else{
				timer=setInterval(getMeetingStatus,1000);
			}
			
		},function(){
			gapAlert("数据错误，无可管理会议");
			history.back();
		},function(){

			gapAlert("网络错误，无法查询到可管理会议信息");
			history.back();
		});
		$("#addContactBtn").click(function(){
			__.parameters.set("from",$.mobile.activePage.attr("id"));
			__.parameters.set("meetingId",meetingId);
			_loadApp("StartMeeting");
		});
		$("#endmeetingBtn").click(function(){
			endMeeting();
			
		})
	}
	var getMeetingStatus=function(){
		var service=require("js/services/ext.baseService");
		service(service.METHODID.getMeetingStatus,[__.storage.get("uuid"),meetingId],
			function(data){
				var participants=data.results.members;
				var listview=new comp.Listview("#currentmeeting_list");
				listview.render(participants,function(entity,$li){
					var resultTuple=getResultTuple(entity);
					var html="<h1>"+resultTuple[0]+"</h1><div class='callingstatus cls_"+resultTuple[1]+"'></div><div class='seperator'></div>";
					$li.append(html);
				});
			});
	}
	var endMeeting=function(){
		var service=require("js/services/ext.baseService");

		service(service.METHODID.stopMeetingManage,[__.storage.get("uuid"),meetingId],function(data){
			_CHG("applications/Meeting/history.html");
		})
	}
	var muteMe=function(e){
		var muteService=require("js/services/mute.service");
		if($(e.target).attr("src").endsWith("sound.png")){
			muteService(meetingId,function(){
				$(e.target).attr("src",core.utils.getAbsolutePath("images/sound_mute.png"));
			});
			
		}else
		{
			muteService(meetingId,function(){
				$(e.target).attr("src",core.utils.getAbsolutePath("images/sound.png"));
			});
		}
			
	}
	var recordMe=function(e){
		var record=require("js/services/record.service");
		if($(e.target).attr("src").endsWith("record_no.png")){
			record(true,meetingId,function(){
				$(e.target).attr("src",core.utils.getAbsolutePath("images/record.png"));
			});
			
		}else
		{
			record(false,meetingId,function(){
				$(e.target).attr("src",core.utils.getAbsolutePath("images/record_no.png"));
			});
		}
	}
	module.exports.onEnter=onEnter;
	module.exports.muteMe=muteMe;
	module.exports.recordMe=recordMe;
	module.exports.getMeetingStatus=getMeetingStatus;
})