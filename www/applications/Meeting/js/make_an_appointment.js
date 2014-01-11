define(function(require,exports,module){
	var contactSelected=new Array();
	var onEnter=function(){
		var contacts=__.session.getObject("contactlist",Array);
		var confNumbers=__.parameters.fetch("confNumbers");//todo


		if(!isNull(confNumbers)){
			var dupCheckArray=new Array();
			var confNumbersArray=confNumbers.split(",");
			for(var i in confNumbersArray){
				var number=confNumbersArray[i];
				if(dupCheckArray.indexOf(number)<0){
					dupCheckArray.push(number);
					contactSelected.push({
						name:getContactNameByNumber(number),
						number:number
					})
				}
			}
			
		}else{
			for(var i=0;i<contacts.length;i++){
				if(contacts[i].selected==true){
					var entry=new Object();
					entry.name=contacts[i].name;
					entry.number=getSelectedNumber(contacts[i]);
					contactSelected.push(entry);
				}
			}
		}

		

		var listview=new comp.Listview("#participanets_list");

		listview.render(contactSelected,function(contact,$li){
			$li.text(contact.name);
		})

		$("#startMeetingBtn").click(startMeeting);
		$("#makeAppointmentBtn").click(setAppointment);

		var decorator=require("js/plugins/UIDecorator");
		setTimeout(function(){
			decorator.resetHeight("meeting_make_an_appointment","#participanets_list",$("div[class*=toolbox]").height());
		},200);
	}
	var startMeeting=function(){
		var service=require("js/services/ext.baseService");
		var phonelist=new Array();
		var contacts=__.session.getObject("contactlist",Array);

		for(var i in contactSelected)
		{
			phonelist.push(contactSelected[i].number)
		}
		service(service.METHODID.startMeeting,[__.storage.get("uuid"),phonelist],function(data){
			_CHG("applications/Meeting/manager.html");
		},function(error){
			gapAlert("暂时无法召开会议");
			console.error(error);
		},function(error){
			gapAlert("暂时无法召开会议，请检查您的网络配置");
			console.error(error);
		})
	}
	var setAppointment=function(){
		__.parameters.set("contactSelected",contactSelected);

		_CHG("applications/Meeting/selectTimeDate.html");
	}
	module.exports.onEnter=onEnter;
	module.exports.contactSelected=contactSelected;
	

})