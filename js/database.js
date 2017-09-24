var myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
myDB.transaction(function(transaction) {
	transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, title text, desc text)', [],
	function(tx, result) {
	alert("Table created successfully");
	},
	function(error) {
	alert("Error occurred while creating the table.");
	});
});

var title="sundaravel";
var desc="phonegap freelancer";
myDB.transaction(function(transaction) {
var executeQuery = "INSERT INTO phonegap_pro (title, desc) VALUES (?,?)";
transaction.executeSql(executeQuery, [title,desc]
, function(tx, result) {
alert('Inserted');
},
function(error){
alert('Error occurred');
});
});

myDB.transaction(function(transaction) {
transaction.executeSql('SELECT * FROM phonegap_pro', [], function (tx, results) {
var len = results.rows.length, i;
$("#rowCount").append(len);
for (i = 0; i < len; i++){
$("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td></tr>");
}
}, null);
});

$("#update").click(function(){
 var id=$("#id").text();
 var title=$("#title").val();
 var desc=$("#desc").val()
 myDB.transaction(function(transaction) {
 var executeQuery = "UPDATE phonegap_pro SET title=?, desc=? WHERE id=?";
 transaction.executeSql(executeQuery, [title,desc,id],
 //On Success
 function(tx, result) {alert('Updated successfully');},
 //On Error
 function(error){alert('Something went Wrong');});
 });
});

myDB.transaction(function(transaction) {
 var executeQuery = "DELETE FROM phonegap_pro where id=?";
 transaction.executeSql(executeQuery, [id],
 //On Success
 function(tx, result) {alert('Delete successfully');},
 //On Error
 function(error){alert('Something went Wrong');});
 });

 