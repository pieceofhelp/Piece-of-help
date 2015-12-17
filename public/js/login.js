var mongoose = require('mongoose');
var signButton = $('#signIn');
var User = mongoose.model('user');
signButton.on('click',function () {
	var account = document.getElementById("account").value;
	var password = document.getElementById("password").value;
	console.log(account+" "+password);
	$.post("/login",
	  	{
	    	account : account,
	    	password : password
	  	},
	  	function(data,status){
	    alert("Data: " + data + "\nStatus: " + status);
  	});
});