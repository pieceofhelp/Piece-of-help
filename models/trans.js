var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransChema = new Schema({
	trans_id   : String,
    supply_id  : String,
    supplier_id: String,
    buyer_id   : String,
    item_name  : String,
    amount	   : Number,
    credit	   : Number,
    method     : String,
    updated_at : Date
});

mongoose.model( 'Trans', TransChema );