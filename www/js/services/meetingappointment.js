define(function(require,exports,module){
	var meetingappointment=function(listHandler){
		var appoinment=new entity.Appointment();
		appoinment.on('list',function(){
			listHandler(this.entities);
		}).list("ddlFlag='I'","appointment_datetime desc")
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
		
	}
	module.exports=meetingappointment;

})