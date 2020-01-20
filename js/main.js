console.log("File is working")

$(document).ready(function(){
	var price_arr = [];
	$.get('https://api.myjson.com/bins/qzuzi', function(data, status){
		//alert('2');
    //console.log(data);
			//$('#gtdata').html(data);
			
			var product_list = '';
      var product_list_cart = '';
			//for (var i = data.length - 1; i >= 0; i--) {
			for (var i = 0; i< data.length; i++) {
				price_arr.push(data[i].price);
				//console.log(data[i]);
				product_list += '<div class="col-md-3 col-sm-6 col-xs-12 each_item" i_price="'+data[i].price+'" i_discount="'+data[i].discount+'"><div class="pdbox"><div class="card">';
				product_list += '<img class="card-img-top" src="'+data[i].img_url+'" alt="Card image cap"/> <div class="card-body">  <h4 class="card-title"><a>'+ data[i].name +'</a></h4><p class="card-text"><i class="fas fa-rupee-sign"></i>'+data[i].price+' <span class="grey"><del><i class="fas fa-rupee-sign"></i>'+data[i].discount+'</del></span> <span class="grn">'+data[i].discount+'% off</span></p><a href="#" class="btn btn-primary select_product" data-price="'+data[i].price+'" data-discount="'+data[i].discount+'" data-image="'+data[i].img_url+'" data-name="'+data[i].name+'" data-id="'+data[i].id+'" >Add to Cart</a></div></div></div></div>';
        
			}
			console.log(price_arr);
			var max_price =Math.max.apply(null, price_arr);
			var min_price =Math.min.apply(null, price_arr);
			priceRangeInit(min_price,max_price);
			$('#tab_product_list').html(product_list);
      $('#tab_product_cart_list').html(product_list_cart);


   $('.select_product').click(function(){
// console.log($(this));
var price = $(this).data('price');
//alert($(this).data('image'));
        var str = '<div class="cart_div"><div class="pict"><img src="'+$(this).data('image')+'" style="float: left; width:30%; height:110px;" ></div><div class="rgt_cont"><h4 class="item_class">'+$(this).data('name')+'</h4><p><i class="fas fa-rupee-sign"></i><span class="price" data-price="'+$(this).data('price')+'">'+$(this).data('price')+'</span><span class="grey"><del><i class="fas fa-rupee-sign"></i>'+$(this).data('discount')+'</del></span><span class="grn">'+$(this).data('discount')+'%</span></p><div class="add-del-btn"><button type="button" class="altera decrescimo left" style="height:40px; width:15%;" data-id="'+$(this).data('id')+'">-</button><input type="text" style="width:20%;text-align:center; height:40px;"  id="'+$(this).data('id')+'_mid_num" value="1"/><button type="button" class=" add altera acrescimo left" style="height:40px; width:15%;" data-id="'+$(this).data('id')+'">+</button></div></div>';
         $('.selected_product_list').append(str);
         getTotal();
      });
   
		});

$(".price-l-2-h").click(function(){
    sortingD("0",".container .each_item","#tab_product_list","i_price");
 
  });
  $(".price-h-2-l").click(function(){
    sortingD("1",".container .each_item","#tab_product_list","i_price");
 
  });
   $(".disc-h-2-l").click(function(){
    sortingD("1",".container .each_item","#tab_product_list","i_discount");
 
  });

  
/*var $input = $("#mid_num");
$input.val(0);*/

  $("body").on('click','.altera',function(){
   var $input = $('#'+$(this).data('id')+'_mid_num');
   var price_data = $(this).closest('.cart_div').find('.price').data('price');
    var change_price = '';
    // alert(price_data);
    if ($(this).hasClass('acrescimo')){
      var count= parseInt($input.val())+1;
      $input.val(count);
      change_price = price_data * count;
     }
    
    else if ($input.val()>=1){
      var count= parseInt($input.val())-1;
      $input.val(count);
      change_price = price_data * count;
      }

      // alert(change_price);
      $(this).closest('.cart_div').find('.price').text(change_price);
      getTotal();
});

});

function sortingD(v,item,div,params){
  
  var $sorted_items,
  getSorted = function(selector, attrName) {
    return $(
      $(selector).toArray().sort(function(a, b){
          var aVal = parseInt(a.getAttribute(attrName)),
              bVal = parseInt(b.getAttribute(attrName));
            if(v==0){
              return aVal-bVal;
            }else{
              return bVal-aVal;
            }          
      })
    );
  };
$sorted_items = getSorted(item,params).clone();
$(div).html($sorted_items);  
}
function priceSlider(min,max){
	$(".each_item").each(function(){
		var cur_val = parseInt($(this).attr("i_price"));
		if(cur_val>min&&cur_val<max){
			$(this).removeClass("hide");
		}
		else{
			$(this).addClass("hide");
		}
	});
}
function priceRangeInit(min,max){
    $( "#slider-range" ).slider({
      range: true,
      min: min,
      max: max,
      values: [ min, max ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "₹ " + ui.values[ 0 ] + " - ₹ " + ui.values[ 1 ] );
        priceSlider(ui.values[ 0 ],ui.values[ 1 ]);
      }
    });
    $( "#amount" ).val( "₹" + $( "#slider-range" ).slider( "values", 0 ) +
      " - ₹" + $( "#slider-range" ).slider( "values", 1 ) );
}




function getTotal(){
    var total = 0;
    $('.cart_div').each(function(){
      var price = $(this).find('.price').html();
      // console.log(price);
        total += parseFloat(price);
    });
    // console.log(total);
    $('#total').text(total);
}

