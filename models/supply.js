var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupplySchema = new Schema({
    supply_id       : String,
    supplier_id     : String,
    supplier_name   : String,
    tel				: String,
    email			: String,
    item_name		: String,
    catogory   		: String,
    amount	   		: Number,
    description		: String,
    credit	   		: Number,
    face       		: String,
    delivery   		: String,
    image           : String,
    updated_at 		: Date
});

var Supply = mongoose.model('Supply', SupplySchema); 