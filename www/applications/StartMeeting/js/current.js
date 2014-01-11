define(function(require,exports,module){
	var onEnter=function(){
		require("applications/StartMeeting/js/config");
		var service=require("js/services/recentContact.service");
		service(function(contacts){
			var listview=new comp.Listview("#recentContactList");
			listview.render(contacts,function(contact,$li){
				$li.attr("self-contact",contact);
				$li.text(getContactNameByNumber(contact));
			})
		});
	}
	module.exports.onEnter=onEnter;
})