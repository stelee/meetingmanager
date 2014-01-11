define(function(require,exports,module){
	var meetingHistory=function(listHandler){
		var list=[
			{	id:1,
				datetime:'2013年5月22日',
				participants:['刘小小','刘小小','刘小小']
			},
			{	id:2,
				datetime:'2013年5月22日',
				participants:['刘小小','刘小小','刘小小']
			},
			{	id:3,
				datetime:'2013年5月22日',
				participants:['刘小小','刘小小','刘小小']
			}
		];
		listHandler(list);
	}
	module.exports=meetingHistory;

})