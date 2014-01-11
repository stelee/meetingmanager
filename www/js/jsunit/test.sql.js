var sqlTest=function()
{
	_T.reset();
	var db=new DBClient();
	_T.registerTestcase(function(context,next)
		{
			var sql="select count(*) as count from tbl_qai_assignments";
			db.select(sql,function(tx,rs)
			{
				assertEqual("get the count of the assignment",6,function(){return rs.rows.item(0).count});
				next();
			})
		});
	_T.run("test the sql");
}