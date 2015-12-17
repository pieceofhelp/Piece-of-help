var mongoose = require( 'mongoose' );
require('../models/setting');
var Setting = mongoose.model('Setting');

var User = require('../models/user.js');
var Supply   = mongoose.model('Supply');
// console.log(User);

exports.index = function(req, res) {
	console.log(req.session);
	req.session.ct = req.session.ct ? req.session.ct + 1 : 1;
	User.find({}, function(err, users) {
		// console.log(users);
		res.json(users);
	})
};

exports.new = function(req, res) {
	res.send('new forum');
};

exports.create = function(req, res) {
	var newUser = req.body;
	User.create(newUser, function(err, user) {
		console.log(err, user);
		req.session.user = user;
		if (err) {
			res.json(err);
		} else {
			var redirect = '<html><meta http-equiv="refresh" content="1;url=/home" />'
			var flash = '<h1>' + req.body.name + ' 成功註冊!</h1></html>';
			res.end(redirect + flash);
		}
	});
};

exports.show = function(req, res) {
	res.send('show forum ' + req.params.forum);
};

exports.edit = function(req, res) {
	res.send('edit forum ' + req.params.forum);
};

exports.update = function(req, res) {
	res.send('update forum ' + req.params.forum);
};

exports.destroy = function(req, res) {
	res.send('destroy forum ' + req.params.forum);
};

exports.login = function(req, res) {
	console.log(req.session);
	// req.session.ct = req.session.ct ? req.session.ct + 1 : 1;
	User.find({
		id: req.body.id,
		password: req.body.password
	}, function(err, users) {
		console.log(users);
		if (users.length) {
			req.session.user = users[0];
			res.redirect("/home");
			res.json(req.session.user);
		} else {
			res.json({
				"err": "don't cheat me!"
			});
		}
	})
};

exports.logout = function(req, res) {
	delete req.session["user"];
	var redirect = '<html><meta http-equiv="refresh" content="1;url=/home" />'
	var flash = '<h1>成功登出!</h1></html>';
	res.end(redirect + flash);
};

exports.profile = function(req, res) {
	console.log(req.session);
	console.log('in profile id is :', req.params.id);
	// req.session.ct = req.session.ct ? req.session.ct + 1 : 1;

	User.find({
		id: req.params.id
	}, function(err, file) {
		console.log(file);
		Supply.find({
			supplier_id: req.params.id
		}, function(err, items) {
			if(items.length) {
				console.log('items', items);
				console.log('file',file);
				if (file.length) {
					console.log('if');
					res.render('profile', {
						file: file[0],
						items: items,
						user: req.session.user
					});
				}
			}
			else{
				console.log('else');
					res.render('profile', {
						file: file[0],
						items: items,
						user: req.session.user
					});
			}
		})
	});
};


exports.donate = function(req, res) {
	console.log(req.body);
	addCredit(parseInt(req.body.donate));
	User.findOne({
			id: req.session.user.id
		},
		function(err, users) {
			users.credit -= req.body.donate;
			users.donate+= req.body.donate;
			req.session.user.credit = users.credit;
			users.save();

			var redirect = '<html><meta http-equiv="refresh" content="1;url=/home" />'
			var flash = '<h1>Donation success!</h1></html>';
			res.end(redirect + flash);
		})

};

function addCredit(value) {
	Setting
		.findOne({
			name: "credit"
		})
		.exec(function(err, credit) {
			if (!err) {
				credit.value += value;
				credit.save();
			}
		});
}