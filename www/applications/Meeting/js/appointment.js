define(function(require,exports,module){
	var appointment_list;
	var currentAppointment;
	var onEnter=function(){
		var meetingService=require('js/services/meetingappointment');
		meetingService(function(list){
			appointment_list=list;
			var listview=new comp.Listview("#appointment_list");
			listview.render(list,function(item,$li){
				$li.append("<h1>会议于{datetime}</h1>".bind("datetime",item.appointment_datetime));

				var participants="";
				var sep="";
				var contactSelected=JSON.parse(item.contactSelected);

				for(var i=0;i<contactSelected.length;i++)
				{
					participants=participants+sep+contactSelected[i].name;
					sep=",";
				}

				$li.append("<p>参会人员：{participants}</p>".bind("participants",participants))
				var $div=$("<div></div>");
				var $btn=$("<button data-inline='true' data-theme='e' data-mini='true'>立即开始</button>")
				$div.append($btn);
				$btn.button();
				$btn.click(start);

				$btn=$("<button data-inline='true' data-theme='g'  data-mini='true'>更改时间</button>")
				$div.append($btn);
				$btn.button();
				$btn.click(update);

				$btn=$("<button data-inline='true' data-theme='d'  data-mini='true'>取消预约</button>")
				$div.append($btn);
				$btn.button();
				$btn.click(cancel);

				$li.append($div);
			});
		});
	}
	var update=function(){
		var itemIndex=$(event.target).parents("li").index();
		currentAppointment=appointment_list[itemIndex];
		__.parameters.set("currentAppointment",currentAppointment);
		__.parameters.set("__callback","appointment");
		_loadApp("Meeting","selectTimeDate");
	}

	var cancel=function(){
        var itemIndex=$(event.target).parents("li").index();
		gapConfirm("是否取消会议预约",function(){
			var appItem=appointment_list[itemIndex];
			var appointment=new entity.Appointment();
			appointment.on("delete",function(){
                deleteFromCalendar(appItem);
				onEnter();
			}).delete("id="+appItem.id);
		},function(){})
		
	}
    
    var deleteFromCalendar=function(a_entity){
       var title="会议预约";
       var location="电话会议";
       var notes="请打开会议管理软件，进入预约会议菜单，和如下人士开始您的电话会议：";
       var sep="";
       var contactSelected=JSON.parse(a_entity.contactSelected);
       for(var i=0;i<contactSelected.length;i++){
        notes+=sep+contactSelected[i].name;
        sep=", ";
       }
       
       var startDate=core.utils.ajustDateTime(new Date(a_entity.appointment_datetime));
       var endDate=new Date(startDate.getTime()+30*60*1000);
       
       window.plugins.calendar.deleteEvent(title,location,notes,startDate,endDate,
                                           function(){},function(msg){console.log(msg)});
    }
    
	var start=function(){
		gapConfirm("是否要发起会议？",function(){
			var itemIndex=$(event.target).parents("li").index();
			var appItem=appointment_list[itemIndex];

			var service=require("js/services/ext.baseService");
			var phonelist=new Array();
			var contacts=JSON.parse(appItem.contactSelected)

			for(var i in contacts)
			{
				phonelist.push(contacts[i].number)
			}
		
			service(service.METHODID.startMeeting,[__.storage.get("uuid"),phonelist],function(data){
				var appointment=new entity.Appointment();
				appointment.on("delete",function(){
					_CHG("applications/Meeting/manager.html");
				}).delete("id="+appItem.id);
			},function(error){
				console.error(error);
			})
		},function(){});
		
		
	}
	module.exports.onEnter=onEnter;
	module.exports.confirmAppointment=function(){
		if($("#dateTimeInput").val()==""){
			gapAlert("请选择一个日期");
			return;
		}
		var ent=new entity.Appointment();
		ent.on("update",function(){
			$("#dateTimePicker").popup("close");	
			onEnter();
		}).update({appointment_datetime:$("#dateTimeInput").val()},"id="+currentAppointment.id);
	}
})