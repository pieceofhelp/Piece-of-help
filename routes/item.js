var mongoose = require( 'mongoose' );
var promise = require( 'promise');
var Supply   = mongoose.model('Supply');
var Need   = mongoose.model('Need');
var Trans = mongoose.model('Trans');
var User = mongoose.model('User');
var trans_index =150;

// var supplier_mail = "";
var gmailer = require("../lib/gmailer.js");


exports.item = function (req, res) {
 	console.log('charity or not',req.params.charity);
 	console.log('in more model ',req.params.id);
 	console.log('in item page',req.params.id);
 	if(req.params.charity==0){

 		Supply.
 			find({supply_id: req.params.id}).
 			sort( '-updated_at' ).
	 		exec( function (err, item){
		    	if(err){
		      		console.error(err);
		    	};
		    	console.log(item);
				res.render('item', {
					title: 'Love Spreading',
					items: item,
					user: req.session.user,
				})
		    });
 	}
 	else{
	 	Need.
	 		find({need_id: req.params.id}).
	 		sort( '-updated_at' ).
	 		exec( function (err, item){
		    	if(err){
		      		console.error(err);
		    	};
		    	console.log(item);
		    	res.render('item', {
					title: 'Love Spreading',
					items: item,
					user: req.session.user,
				})
		    });       		 	
 	}
}

exports.deal = function(req, res){
	// console.log(req.body);
	// console.log("user session check: " + req.session.user);
	// console.log('trans_id before save', trans_index);
	var detail = {
		trans_id   		: trans_index++,	
		supply_id  		: req.body.supply_id,
		supplier_id  	: req.body.supplier_id,
		supplier_name	: req.body.supplier_name,
		item_name  		: req.body.item_name,
    	buyer_id   		: req.body.name,
    	amount	   		: req.body.amount,
    	credit	   		: req.body.credit * req.body.amount,
    	method     		: req.body.method,
      	updated_at 		: Date.now()
      };
    console.log('credit', detail.credit);
    console.log('buyer',detail.buyer_id);
    var buyer , seller;
    console.log('seller',detail.supplier_id);
	User.
	 	findOne({id: detail.buyer_id}).
	 	exec( function (err, user1){
		    	if(err){
		      		console.error(err);
		    	};
		    	// console.log(user1);
		    	buyer = user1;
			    var buyer_credit_before = buyer.credit;
			    console.log('buyer credit before', buyer.credit);
			    var buyer_credit_after = buyer.credit - detail.credit;
			    console.log('buyer credit after', buyer_credit_after);
			    buyer.credit = buyer_credit_after;
			    req.session.user.credit = buyer.credit;
			    buyer.save( {});
		    });

	User.
	 	findOne({id: detail.supplier_id}).
	 	exec( function (err, user2){
		    	if(err){
		      		console.error(err);
		    	};
		    	// console.log(user2);
		    	seller = user2;
			    var seller_credit_before = seller.credit;
			    console.log('seller credit before', seller.credit);
			    var seller_credit_after = seller.credit + detail.credit;
			    console.log('seller credit after', seller_credit_after);
   			    seller.credit = seller_credit_after;
			    seller.save({});

		    	console.log('seller aaaaaaa', seller);
		    }); 
	
	new Trans(detail)
	.save( function ( err, need, count ){
    	if( err ) return next( err );
    	console.log('transaction successfully');
    	console.log('item trans_id',detail.trans_id);
    	console.log('seller bbbbb', seller);
    	// console.log(detail);
    	res.render('deal_done', {
					title: 'Love Spreading',
					seller: seller,
					item: detail,
					user: req.session.user
				})
    });

	//寄信給賣家
	User.find({
		id: req.body.name
	}, function(err, users) {
		console.log(users);
		if(users.length){
			//賣家mail
			var supplier_mail="";
			User.find({
				id: req.body.supplier_id
			}, function(err, users) {
				supplier_mail = users[0].email;
			})
			// console.log('supplier_mail'+ supplier_mail);

			var mailOptions = {
				from: "lovespreading2014@gmail.com", // sender address
				to: users[0].email, // list of receivers
				subject: "Transaction Success on Love Spreading!", // Subject line
				html: "Congratulation!!<br>"+
				"Your items on Love Spreading has been bought by someone else!<br><br>"+
				"您已成功賣出以下商品 : "+detail.item_name+"<br>"+
				"商品數量 : "+detail.amount+"<br>"+
				"交易編號 : "+detail.trans_id+"<br>"+
				"您得到的Credit : "+detail.credit+"<br><br>"+

				"以下為買家聯絡方式，請勿散布或做其他非法用途<br>"+
				"並請盡快聯絡買家確認出貨事宜!<br>"+
				"姓名 : "+users[0].name+"<br>"+
				"電話 : "+users[0].tel+"<br>"+
				"Email : "+users[0].email+"<br>"+
				"感謝您利用Love Spreading網站交換二手物資，期待再度為您服務" // html body
			}

			console.log('mailOptions:'+ mailOptions);
			gmailer.sendGmail(mailOptions);
		}
		console.log('mail sent successfully!!');
	})

	Supply.find({
		supply_id: detail.supply_id
	},function(err, item) {
		console.log(item);
		var remain = item[0].amount - detail.amount;
		if(remain>0){
			item[0].amount = remain;
			item[0].save( function(err, seller, count){
			    	if( err ) return next( err );
			    	console.log("amount now is" +item[0].amount);
			    });
		}
		else{
			item[0].remove({});
			console.log(detail.supply_id+'has been removed');
		}
	})
}

exports.destroy = function ( req, res, next ){
  Supply.findById( req.params.id, function ( err, supply ){
    supply.remove({})
    res.redirect( '/profile/'+req.session.user );
  });
};