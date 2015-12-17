var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Userschema = new Schema({
	id: { type: String, required: true, unique: true},
	password: { type: String, required: true },
	email: { type: String, required: true },
	name: { type: String, required: true },
	tel: { type: String, required: true },
	charity: { type:Number, default: 0},
	credit: { type: Number, default: 100 },
	donate: { type: Number, default: 0 },
	updated_at: { type: Date, default: new Date() },
	create_at: { type: Date, default: new Date() }
});

var User = mongoose.model('User', Userschema);

module.exports = User;