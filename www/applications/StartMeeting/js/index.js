Namespace.register("app.startmeeting");
app.startmeeting.contactList=new Array();
app.startmeeting.context=new Object();
var decorator=require("js/plugins/UIDecorator");

var startmeeting_index_onEnter=function(){
	$("#multipleNumberSelectDiv").popup();
	$("#menuBtn").click(app.startmeeting.showMenu);
	$("#addPhoneNumberBtn").click(app.startmeeting.addPhoneNumber);
	$("#addPhoneNumberFromContactBtn").click(app.startmeeting.addFromContact);
	$("#resetBtn").click(app.startmeeting.reset);
	$("#goMeetingButton").click(app.startmeeting.goMeeting);
	require("applications/StartMeeting/js/config");
	app.startmeeting.loadContact();
	
	if(__.parameters.fetch("from")=="meeting_manager"){
		$("#goMeetingBtn").html("");
		var $div=$("<div class='buttonLayoutCenter'></div>");
		var $btn=$("<button data-inline='true' data-theme='d' onclick='backToMeetingManager()'>返回</button>");
		$div.append($btn);
		$btn.button();

		$btn=$("<button data-inline='true' data-theme='e'>邀请加入会议</button>");
		$div.append($btn);
		$btn.button();
		$btn.click(function(){
			var service=require("js/services/addToMeeting.service");
			service(__.parameters.get("meetingId"),
				app.startmeeting.context.contactAdded,function(){
					_loadApp("Meeting","manager");
				});
			
		});

		$("#goMeetingBtn").append($div);
		app.startmeeting.context.addMode=true;
		app.startmeeting.context.contactAdded=[];
	}else{
		app.startmeeting.context.addMode=false;
	}
	setTimeout(function(){
		//UIExtends.resetHeight("#contactList",48);
		$("#goMeetingBtn").css("top",$("div[data-role=footer]").offset().top-54+"px");
		$.mobile.activePage.css("min-height","0px");
	},200);
}
var backToMeetingManager=function(){
	_CHG("applications/Meeting/manager.html");
}
app.startmeeting.loadContact=function(){
	var contact=new entity.Contact();
	
	contact.on(function(){
		var listview=new comp.Listview("#contactList");
		app.startmeeting.contactList=this.entities;
		var naviChars=[];
		listview.render(this.entities,function(entity,$li){
			if(entity.type=="divider"){
				$li.attr("data-filtertext",entity.name);
				$li.attr('data-role="list-divider"');
				$li.addClass("ui-li-divider");
				$li.addClass("myDivider");
				naviChars.push(entity.name);
			}else{
				$li.attr("data-filtertext",entity.name+","+entity.pinyinstring+","+entity.number);
				$li.click(app.startmeeting.setSelect);
			}
			$li.append(entity.name);
			if(entity.selected){
				$li.addClass("itemSelected");
			}else
			{
				$li.removeClass("itemSelected");
			}
			
			
		});
		naviChars.forEach(function(naviChar){
			$li=$('<li>'+naviChar+'</li>');
			$("#scrollTo").append($li);
			$li.on('click',function(){
				scrollToNavChar(naviChar);
			})
		});
		setTimeout(function(){
			app.startmeeting.loadSelectedContact();
			resizeNavCharBar();
		},1000);
	}).listWithDivider();
}
var resizeNavCharBar=function(){
	var count=$("#scrollTo").children().length;
	var height=($("#goMeetingBtn").position().top-$("div[data-role=header]").height()-22)/count;
	$("#scrollTo").show();
	$("#scrollTo li").height(height);
	$("#scrollTo li").css("line-height",height+"px");
};
var scrollToNavChar=function(navChar)
{
	try{
		var scrollTop=
		$("li[data-filtertext=" + navChar + "]").position().top
		- $.mobile.activePage.find("div[data-role=header]").height()
		- 50;
		$("#contactList").scrollTop(scrollTop);
	}catch(e){

	}
	
}


