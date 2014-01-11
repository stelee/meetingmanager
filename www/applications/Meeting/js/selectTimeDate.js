define(function(require,exports,module){
	module.exports.onEnter=function(){

	}
	module.exports.confirmAppointment=function(){
		if($("#dateTimeInput").val()==""){
			gapAlert("请选择一个日期");
		}else
		{
			
			
			var callback=__.parameters.fetch("__callback");
            var localDateString=$("#dateTimeInput").val();
			if(callback=="appointment")
			{
				var currentAppointment=__.parameters.fetch("currentAppointment");
				var ent=new entity.Appointment();
				ent.on("update",function(){
                   updateAppointmentInCalendar(currentAppointment,localDateString)
					_loadApp("Meeting","appointment");
				}).update({appointment_datetime:localDateString},"id="+currentAppointment.id);
			}else{
				var contactSelected=__.parameters.fetch("contactSelected");
				var appointment=new entity.Appointment();
				appointment.entity={
					appointment_datetime:localDateString,
					contactSelected:JSON.stringify(contactSelected)
				}
				appointment.on("create",function(){
                    createAppointmentInCalendar(this);
					_CHG("applications/Meeting/appointment.html");
				}).create();
			}
		}
	}
    var updateAppointmentInCalendar=function(a_entity, newDate){
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
      
       var newStartDate=core.utils.ajustDateTime(new Date(newDate));
       var newEndDate=new Date(newStartDate.getTime()+30*60*1000);
       
       window.plugins.calendar.modifyEvent(title,location,notes,startDate,endDate,title,location,notes,
                                           newStartDate,newEndDate,
                                           function(){},
                                           function(msg){console.log(msg)});

    }
    var createAppointmentInCalendar=function(appointment){
       var startDate = core.utils.ajustDateTime(new Date(appointment.entity.appointment_datetime));
       
       var endDate=new Date(startDate.getTime()+30*60*1000);
       var title="会议预约";
       var location="电话会议";
       var notes="请打开会议管理软件，进入预约会议菜单，和如下人士开始您的电话会议：";
       var sep="";
       var contactSelected=JSON.parse(appointment.entity.contactSelected);
       for(var i=0;i<contactSelected.length;i++){
        notes+=sep+contactSelected[i].name;
        sep=", ";
       }
       window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,function(){},function(msg){console.log(msg)});
       
    }
	module.exports.cancel=function(){
		history.back();
	}
});