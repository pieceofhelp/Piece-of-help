var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');

// mongoose.connect('mongodb://localhost/test');

// Error handler
mongoose.connection.on('error', function(err) {
	console.log(err);
});

// Connection established
mongoose.connection.once('open', function() {
	console.log('database connection established');
});

require('./models/supply');
require('./models/trans');
require('./models/need');
require('./models/user');
require('./models/setting');

var Setting = mongoose.model('Setting');

function createIfEmpty(name, defaultVal) {
	Setting
		.find({
			name: name
		})
		.exec(function(err, setting) {
			if (!err && setting.length == 0) {
				Setting.create({
					name: name,
					value: defaultVal
				});
			}
		});
}

function init() {
	createIfEmpty("credit", 0);
}

init();


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