app.startmeeting.setSelect=function(e){
	$li=$(e.target);
	if($li.hasClass("itemSelected")){//selected->unselected
		$li.removeClass("itemSelected");
		app.startmeeting.contactList[$li.index()].selected=false;
		app.startmeeting.removeContact(app.startmeeting.contactList[$li.index()]);
	}else{//unselected->selected
		var entry=app.startmeeting.contactList[$li.index()];
		if('object' == typeof entry.number){
			//对应一个联系人有多个电话号码
			app.startmeeting.selectMultipleNumber(entry,$li)
		}else{
			$li.addClass("itemSelected");
			app.startmeeting.contactList[$li.index()].selected=true;
			app.startmeeting.addContact(app.startmeeting.contactList[$li.index()]);
		}
	}
	app.startmeeting.loadSelectedContact();
}
app.startmeeting.selectMultipleNumber=function(entry,$target){
	var listview=new comp.Listview("#numberList");
	listview.render(entry.number,function(num,$li){
		$li.append(num);
		$li.click(function(){
			entry.selectedNumber=num;
			entry.selected=true;
			$target.addClass("itemSelected");
			app.startmeeting.loadSelectedContact();
			app.startmeeting.addContact(entry);
			$("#multipleNumberSelectDiv").popup("close");
		})
	})
	$("#multipleNumberSelectDiv").popup("open");
}
app.startmeeting.showMenu=function(){
	$("#mainMenuPanel").panel("open");
}
app.startmeeting.addPhoneNumber=function(){
	var value=$("#addPhoneNumber").val();
	if(!isEmpty(value)){
		$("#phoneNumberList").append("<li>"+value+"</li>");
		$("#addPhoneNumber").val("");
	}
	$("#phoneNumberList").listview("refresh");
}
app.startmeeting.addFromContact=function(){

}
app.startmeeting.reset=function(){
	$("#phoneNumberList").empty();
	$("#phoneNumberList").listview("refresh");
}
app.startmeeting.loadSelectedContact=function()
{
	$("#selectedContactList").empty();
	for(var i in app.startmeeting.contactList){
		var contact=app.startmeeting.contactList[i];
		if(contact.selected==true){
			var $div=$("<div onclick='app.startmeeting.scrollTo()' self-cIndex='"+i+"'>"+contact.name+"</div>");
			$("#selectedContactList").append($div);
		}
		
	}
	//reset the UI:
	$("#startmeeting_index .ui-listview-filter").css("margin-top","0px");
	decorator.resetElementTop("startmeeting_index","#startmeeting_index div[data-role=content]");
	decorator.resetHeight("startmeeting_index","#startmeeting_index #contactList",100);

	//decorator.resetElementTop("startmeeting_index","#startmeeting_index form");
	//decorator.resetHeight("startmeeting_index","#startmeeting_index ul");
}
app.startmeeting.scrollTo=function()
{
	var $div=$(event.target);
	var index=$div.attr("self-cIndex");

	try{
		var scrollTop=
		$($("#contactList").children()[index]).position().top
		- $.mobile.activePage.find("div[data-role=header]").height()
		- 50;
		$("#contactList").scrollTop(scrollTop);
	}catch(e){

	}
}
app.startmeeting.unselect=function(){
	var $div=$(event.target);
	var index=$div.attr("self-cIndex");
	app.startmeeting.contactList[index].selected=false;
	$($("#contactList").children()[index]).removeClass("itemSelected");
	$div.remove();
}
app.startmeeting.goMeeting=function(){
	gapConfirm("确定召开会议？",function(){
		_CHG("applications/Meeting/make_an_appointment.html");
	},function(){});
}
app.startmeeting.removeContact=function(entry){
	if(app.startmeeting.context.addMode==false)
		return;
	var number=entry.selectedNumber?entry.selectedNumber:entry.number;
	app.startmeeting.context.contactAdded=removeFromArray(app.startmeeting.context.contactAdded,function(elem){
		return elem==number;
	})


}
app.startmeeting.addContact=function(entry){
	if(app.startmeeting.context.addMode==false)
		return;
	var number=entry.selectedNumber?entry.selectedNumber:entry.number;
	app.startmeeting.context.contactAdded.push(number);
}


