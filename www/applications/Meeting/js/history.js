define(function(require,exports,module){
	var onEnter=function(){
		var service=require("js/services/meetinghistory.service");
		service(function(results){
			list=results.historicConf;
			var listview=new comp.Listview("#meeting_history_list");
			listview.render(list,function(item,$li){
				$li.append("<h1>会议于 {datetime}</h1>".bind("datetime",item.conftime));
				$li.append("<p>参会人员：{participants}</p>".bind("participants",getContacts(item.phones).join(",")))
				var $div=$("<div></div>");
				if(item.isRecorded==1){
					var $btn=$("<button data-inline='true' data-theme='e'>收听录音</button>")
					$div.append($btn);
					$btn.button();
					$btn.click(function(e){
						$li=$(e.target).parents("li:first")
						var confid=$li.attr("self-confid");
						var service=require("/js/services/replay.service");
						service(confid,function(results){
						})
					})
				}
				

				$btn=$("<button data-inline='true' data-theme='d'>重新发起</button>")
				$div.append($btn);
				$btn.button();
				$btn.click(function(e){
					$li=$(e.target).parents("li:first")
					var confNumbers=$li.attr("self-confPhones");
					__.parameters.set("confNumbers",confNumbers);
					_loadApp("Meeting","make_an_appointment");
				})
				$li.attr("self-confid",item.confid);
				$li.attr("self-confPhones",item.phones.join(","));
				$li.append($div);
			});

		})

	}
	var getContacts=function(numbers){
		var ret=[];
		for(var i in numbers){
			var number=numbers[i];
			ret.push(getContactNameByNumber(number));
		}
		return ret;
	}
	module.exports.onEnter=onEnter;
})