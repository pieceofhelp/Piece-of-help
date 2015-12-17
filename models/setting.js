var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = new Schema({
    name: { type: String },
    value: { type: Number},
    updated_at: { type: Date, default: new Date() },
	create_at: { type: Date, default: new Date() }
});


var Setting = mongoose.model( 'Setting', SettingSchema );