(function(){

var item = '<div class="fix_block thumbnail"><img width="150px" height="150px"><div class="caption"><div class="row-fliud"><div class="col-sm-8"><h6></h6><p></p></div><br><a class="btn btn-info down pull-right">More</a></div></div>',
    donate = '<div class="fix_block thumbnail"><img width="150px" height="150px"><div class="caption"><div class="row-fliud"><div class="col-sm-8"><h6></h6><p></p></div><br><a class="btn btn-info down pull-right">More</a></div></div>';

var addButton       = $('#add'),
    charity_btn     = $('#charity'),   
    trade_btn       = $('#trade'),
    latest_btn      = $('#latest'),     //id=0
    cloth_btn       = $('#cloth'),      //id=1
    house_btn       = $('#house'),      //id=2
    stationary_btn  = $('#stationary'), //id=3
    food_btn        = $('#food'),       //id=4
    furniture_btn   = $('#furniture'),  //id=5
    threeC_btn      = $('#threeC'),     //id=6
    kitchen_btn     = $('#kitchen'),    //id=7
    clean_btn       = $('#clean');      //id=8

var flag = $('.modify');
var temp = $(latest_btn).parent('li');;
var newitem = {item_name:'a', catogory: 0};
var i=0;
var bool_charity=0;

addButton.click(function(){
    // console.log(newitem.name);
    newitem.catogory = i++;
    $.ajax({
            type: 'POST',
            data: newitem,
            url: '/create'
        }).done(function( response ) {
            console.log('insert successed');
        });
})

load(0, moreListener);

function load(cat, bind){
    console.log('in load', cat);
    $.getJSON(
        '/supply/'+cat,
    {},
    function(items){
        // console.log('callback');
        // console.log('items[cat]',items[cat].＿id);
        temp.addClass('active');
        $(flag).empty();
        for(var i=0; i<items.length; i++){
            var a = $(item).appendTo(flag);
            var href = '/item/'+bool_charity+'/'+items[i].supply_id;
            console.log('item id',items[i].supply_id);
            a.find('h6').text(items[i].item_name);
            a.find('p').text('Credit: '+items[i].credit);
            a.find('img').attr('src',items[i].image);
            a.find('a').attr('data-id', items[i].supply_id);
            a.find('a').attr('href', href);
        }
        bind();
    }); 
    
};

function need(cat,bind){
    console.log('in need', cat);
    $.getJSON(
        '/need/'+cat,
    {},
    function(items){
        console.log('need get',items);
        temp.addClass('active');
        $(flag).empty();
        for(var i=0; i<items.length; i++){
            var a = $(donate).appendTo(flag);
            var href = '/item/'+bool_charity+'/'+items[i].need_id;
            // console.log('item id',items[i]._id);
            a.find('h6').text(items[i].item_name);
            a.find('img').attr('src',items[i].image);
            a.find('p').text('需求數量: '+items[i].amount);
            a.find('a').attr('data-id', items[i].need_id);
            a.find('a').attr('href', href);
        }
        bind();
    });
};

function moreListener(){       
    $('.more').click(function(){
        // console.log('more button click');
        var id = $( this ).data('id');
        console.log(id);
        more(bool_charity,id);
    });
}

charity_btn.click(function(){
    bool_charity = 1;
    console.log('charity button',bool_charity);
    need(0, moreListener);
    var a= $(charity_btn).parent('li');
    a.addClass('active');
    a.prev().removeClass('active');
});

trade_btn.click(function(){
    bool_charity = 0;
    console.log('trade_btn',bool_charity);
    load(0, moreListener);
    var a= $(trade_btn).parent('li');
    a.addClass('active');
    a.next().removeClass('active');
    temp.removeClass('active');
    // latest_btn.parent('li').addClass('active');
});

latest_btn.click(function(){
    if(bool_charity === 0){
        load(0, moreListener);
    } 
    else{
      need(0, moreListener);  
    } 
    console.log('latest', bool_charity)
    temp.removeClass('active');
    temp = $(this).parent('li');
    temp.addClass('active');
});

cloth_btn.click(function(){
    if(bool_charity === 0){
        load(1, moreListener);
    } 
    else{
      need(1, moreListener);  
    }
    temp.removeClass('active');
    temp = $(this).parent('li');
    temp.addClass('active');
});
house_btn.click(function(){
    if(bool_charity === 0){
        load(2, moreListener);
    } 
    else{
      need(2, moreListener);  
    }
    temp.removeClass('active');
    temp = $(this).parent('li');
    temp.addClass('active');
});
stationary_btn.click(function(){
    if(bool_charity === 0){
        load(3, moreListener);
    } 
    else{
      need(3, moreListener);  
    }
    temp.removeClass('active');
    temp = $(this).parent('li');
    temp.addClass('active');
});
food_btn.click(function(){
    if(bool_charity === 0){
        load(4, moreListener);
    } 
    else{
      need(4, moreListener);  
    }
    temp.removeClass('active');
    temp = $(this).parent('li');
    temp.addClass('active');
});
furniture_btn.click(function(){
    if(bool_charity === 0){
        load(5, moreListener);
    } 
    else{
      need(5, moreListener);  
    }
    temp.removeClass('active');
    temp = $(this).parent('li');
    temp.addClass('active');
});
threeC_btn.click(function(){
    if(bool_charity === 0){
        load(6, moreListener);
    } 
    else{
      need(6, moreListener);  
    }
    temp.removeClass('active');
    temp = $(this).parent('li');
    temp.addClass('active');
});
kitchen_btn.click(function(){
    if(bool_charity === 0){
        load(7, moreListener);
    } 
    else{
      need(7, moreListener);  
    }
    temp.removeClass('active');
    temp = $(this).parent('li');
    temp.addClass('active');
});
clean_btn.click(function(){
    if(bool_charity === 0){
        load(8, moreListener);
    } 
    else{
      need(8, moreListener);  
    }
    temp.removeClass('active');
    temp = $(this).parent('li');
    temp.addClass('active');
});


// $('#myModal').modal(options);

}());