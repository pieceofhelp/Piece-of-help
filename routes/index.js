var mongoose = require( 'mongoose' );
var promise = require( 'promise');
var Supply   = mongoose.model('Supply');
var Need   = mongoose.model('Need');
var Setting   = mongoose.model('Setting');
var need_index = 50;
var supply_index = 50;



exports.index = function(req, res) {
	res.render('index', {
		title: 'Love Spreading'
	});
}

exports.home = function(req, res) {
	console.log("user session check: " + req.session.user);
	
	Setting.findOne({name:"credit"}).exec(function(err, credit){
		console.log(err, credit);
	
		res.render('home', {
			title: 'Love Spreading',
			user: req.session.user,
			credit: credit.value
		});

	})
}

exports.supply = function(req, res) {
	// console.log('in latest model');
	console.log('in supply catogory ', req.params.id);
	if(req.params.id == 0){
		Supply.
		find().
		sort( '-updated_at' ).
		exec(function(err, items) {
			if (err) {
				console.error(err);
			};
			res.json(items);
		});	
	}
	else{
		Supply.
		find({
			catogory: req.params.id
		}).
		exec(function(err, items) {
			if (err) {
				console.error(err);
			};
			res.json(items);
		});		
	}
}

exports.need = function(req, res) {
	// console.log('in need model');
	console.log('in need catogory ', req.params.id);
	if(req.params.id == 0){
		Need.
		find().
		sort( '-updated_at' ).
		exec(function(err, items) {
			if (err) {
				console.error(err);
			};
			res.json(items);
		});	
	}
	else{
		Need.
		find({
			catogory: req.params.id
		}).
		exec(function(err, items) {
			if (err) {
				console.error(err);
			};
			res.json(items);
		});
	}
}

exports.create = function ( req, res){
  	// console.log(req.body.name);
  	new Supply({
	  		supply_id  : supply_index++,
	  		supplier_id: 'andy',
	  		amount	   : 5,
	  		credit     : 39,
	      	item_name  : req.body.item_name, 
	      	catogory   : req.body.catogory,
	      	updated_at : Date.now()
  	}).save( function ( err, need, count ){
    	if( err ) return next( err );
    	console.log('insert supply successed');
  	});
  	new Need({
  		need_id	   : need_index++,
      	item_name  : req.body.item_name, 
      	catogory   : req.body.catogory,
      	updated_at : Date.now()
  	}).save( function ( err, need, count ){
    	if( err ) return next( err );
    	console.log('insert supply successed');
    });
  	res.redirect( 'home' );

};

exports.upload = function(req, res) {
	console.log("user session check: " + req.session.user);
	res.render('upload', {
		title: 'Love Spreading',
		user: req.session.user
	});

}

exports.uploadsupply = function(req, res){
	console.log(req.body);
	console.log("user session check: " + req.session.user);
	var face, delivery;
	if (req.body.Checkbox1 == "face") {
		face = req.body.face_location;
	}
	if (req.body.Checkbox2 == "delivery") {
		delivery = req.body.delivery_cost;
	}
	var image = req.body.imgurl + "/convert?width=400&height=400&fit=crop"
	console.log(req.body.catogory);
	new Supply({
		supply_id       : supply_index++,
	    supplier_name	: req.body.name,
	    supplier_id		: req.body.supplier_id,
	    tel				: req.body.tel,
	    email			: req.body.email,
	    item_name		: req.body.item_name,
	    catogory   		: req.body.catogory,
	    amount	   		: req.body.amount,
	    credit	   		: req.body.credit,
	    description		: req.body.description,
	    face       		: face,
	    delivery   		: delivery,
	    image			: image,
      	updated_at 		: Date.now()
  	}).save( function ( err, need, count ){
    	if( err ) return next( err );
    	console.log('upload supply successfully');
    	var redirect = '<html><meta http-equiv="refresh" content="1;url=/home" />'
		var flash = '<h1>成功上傳!</h1></html>';
		res.end(redirect+flash);
  	});
}

exports.uploadneed = function(req, res){
	console.log(req.body);
	console.log("user session check: " + req.session.user);
	var image = req.body.imgurl + "/convert?width=400&height=400&fit=crop"
	console.log(req.body.catogory);
	new NeedSchema({
		need_id    : need_index++,
	    needer_name: req.body.name,
	    item_name  : req.body.item_name,
	    tel		   : req.body.tel,
	    email      : req.body.email,
	    amount	   : req.body.amount,
	    catogory   : req.body.catogory,
	    image	   : image,
	    description: req.body.description,
      	updated_at : Date.now()
  	}).save( function ( err, need, count ){
    	if( err ) return next( err );
    	console.log('upload supply successfully');
    	var redirect = '<html><meta http-equiv="refresh" content="1;url=/home" />'
		var flash = '<h1>成功上傳!</h1></html>';
		res.end(redirect+flash);
  	});
}

exports.login = function(req, res) {
	console.log("login function");
	var account = req.account;
	var password = req.password;

	console.log(account + " " + password);
}

exports.status = function(req, res) {
	res.render("status", {
		session: JSON.stringify(req.session)
	});
}