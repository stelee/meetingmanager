var index_page_onEnter=function(){
  setTimeout(function(){
  	//$.mobile.changePage(core.utils.getAbsolutePath("applications/StartMeeting/index.html"))},1000);
    if(__.storage.get("allowSync")!="true"){
  		$.mobile.changePage(core.utils.getAbsolutePath("applications/UserManager/index.html"))
  	}else{
  		$.mobile.changePage(core.utils.getAbsolutePath("applications/StartMeeting/index.html"))
  	}
  },1000);
  	
  //$("#gotoLink").trigger("click");
}