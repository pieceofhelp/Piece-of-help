var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NeedSchema = new Schema({
    need_id    : String,
    needer_name: String,
    item_name  : String,
    tel		   : String,
    email      : String,
    amount	   : Number,
    catogory   : String,
    image	   : String,
    description: String,
    updated_at : Date
});


mongoose.model( 'Need', NeedSchema );