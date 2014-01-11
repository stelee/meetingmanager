entity.Appointment=function(){
	this.tableName="tbl_appointment";
}
_EXTEND(entity.Appointment,entity.Base);

entity.Appointment.prototype.createTable=function(forceFlag){
	var that=this;
	var sqls=new Array();
	if(forceFlag)
	{
		sqls.push("drop table if exists tbl_appointment");
	}
	sqls.push("create table tbl_appointment (id INTEGER  PRIMARY KEY  AUTOINCREMENT  NOT NULL,appointment_datetime datetime,contactSelected varchar,ddlFlag varchar,ddlDate INTEGER)");	
	var db=new DBClient();
	if(forceFlag){
		db.update(sqls,function(error){that.error(error)},function(){that.trigger("create table")});
	}else{
		db.update("select 1 from tbl_contacts",
			function(error){
				var db2=new DBClient();
				db2.update(sqls,function(error){that.error(error)},function(){that.trigger("create table")});
			},
			function(){
				that.trigger("create table");
			}
		);
	}
}