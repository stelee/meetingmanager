define(function(require,exports,module){
	var onEnter=function(){
		require("applications/StartMeeting/js/config");
		var service=require("js/services/recentContact.service");
		service(function(contacts){
			var listview=new comp.Listview("#recentContactList");
			listview.render(contacts,function(contact,$li){
				$li.attr("self-contact",contact);
				$li.text(getContactNameByNumber(contact));
				$li.on('click',function(){
					addContact(contact);
				});
			})
		});
	}
	var addContact=function(number){
		__.parameters.set("dialNumber",number);
		_CHG("applications/StartMeeting/index.html");
	}
	module.exports.onEnter=onEnter;
})