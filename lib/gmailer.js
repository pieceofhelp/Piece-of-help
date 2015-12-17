var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "lovespreading2014@gmail.com",
        pass: "ccsp2014"
    }
});

exports.sendGmail = function(options) {
    // setup e-mail data with unicode symbols
    // var mailOptions = {
    //     from: "kytu800@gmail.com", // sender address
    //     to: "kytu800@gmail.com", // list of receivers
    //     subject: "Dcard", // Subject line
    //     html: "Dcard" // html body
    // }

    // send mail with defined transport object
    console.log(options);
    smtpTransport.sendMail(options, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}