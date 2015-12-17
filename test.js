var gmailer = require("./lib/gmailer.js");

var mailOptions = {
	from: "lovespreading2014@gmail.com", // sender address
	to: "shelleysun1992@gmail.com", // list of receivers
	subject: "Transaction Success!", // Subject line
	html: "Your items on Love Spreading has been bought by someone else!" // html body
}

gmailer.sendGmail(mailOptions);
