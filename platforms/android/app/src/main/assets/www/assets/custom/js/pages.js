var left_side_content = '';
var Event_id_for_details = 0;
var category_id_chek_by_user = 0;
var category_name_chek_by_user = '';
var sub_category_name_chek_by_user = '';
var sub_category_id_chek_by_user = 0;
var otp_verify_user_mno = 0;
var otp_verify_user_id = 0;
var edit_vendor_goods_id = 0;
var give_feedback_vendor_id = 0;
var give_feedback_order_id = 0;
var payment_check = 0;
var customer_plan_check = '';
var user_check_her_order_subscription_by_order_id = 0;
var vender_check_user_order_subscription_by_order_id = 0;
var user_veiw_vendor_info = 0;
var category_veiw_vendor_info = 0;
var category_veiw_selected_busi_cat_id = 0;
var category_id_chek_by_vendor = 0;
var category_name_chek_by_vendor = 0;
var category_type_chek_by_vendor = 'onetime';
var discount_edit_goods_id = 0;
var coupon_id_edit = 0;
var free_offer_edit_id = 0;
var combo_id_goods_edit = 0;
var avail_mandi_points_for_payment_page = 0;

var redirect_page_name = '';
var gotolist = '';
var gotoadd = '';
var come_to_delivery_page = '';
var user_cart_open_page_last_goods_type = '';
var total_price_grter_than_avail = 'No';
var lmapp_continue_a_order_data_user = [];
var cashback_amount = 0;
var cashback_amount_percent = 0;

var counter_for_cart_item_count = 0;
var order_id_for_all_together_orders = 0;
'use strict';

console.log(JSON.parse(localStorage.getItem("publicsection_charity")));
var user_detail = [];
var data_uuid = [];
if(JSON.parse(localStorage.getItem("publicsection_charity")) == 'true'){ /*not login*/
	console.log('1')
	$(".is_private").addClass('display_none');
	$(".is_public").removeClass('display_none');
} else if(JSON.parse(localStorage.getItem("privatesection_charity")) == 'true'){
	console.log('2');
	var oooo =[];
	var ssss =[];
	if(JSON.parse(localStorage.getItem("lmapp_cart_store"))){
		 oooo = (JSON.parse(localStorage.getItem("lmapp_cart_store")));	
	}
	if(JSON.parse(localStorage.getItem("lmapp_cart_store_sub"))){
		 ssss = (JSON.parse(localStorage.getItem("lmapp_cart_store_sub")));	
	}
	counter_for_cart_item_count = oooo.length + ssss.length ;
	console.log(counter_for_cart_item_count);
	$(".is_public").addClass('display_none');
	$(".is_private").removeClass('display_none');
	
	user_detail = JSON.parse(localStorage.getItem("lmapp_user_details"));
	console.log(user_detail);
	var data = {
		user_id : user_detail.user_id,
	}
	$.post(API_URL+'users/fatch_profile', data)
		.success(function (data, status) {
			console.log(data.data);
			if(data.status == 200){
			user_detail	= data.data[0];	
			$('.full_name').html(user_detail.full_name);
			$('.user_photo').attr('src',APP_BASE_URL+'uploads/'+user_detail.user_img);
			//localStorage.setItem("lmapp_user_details", JSON.stringify(user_detail));
			}
		})
		.error(function (data, status) {
		});
}else{
}

var cart_data = (JSON.parse(localStorage.getItem("lmapp_cart_store")));	
if(jQuery.isEmptyObject(cart_data)){
		var cart_data = [] ;
}else{
	
}
/*
setTimeout(function(){ 
	var element = $(
			'<li>'
			+	'<strong>Nearest Beacon</strong><br />'
			+	'UUID: <span class="uuid"> mNearestBeacon.uuid </span><br />'
			+	'Major: <span class="major"> mNearestBeacon.major </span><br />'
			+	'Minor: <span class="minor"> mNearestBeacon.minor </span><br />'
			+	'Proximity: <span class="proximity"> mNearestBeacon.proximity</span><br />'
			+	'Distance: <span class="accuracy"> mNearestBeacon.accuracy</span><br />'
			+	'RSSI: <span class="rssi"> mNearestBeacon.rssi </span><br />'
			+ '</li>'
			);
		$('#beacon').append(element);
		$("#beacon_new_user").trigger("click");
		console.log('clicked');

}, 500);
*/
$('body').on('click','#beacon_new_user',function(e){
	if($(e.target).data('oneclicked')!='yes') {
		data_uuid = JSON.parse(localStorage.getItem("data_uuid"));
		var current_date = parseInt(($.now())/1000);
		//console.log(data_uuid.last_time);
		console.log(current_date);
		var time_diff = current_date;// - data_uuid.last_time;
		var is_new_user = 'yes';
		if(time_diff > 20){
			//is_new_user = 'yes';
		}
		
		if(is_new_user == 'yes'){
			console.log(is_new_user);
			var rssi = $('.rssi').text();
			var uuid = $('.uuid').text();
			var major = $('.major').text();
			var minor = $('.minor').text();
			var proximity = $('.proximity').text();
			var accuracy = $('.accuracy').text();
			if(rssi){
				console.log('got');
				console.log(user_detail.first_name);
				
				var data = {
					customer_name : user_detail.first_name,
					uuid : uuid,
					major : major,
					minor : minor,
					proximity : proximity,
					accuracy : accuracy,
					rssi : rssi,
				}
				$.post(API_URL+'users/update_new_user', data)
				.success(function (data, status) {
					console.log('done');
					console.log(data.table_no);
					var data_uuid1 = {
						customer_name : user_detail.first_name,
						uuid : uuid,
						major : major,
						minor : minor,
						proximity : proximity,
						accuracy : accuracy,
						rssi : rssi,
						table_no : data.table_no,
						last_time : current_date,
					}
					localStorage.setItem("data_uuid", JSON.stringify(data_uuid1));
					data_uuid = JSON.parse(localStorage.getItem("data_uuid"));
					console.log(data_uuid);
					
				})
				.error(function (data, status) {
				});
				
			}else{
				console.log('waiting');
			}
		}
	}
	$(e.target).data('oneclicked','yes');
	setTimeout(function(){ 
		$(e.target).data('oneclicked','no');
	}, 500);
});

$('body').on('click','.go_to_cart_html',function(e){
	var oooo =[];
	var ssss =[];
	if(JSON.parse(localStorage.getItem("lmapp_cart_store"))){
		oooo = (JSON.parse(localStorage.getItem("lmapp_cart_store")));	
	}
	if(JSON.parse(localStorage.getItem("lmapp_cart_store_sub"))){
		ssss = (JSON.parse(localStorage.getItem("lmapp_cart_store_sub")));	
	}
	if(user_cart_open_page_last_goods_type == 'onetimegoods'){
			mainView.router.load({url: 'cart.html'});
	}else if(user_cart_open_page_last_goods_type == 'subtimegoods'){
		mainView.router.load({url: 'cart_subscription.html'});
		console.log(user_cart_open_page_last_goods_type);
	}else{
		
			if(oooo.length != 0){
				user_cart_open_page_last_goods_type == 'onetimegoods';
				mainView.router.load({url: 'cart.html'});
			}else if(ssss.length != 0){
				user_cart_open_page_last_goods_type == 'subtimegoods';
				mainView.router.load({url: 'cart_subscription.html'});
			}else{
				user_cart_open_page_last_goods_type == '';
				mainView.router.load({url: 'cart.html'});
			}
	}
	
});	
	
	
if(user_detail.user_type=='vendor'){
	$('.user_panel').addClass('display_none');
	$('.vendor_panel').removeClass('display_none');
}


if(user_detail.user_type=='customer'){
	$('.vendor_panel').addClass('display_none');
	$('.user_panel').removeClass('display_none');
}	

$('body').on('click','#paymentFinalStauts',function(e){
	console.log('paymentFinalStauts');
	if($(e.target).data('oneclicked')!='yes') {
		var payment_type = $(this).attr('payment_type');
		var payment_token_p = $('#'+payment_type).attr('payment_token_p');
		var from_ = $('#paymentWithUpi').attr('from_');
		if(from_ == 'add_point'){
			mainView.router.load({url: 'money_point_invoice.html'});
		}else if(from_ == 'pay_point'){
			mainView.router.load({url: 'money_point_invoice.html'});
		}else{
			mainView.router.load({url: 'invoice.html'});
		}
	}
	$(e.target).data('oneclicked','yes');
	setTimeout(function(){ 
		$(e.target).data('oneclicked','no');
	}, 500);
});

/*this is testing code, we have to remove
$('body').on('click','#paymentWithoutUpi',function(e){
	mainView.router.load({url: 'check_delivery_info.html'});
	
});
*/


/*
|------------------------------------------------------------------------------
| Log In
|------------------------------------------------------------------------------
*/

myApp.onPageInit('login', function(page) {
	var player_id = '';
	var player_counter = 0;
	
	/* Show|Hide Password */
	$$('.page[data-page=login] [data-action=show-hide-password]').on('click', function() {
		if ($$('.page[data-page=login] input[data-toggle=show-hide-password]').attr('type') === 'password') {
			$$('.page[data-page=login] input[data-toggle=show-hide-password]').attr('type', 'text');
			$$(this).attr('title', 'Hide');
			$$(this).children('i').text('visibility_off');
		}
		else {
			$$('.page[data-page=login] input[data-toggle=show-hide-password]').attr('type', 'password');
			$$(this).attr('title', 'Show');
			$$(this).children('i').text('visibility');
		}
	});

	$('.page[data-page=login] form[name=login]').validate({
		//console.log(API_URL);
		rules: {
			user_email1: {
				required: true,
			},
			user_password: {
				required: true
			}
		},
		messages: {
			user_email1: {
				required: 'Please enter email address.',
			},
			user_password: {
				required: 'Please enter password.'
			}
		},
		onkeyup: false,
		errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			var user_email = $('#user_email1').val();
			var user_password = $('#user_password').val();
			var user_type = $('#user_type').val();
			console.log(player_id);
			myApp.showIndicator();
			var data ={
				user_email:user_email,
				user_password:user_password,
				user_type:user_type,
				payer_id:player_id,
			}
			
			
         $.post(API_URL+'users/login', data)
				.success(function (data, status) {
					 myApp.hideIndicator();
					console.log(data.message);
					if(data.status == 200){
						//console.log(data.data);
						localStorage.clear();
						localStorage.setItem("lmapp_user_details", JSON.stringify(data.data));
						
						user_detail = JSON.parse(localStorage.getItem("lmapp_user_details"));
						localStorage.setItem("publicsection_charity", JSON.stringify('false'));
						localStorage.setItem("privatesection_charity", JSON.stringify('true'));
						
						
						$(".is_private").removeClass('display_none');
						$(".is_public").addClass('display_none');
						$('.full_name').html(user_detail.first_name);
						$('.user_photo').attr('src',APP_BASE_URL+'uploads/'+user_detail.user_img);
	
						myApp.addNotification({
							message:data.message,
							hold: 4000,
							button: {
								text: 'logged In'
							}
						});
						console.log(user_detail.area_id);
							
							if(user_detail.user_type=='vendor'){
								$('.user_panel').addClass('display_none');
								$('.vendor_panel').removeClass('display_none');
							}

							if(user_detail.user_type=='customer'){
								$('.vendor_panel').addClass('display_none');
								$('.user_panel').removeClass('display_none');
							}	
							mainView.router.load({url: 'food_menu.html'});
							
							/*
							var xx = "window.plugins.socialsharing.share('Buy local...Be local. Become a localmandi user like me & get 5% off on your first order if you sign up using my referral code ";
							xx = xx+user_detail.user_moblie_number;
							xx = xx+"' , null, 'http://localmandi.net/assets/img/logo.png', 'https://play.google.com/store/apps/details?id=com.phonegap.Localmandi')";
							$('.share_onclick').attr('onclick',xx);
							*/
					}else{
						myApp.addNotification({message:data.message,hold: 3000});
					}
				})
				.error(function (data, status) {
					//toastr.error(data.message, 'Error');
				});	
			
			
		}
	});

});


/*
|------------------------------------------------------------------------------
| Log In
|------------------------------------------------------------------------------
*/

myApp.onPageInit('vender_login', function(page) {
	var player_id = '';
	myApp.showIndicator();	
	var player_counter = 0;
	setInterval(function(){
		player_counter++;
		player_id = $('#player_id').attr('payer_id');
		//console.log(player_id);
		if(player_id != '' && player_id != undefined){//console.log('hideIndicator1');
			myApp.hideIndicator();
		}else if(player_counter == 5){//console.log('hideIndicator');
			myApp.hideIndicator();
		}
		//console.log(player_counter);
	}, 1000);
	
	/* Show|Hide Password */
	$$('.page[data-page=vender_login] [data-action=show-hide-password]').on('click', function() {
		if ($$('.page[data-page=vender_login] input[data-toggle=show-hide-password]').attr('type') === 'password') {
			$$('.page[data-page=vender_login] input[data-toggle=show-hide-password]').attr('type', 'text');
			$$(this).attr('title', 'Hide');
			$$(this).children('i').text('visibility_off');
		}
		else {
			$$('.page[data-page=vender_login] input[data-toggle=show-hide-password]').attr('type', 'password');
			$$(this).attr('title', 'Show');
			$$(this).children('i').text('visibility');
		}
	});

	$('.page[data-page=vender_login] form[name=login]').validate({
		//console.log(API_URL);
		rules: {
			user_email2: {
				required: true,
				minlength: 10,
				maxlength: 10,
      },
      user_password2: {
				required: true
			}
		},
    messages: {
			user_email2: {
				required: 'Please enter mobile number.',
				minlength: 'Please enter a valid mobile number.',
				maxlength: 'Please enter a valid mobile number.',
      },
			user_password2: {
				required: 'Please enter password.'
      }
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
		var user_email = $('#user_email2').val();
		var user_password = $('#user_password2').val();
		var user_type = $('#user_type2').val();
		myApp.showIndicator();
		var data ={
			user_email:user_email,
			user_password:user_password,
			user_type:user_type,
			payer_id:player_id,
		}
		
			
         $.post(API_URL+'users/login', data)
				.success(function (data, status) {
					 myApp.hideIndicator();
					console.log(data.message);
					if(data.status == 200){
						//console.log(data.data);
						localStorage.clear();
						localStorage.setItem("lmapp_user_details", JSON.stringify(data.data));
						
						user_detail = JSON.parse(localStorage.getItem("lmapp_user_details"))
						localStorage.setItem("publicsection_charity", JSON.stringify('false'));
						localStorage.setItem("privatesection_charity", JSON.stringify('true'));
						localStorage.setItem("post_from_type", JSON.stringify('None'));
						localStorage.setItem("post_from_type_id", JSON.stringify(0));
						console.log(localStorage);
						
						$(".is_private").removeClass('display_none');
						$(".is_public").addClass('display_none');
						$('.full_name').html(user_detail.full_name);
						$('.user_photo').attr('src',APP_BASE_URL+'uploads/'+user_detail.user_img);
	
						myApp.addNotification({
							message:data.message,
							hold: 4000,
							button: {
								text: 'logged In'
							}
						});
						
							if(user_detail.user_type=='vendor'){
								$('.user_panel').addClass('display_none');
								$('.vendor_panel').removeClass('display_none');
							}


							if(user_detail.user_type=='customer'){
								$('.vendor_panel').addClass('display_none');
								$('.user_panel').removeClass('display_none');
							}	

						
							if(user_detail.user_type=='vendor'){
								console.log(data.user_select_location);
								if(data.user_select_location=='No'){
									mainView.router.load({url: 'vendor_area.html'});
								}else{
									mainView.router.load({url: 'vendor_order_list.html'});
								}
								
								
							}else{
								if(data.user_select_location=='No'){
									mainView.router.load({url: 'user_area.html'});
								}else{
									mainView.router.load({url: 'subscription.html'});
								}
							}	
						
						
											
					}else{
						myApp.addNotification({message:data.message,hold: 3000});
					}
				})
				.error(function (data, status) {
					//toastr.error(data.message, 'Error');
				});	
			
			
		}
	});

});

myApp.onPageInit('vendoradmin', function(page) {
	var player_id = '';
	myApp.showIndicator();	
	var player_counter = 0;
	setInterval(function(){
		player_counter++;
		player_id = $('#player_id').attr('payer_id');
		//console.log(player_id);
		if(player_id != '' && player_id != undefined){//console.log('hideIndicator1');
			myApp.hideIndicator();
		}else if(player_counter == 5){//console.log('hideIndicator');
			myApp.hideIndicator();
		}
		//console.log(player_counter);
	}, 1000);
	
	/* Show|Hide Password */
	$$('.page[data-page=vendoradmin] [data-action=show-hide-password]').on('click', function() {
		if ($$('.page[data-page=vender_login] input[data-toggle=show-hide-password]').attr('type') === 'password') {
			$$('.page[data-page=vender_login] input[data-toggle=show-hide-password]').attr('type', 'text');
			$$(this).attr('title', 'Hide');
			$$(this).children('i').text('visibility_off');
		}
		else {
			$$('.page[data-page=vender_login] input[data-toggle=show-hide-password]').attr('type', 'password');
			$$(this).attr('title', 'Show');
			$$(this).children('i').text('visibility');
		}
	});

	$('.page[data-page=vendoradmin] form[name=login]').validate({
		//console.log(API_URL);
		rules: {
			user_email2: {
				required: true,
				minlength: 10,
				maxlength: 10,
      },
      user_password2: {
				required: true
			}
		},
    messages: {
			user_email2: {
				required: 'Please enter mobile number.',
				minlength: 'Please enter a valid mobile number.',
				maxlength: 'Please enter a valid mobile number.',
      },
			user_password2: {
				required: 'Please enter password.'
      }
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
		var user_email = $('#user_email2').val();
		var user_password = $('#user_password2').val();
		var user_type = $('#user_type2').val();
		myApp.showIndicator();
		var data ={
			user_email:user_email,
			user_password:user_password,
			user_type:user_type,
			payer_id:player_id,
		}
		
			
         $.post(API_URL+'users/vendoradmin', data)
				.success(function (data, status) {
					 myApp.hideIndicator();
					console.log(data.message);
					if(data.status == 200){
						//console.log(data.data);
						localStorage.clear();
						localStorage.setItem("lmapp_user_details", JSON.stringify(data.data));
						
						user_detail = JSON.parse(localStorage.getItem("lmapp_user_details"))
						localStorage.setItem("publicsection_charity", JSON.stringify('false'));
						localStorage.setItem("privatesection_charity", JSON.stringify('true'));
						localStorage.setItem("post_from_type", JSON.stringify('None'));
						localStorage.setItem("post_from_type_id", JSON.stringify(0));
						console.log(localStorage);
						
						$(".is_private").removeClass('display_none');
						$(".is_public").addClass('display_none');
						$('.full_name').html(user_detail.full_name);
						$('.user_photo').attr('src',APP_BASE_URL+'uploads/'+user_detail.user_img);
	
						myApp.addNotification({
							message:data.message,
							hold: 4000,
							button: {
								text: 'logged In'
							}
						});
						
							if(user_detail.user_type=='vendor'){
								$('.user_panel').addClass('display_none');
								$('.vendor_panel').removeClass('display_none');
							}


							if(user_detail.user_type=='customer'){
								$('.vendor_panel').addClass('display_none');
								$('.user_panel').removeClass('display_none');
							}	

						
							if(user_detail.user_type=='vendor'){
								console.log(data.user_select_location);
								if(data.user_select_location=='No'){
									mainView.router.load({url: 'vendor_area.html'});
								}else{
									mainView.router.load({url: 'vendor_order_list.html'});
								}
								
								
							}else{
								if(data.user_select_location=='No'){
									mainView.router.load({url: 'user_area.html'});
								}else{
									mainView.router.load({url: 'subscription.html'});
								}
							}	
						
						
											
					}else{
						myApp.addNotification({message:data.message,hold: 3000});
					}
				})
				.error(function (data, status) {
					//toastr.error(data.message, 'Error');
				});	
			
			
		}
	});

});

/*
|------------------------------------------------------------------------------
| Sign Up
|------------------------------------------------------------------------------
*/

myApp.onPageInit('signup', function(page) {

	/* Show|Hide Password */
	$$('.page[data-page=signup] [data-action=show-hide-password]').on('click', function() {
		if ($$('.page[data-page=signup] input[data-toggle=show-hide-password]').attr('type') === 'password') {
			$$('.page[data-page=signup] input[data-toggle=show-hide-password]').attr('type', 'text');
			$$(this).attr('title', 'Hide');
			$$(this).children('i').text('visibility_off');
		}
		else {
			$$('.page[data-page=signup] input[data-toggle=show-hide-password]').attr('type', 'password');
			$$(this).attr('title', 'Show');
			$$(this).children('i').text('visibility');
		}
	});
	
	var calendarBasic = myApp.calendar({
		input: '.page[data-page=signup] #date_ob'
	});
	
	var data = {
		user_id : '',
	}
	$.post(API_URL+'category/fatch_all_vendor_bussiness_categories', data)
		.success(function (data, status) {
			if(data.status == 200){
				var val = data.data ;
				var content = '';
				var i=0;
				for(i=0;i< val.length;i++){
					content += '<option value="'+val[i]['cat_id']+'">'+val[i]['cat_name']+'</option>';
				}
				$('#bussiness_cat').html(content);
				setTimeout(  function()   {
					$('#bussiness_cat').attr('multiple','multiple');
					$('#bussiness_cat').ultraselect();
				}, 500);
				
			}
		})
		.error(function (data, status) {
		});
		
	$$('.page[data-page=signup] .gen_speci').on('change', function() {	
		var gen_speci= $$('.page[data-page=signup] .gen_speci:checked').val();
		if(gen_speci == 'GST'){
			$$('.page[data-page=signup] #gst_number').val('');
			$$('.page[data-page=signup] #pan_number').val('empty');
			$$('.page[data-page=signup] #date_ob').val('empty');
			$$('.page[data-page=signup] #sur_name').val('empty');
			$$('.page[data-page=signup] .for_other_details').addClass('display_none');
			$$('.page[data-page=signup] .for_gst_data').removeClass('display_none');
		}else{
			$$('.page[data-page=signup] #pan_number').val('');
			$$('.page[data-page=signup] #date_ob').val('');
			$$('.page[data-page=signup] #sur_name').val('');
			$$('.page[data-page=signup] #gst_number').val('empty');
			$$('.page[data-page=signup] .for_gst_data').addClass('display_none');
			$$('.page[data-page=signup] .for_other_details').removeClass('display_none');
		}
	
	});
	
	/* Validate & Submit Form */
	$('.page[data-page=signup] form[name=signup-email]').validate({ 
		rules: {
			full_name: {
				required: true
			},
			bussiness_cat: {
				required: true
			},
			bussiness_name: {
				required: true
			},
			full_address: {
				required: true
			},
			gst_number: {
				required: true
			},
			pan_number: {
				required: true
			},
			date_ob: {
				required: true
			},
			sur_name: {
				required: true
			},
			user_moblie_number: {
				required: true,
				minlength: 10,
				maxlength: 10,
				
			},
			user_password: {
				required: true,
				minlength: 6
			
			}
		},
		messages: {
			full_name: {
				required: 'Please enter First name.'
			},
			bussiness_cat: {
				required: 'Please select Bussiness.'
			},
			bussiness_name: {
				required: 'Please enter Bussiness Name.'
			},
			full_address: {
				required: 'Please enter address.'
			},
			gst_number: {
				required: 'Please enter GST number.'
			},
			pan_number: {
				required: 'Please enter PAN number.'
			},
			date_ob: {
				required: 'Please enter D.O.B.'
			},
			sur_name: {
				required: 'Please enter Surname.'
			},
			user_moblie_number: {
				required: 'Please enter mobile number.',
				minlength: 'Please enter a valid mobile number.',
				maxlength: 'Please enter a valid mobile number.',
			  },
				user_password: {
				required: 'Please enter password.',
				minlength: 'Password must be at least 6 characters long.',
				
			}
		},
		onkeyup: false,
		errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			//var bussiness_cat_input =[];
			var bussiness_cat_string = [];
			$('.bussiness_cat options checked').each(function(key,val){
				bussiness_cat_string[key] = $(this).text();
			});
			if(bussiness_cat_string.length==0){
				bussiness_cat_string[0]='';
			}
			bussiness_cat_string = bussiness_cat_string.toString();
			console.log($('.bussiness_cat').val().toString());
			console.log(bussiness_cat_string);
			
			var full_name = $('#full_name').val();
			var bussiness_cat = $('.bussiness_cat').val().toString();
			var bussiness_name = $('#bussiness_name').val();;
			var user_moblie_number = $('#user_moblie_number').val();
			var user_password = $('#user_password').val();
			var full_address = $('#full_address').val();
			var gst_number = $('#gst_number').val();
			var pan_number = $('#pan_number').val();
			var date_ob = $('#date_ob').val();
			var sur_name = $('#sur_name').val();
			
			myApp.showIndicator();
			var data ={
				full_name:full_name,
				bussiness_cat:bussiness_cat,
				user_type:'vendor',
				user_moblie_number:user_moblie_number,
				user_password:user_password,
				full_address:full_address,
				bussiness_name:bussiness_name,
				gst_number:gst_number,
				pan_number:pan_number,
				date_ob:date_ob,
				sur_name:sur_name,
			}
			$.post(API_URL+'users/register', data)
			.success(function (data, status) {
				 myApp.hideIndicator();
				console.log(data.message);
				if(data.status == 200){
					console.log(data.status);
					
					otp_verify_user_mno=data.mno;
					otp_verify_user_id=data.id;
					 var verify_code=(data.verify_code);
					
					var data1 ={
						
					}
					$.post('http://api.msg91.com/api/sendotp.php?authkey=201746A7n0DFY85aa21db4&mobile=91'+otp_verify_user_mno+'&message=Your%20lmapp%20otp%20is%20'+verify_code+'&sender=senderid&otp='+verify_code,data1)
						.success(function (data, status) {
						})
						.error(function (data, status) {
						});
					myApp.addNotification({
							message:data.message,
							hold: 4000,
							button: {
							text: 'logged In'
						}
							
						});
				mainView.router.load({url: 'otp_vertfy.html'});
										
				}else{
					myApp.addNotification({message:data.message,hold: 4000});
				}
			})
			.error(function (data, status) {
			});	
		}
	});

});	

myApp.onPageInit('signup_user', function(page) {

	/* Show|Hide Password */
	$$('.page[data-page=signup_user] [data-action=show-hide-password]').on('click', function() {
		if ($$('.page[data-page=signup_user] input[data-toggle=show-hide-password]').attr('type') === 'password') {
			$$('.page[data-page=signup_user] input[data-toggle=show-hide-password]').attr('type', 'text');
			$$(this).attr('title', 'Hide');
			$$(this).children('i').text('visibility_off');
		}
		else {
			$$('.page[data-page=signup_user] input[data-toggle=show-hide-password]').attr('type', 'password');
			$$(this).attr('title', 'Show');
			$$(this).children('i').text('visibility');
		}
	});

	/* Validate & Submit Form */
	$('.page[data-page=signup_user] form[name=signup-email1]').validate({
		rules: {
			first_name: {
				required: true
			},
			last_name: {
				required: true
			},
			user_email: {
				required: true,	
			},
			user_password: {
				required: true,
				minlength: 6
			
			}
		},
		messages: {
			first_name: {
				required: 'Please enter First name.'
			},
			last_name: {
				required: 'Please enter Last name.'
			},
			user_email: {
				required: 'Please enter Email Id.',
			},
			user_password: {
				required: 'Please enter password.',
				minlength: 'Password must be at least 6 characters long.',
			}
		},
		onkeyup: false,
		errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
		var first_name = $('#first_name').val();
		var last_name = $('#last_name').val();
		var user_email = $('#user_email').val();
		var user_password = $('#user_password').val();
		myApp.showIndicator();
		var data ={
			first_name:first_name,
			last_name:last_name,
			user_type:'customer',
			user_email:user_email,
			user_password:user_password,
		}
		$.post(API_URL+'users/register', data)
				.success(function (data, status) {
					 myApp.hideIndicator();
					console.log(data.message);
					if(data.status == 200){
						console.log(data.status);
						console.log(data.verify_code);
						otp_verify_user_email=data.email;
						otp_verify_user_id=data.id;
						var verify_code=(data.verify_code);
						
						var data1 ={
							
						}/*
						$.post('http://api.msg91.com/api/sendotp.php?authkey=201746A7n0DFY85aa21db4&mobile=91'+otp_verify_user_mno+'&message=Your%20lmapp%20otp%20is%20'+verify_code+'&sender=senderid&otp='+verify_code,data1)
							.success(function (data, status) {
							})
							.error(function (data, status) {
							});*/
						myApp.addNotification({
								message:data.message,
								hold: 4000,
								button: {
								text: 'logged In'
							}
								
							});
					mainView.router.load({url: 'otp_vertfy.html'});
											
					}else{
						myApp.addNotification({message:data.message,hold: 1500});
					}
				})
				.error(function (data, status) {
				});	
		}
	});

});	

myApp.onPageInit('OTPpage', function(page) {
	
	$$('.page[data-page=OTPpage] .resendotp').on('click', function() {
			
		var data ={user_id:otp_verify_user_id,}
		$.post(API_URL+'users/resendotp', data)
			.success(function (data, status) {
				if(data.status == 200){
					var verify_code=data.verify_code;
					
						var data1 ={
			
							}/*
					$.post('http://api.msg91.com/api/sendotp.php?authkey=201746A7n0DFY85aa21db4&mobile=91'+otp_verify_user_mno+'&message=Your%20lmapp%20otp%20is%20'+verify_code+'&sender=senderid&otp='+verify_code,data1)
					.success(function (data, status) {
					})
					.error(function (data, status) {
					});
					*/
				
				}
			})
			.error(function (data, status) {
			});
							
	});

			


	/* Validate & Submit Form */
	$('.page[data-page=OTPpage] form[name=otp]').validate({
		rules: {
			
			otp_verify: {
				required: true,
				minlength: 4,
				maxlength: 4,
				
			},
			  
		},
		messages: {
		
			otp_verify: {
				required: 'Please OTP.',
				minlength: 'Please enter 4 digit OTP .',
				maxlength: 'Please enter 4 digit OTP .',
				
			},
				
		},
		onkeyup: false,
		errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
		
		var otp_verify = $('#otp_verify').val();
		myApp.showIndicator();
		var data ={
			user_id:otp_verify_user_id,
			otp_verify:otp_verify,
			
		}
		$.post(API_URL+'users/otp_verify', data)
				.success(function (data, status) {
					 myApp.hideIndicator();
					console.log(data.message);
					if(data.status == 200){
						console.log(data.status);
						myApp.addNotification({
								message:data.message,
								hold: 4000,
								
							});
					mainView.router.load({url: 'login.html'});
											
					}else{
						myApp.addNotification({message:data.message,hold: 1500});
					}
				})
				.error(function (data, status) {
				});	
		}
	});

});	


/*
|------------------------------------------------------------------------------
| Forgot Password
|------------------------------------------------------------------------------
*/

myApp.onPageInit('forgot-password', function(page) {
var user_image = '';
var user_email2 = '';
var verify_code = '';
	$('.page[data-page=forgot-password] form[name=forgot-password]').validate({
		rules: {
			user_email: {
				required: true,
			}
		},
		messages: {
			user_email: {
				required: 'Please enter email address.',
				}
		},
		onkeyup: false,
		errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.popup('.popup-password-reset-token');
			 user_email = $('#user_email').val();
			otp_verify_user_email= user_email;
			myApp.showIndicator();
			var data ={
				user_email:user_email,
			}
			$.post(API_URL+'users/resendotp_forgetpassword', data)
				.success(function (data, status) {
					myApp.hideIndicator();
					if(data.status == 200){
						console.log(data.status);
						console.log(data.verify_code);
						//user_image = data.data;
						
						
							verify_code=data.verify_code;
						
							var data1 ={
				
								}/*
						$.post('http://api.msg91.com/api/sendotp.php?authkey=201746A7n0DFY85aa21db4&mobile=91'+otp_verify_user_mno+'&message=Your%20lmapp%20otp%20is%20'+verify_code+'&sender=senderid&otp='+verify_code,data1)
						.success(function (data, status) {
						})
						.error(function (data, status) {
						});
						*/
						
						
					myApp.addNotification({message:data.message,hold: 1500});
					
											
					}else{
						myApp.addNotification({message:data.message,hold: 1500});
					}
				})
				.error(function (data, status) {
				});
			}
	});

	$('.popup-password-reset-token form[name=password-reset-token]').validate({
		
		rules: {
			verify_code: {
				required: true
			}
		},
		messages: {
			verify_code: {
				required: 'Please enter Code.'
			}
		},
		onkeyup: false,
		errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.closeModal('.popup-password-reset-token');
		
			verify_code = $('#verify_code').val();
			myApp.showIndicator();
			var data ={
				user_email:otp_verify_user_email,
				verify_code:verify_code,
		}
		$.post(API_URL+'users/rest_user_password_check', data)
				.success(function (data, status) {
					 myApp.hideIndicator();
					if(data.status == 200){
						console.log(data.status);
					myApp.addNotification({message:data.message,hold: 1500});
					myApp.popup('.popup-reset-password');						
					}else{
						myApp.addNotification({message:data.message,hold: 1500});
					}
				})
				.error(function (data, status) {
				});
		}
	});

	$('.user_photo_img').attr('src',APP_BASE_URL+'uploads/'+user_image);
	$('.popup-reset-password form[name=reset-password]').validate({
		rules: {
			new_passwd: {
				required: true,
				minlength: 6
			},
			confirm_password: {
				required: true,
				equalTo: '.popup-reset-password form[name=reset-password] input[name=new_passwd]'
			}
		},
    messages: {
			new_passwd: {
				required: 'Please enter new password.',
				minlength: 'New password must be at least 6 characters long.'
			},
			confirm_password: {
				required: 'Password confirmation is required.',
				equalTo: 'Both the passwords must match.'
			}
		},
		onkeyup: false,
		errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.closeModal('.popup-reset-password');
			var new_passwd = $('#new_passwd').val();
			myApp.showIndicator();
			var data ={
				user_email:user_email,
				verify_code:verify_code,
				new_passwd:new_passwd,
			}
		$.post(API_URL+'users/rest_user_password', data)
				.success(function (data, status) {
					 myApp.hideIndicator();
					if(data.status == 200){
						console.log(data.status);
					myApp.addNotification({message:data.message,hold: 1500});
					mainView.router.load({url: 'login.html'});
											
					}else{
						myApp.addNotification({message:data.message,hold: 1500});
					}
				})
				.error(function (data, status) {
				});
		}
	});

});


myApp.onPageInit('Change_pass', function(page) {
$('.user_photo_img').attr('src',APP_BASE_URL+'uploads/'+user_detail['user_img']);
$('.user_nama').html(user_detail['full_name']);
	$('.page[data-page=Change_pass] form[name=change-password]').validate({
		rules: {
			new_passwd: {
				required: true,
				minlength: 6
			},
			confirm_password: {
				required: true,
				equalTo: '.page[data-page=Change_pass] form[name=change-password] input[name=new_passwd]'
			}
		},
    messages: {
			new_passwd: {
				required: 'Please enter new password.',
				minlength: 'New password must be at least 6 characters long.'
			},
			confirm_password: {
				required: 'Password confirmation is required.',
				equalTo: 'Both the passwords must match.'
			}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
		var new_passwd = $('#new_passwd').val();
		myApp.showIndicator();
		var data ={
			user_password:new_passwd,
			User_Id:user_detail['user_id'],
		}
		$.post(API_URL+'users/update_password', data)
				.success(function (data, status) {
					 myApp.hideIndicator();
					if(data.status == 200){
						console.log(data.status);
					myApp.addNotification({message:data.message,hold: 1500});
					mainView.router.load({url: 'user-profile.html'});						
					}else{
						myApp.addNotification({message:data.message,hold: 1500});
					}
				})
				.error(function (data, status) {
				});
		}
	});



});	

// Init method for Food menu
myApp.onPageInit('food_menu', function(page) {
	user_detail = JSON.parse(localStorage.getItem("lmapp_user_details"));
	$('.Name_user').html(user_detail.first_name);
	console.log("user_detail");
	console.log(user_detail);
	var cart_data = (JSON.parse(localStorage.getItem("food_store")));	
	console.log(cart_data);
	if(jQuery.isEmptyObject(cart_data)){
		var cart_data =[];
	}
	
	var menu_item =[];
	$.post(API_URL+'users/fatch_menu')
		.success(function (data, status) {
			console.log("menu");
			console.log(data.data);
			if(data.status == 200){
				content='';
				menu_item = data.data;
				$(menu_item).each(function(key,value1){
					content+='<h3>'+value1.product_category_name+'</h3>';
					$(value1.menu_value).each(function(key,value){
						console.log(value);
						if(value.recipe_price){
						content+='<li>\n\
						<div  class="item-content">\n\
						  <div class="item-media recipes_image">\n\
							<img  src="'+API_BASE_URL+'uploads/'+value.recipes_image+'" height="50px" width="50px" />\n\
						  </div>\n\
						  <div class="item-inner">\n\
							<div class="item-title-row">\n\
							 <div class="item-title recipe_name"><strong>'+value.recipe_name+'</strong></div>\n\
							  <div class="item-after">\n\
								<a href="#" class="chip chip-small add_cart add_product_cart" data-popup=".popup-careers-job-apply" recipe_id="'+value.recipe_id+'" recipe_name="'+value.recipe_name+'" recipe_datetime="'+value.recipe_datetime+'" recipes_image="'+value.recipes_image+'" recipe_description="'+value.recipe_description+'" recipe_price="'+value.recipe_price+'" estimate_time="'+value.estimate_time+'">Add +</a>\n\
							 </div>\n\
							</div>\n\
							<div class="item-text"><span class="recipe_description">'+value.recipe_description+'</span><br/>';
							
								content+='<span class="recipe_price food_price"><strong>$'+value.recipe_price+'</strong></span></div>';
							
						  content+='</div>\n\
						</div>\n\
						</li>\n\
						';
						}
				
					});
				});
				
				$('.all_menu').empty();
				$('.all_menu').append(content);
				
				$$('.page[data-page=food_menu] .add_product_cart').on('click', function() {
					if($(e.target).data('oneclicked')!='yes') {
						$(this).attr("disabled", true);
						var recipe_id= $(this).attr('recipe_id');
						var recipe_name= $(this).attr('recipe_name');
						var recipe_description= $(this).attr('recipe_description');
						var recipes_image= $(this).attr('recipes_image');
						var recipe_price= $(this).attr('recipe_price');
						var estimate_time= $(this).attr('estimate_time');
						var recipe_datetime= $(this).attr('recipe_datetime');
						var data={
							recipe_id:recipe_id,
							recipe_name:recipe_name,
							recipe_description:recipe_description,
							recipes_image:recipes_image,
							recipe_price:recipe_price,
							estimate_time:estimate_time,
							recipe_datetime:recipe_datetime,
							recipe_quantity:1,
							
						}
						
						cart_data.push(data);
						
						localStorage.setItem("food_store", JSON.stringify(cart_data));
						myApp.addNotification({
							message:'Item added to cart successfully',
							hold: 3000,
						});
						
						//cart_data = (JSON.parse(localStorage.getItem("food_store")));
						//console.log(cart_data);
					}
					$(e.target).data('oneclicked','yes');
					setTimeout(function(){ 
						$(e.target).data('oneclicked','no');
					}, 500);
				});
			}
			
			
		})
	
		.error(function (data, status) {
		});
		
	var previous_menu_item =[];
	var data ={
			user_id:user_detail.user_id,
		}
	$.post(API_URL+'users/fatch_previous_order_menu', data)
		.success(function (data, status) {
			console.log("previous_menu_item");
			console.log(data.data);
			if(data.status == 200){
				$('.display_previous').removeClass("display_none");
				content='';
				previous_menu_item = data.data;
				$(previous_menu_item).each(function(key,value){
					console.log(value);
					if(value.recipe_price){
					content+='<li>\n\
					<div  class="item-content">\n\
					  <div class="item-media recipes_image">\n\
						<img  src="'+API_BASE_URL+'uploads/'+value.recipes_image+'" height="50px" width="50px" />\n\
					  </div>\n\
					  <div class="item-inner">\n\
						<div class="item-title-row">\n\
						 <div class="item-title recipe_name"><strong>'+value.recipe_name+'</strong></div>\n\
						  <div class="item-after">\n\
							<a href="#" class="chip chip-small add_cart add_product_cart" data-popup=".popup-careers-job-apply" recipe_id="'+value.recipe_id+'" recipe_name="'+value.recipe_name+'" recipe_datetime="'+value.recipe_datetime+'" recipes_image="'+value.recipes_image+'" recipe_description="'+value.recipe_description+'" recipe_price="'+value.recipe_price+'" estimate_time="'+value.estimate_time+'">Add +</a>\n\
						 </div>\n\
						</div>\n\
						<div class="item-text"><span class="recipe_description">'+value.recipe_description+'</span><br/>';
						
							content+='<span class="recipe_price food_price"><strong>$'+value.recipe_price+'</strong></span></div>';
						
						content+='\n\
					  </div>\n\
					</div>\n\
					</li>\n\
					';
					}
				
				});
				
				$('.previous_menu').empty();
				$('.previous_menu').append(content);
				
				$$('.page[data-page=food_menu] .add_product_cart').on('click', function(e) {
					if($(e.target).data('oneclicked')!='yes') {
						$(this).attr("disabled", true);
						var recipe_id= $(this).attr('recipe_id');
						var recipe_name= $(this).attr('recipe_name');
						var recipe_description= $(this).attr('recipe_description');
						var recipes_image= $(this).attr('recipes_image');
						var recipe_price= $(this).attr('recipe_price');
						var estimate_time= $(this).attr('estimate_time');
						var recipe_datetime= $(this).attr('recipe_datetime');
						var data={
							recipe_id:recipe_id,
							recipe_name:recipe_name,
							recipe_description:recipe_description,
							recipes_image:recipes_image,
							recipe_price:recipe_price,
							estimate_time:estimate_time,
							recipe_datetime:recipe_datetime,
							recipe_quantity:1,
							
						}
						
						cart_data.push(data);
						
						localStorage.setItem("food_store", JSON.stringify(cart_data));
						myApp.addNotification({
							message:'Item added to cart successfully',
							hold: 3000,
						});
						
						//cart_data = (JSON.parse(localStorage.getItem("food_store")));
						//console.log(cart_data);
					}
					$(e.target).data('oneclicked','yes');
					setTimeout(function(){ 
						$(e.target).data('oneclicked','no');
					}, 500);
				});
			}else{
				$('.display_previous').addClass("display_none");
				$('.previous_menu').empty();
			}
			
			
	})

	.error(function (data, status) {
	});
	
	var recommend_menu_item =[];
	var data ={
			user_id:user_detail.user_id,
		}
	$.post(API_URL+'users/fatch_recommend_menu', data)
		.success(function (data, status) {
			console.log("recommend_menu_item");
			console.log(data.data);
			if(data.status == 200){
				$('.display_recommend').removeClass("display_none");
				content='';
				recommend_menu_item = data.data;
				$(recommend_menu_item).each(function(key,value){
					console.log(value);
					if(value.recipe_price){
					content+='<li>\n\
					<div  class="item-content">\n\
					  <div class="item-media recipes_image">\n\
						<img  src="'+API_BASE_URL+'uploads/'+value.recipes_image+'" height="50px" width="50px" />\n\
					  </div>\n\
					  <div class="item-inner">\n\
						<div class="item-title-row">\n\
						 <div class="item-title recipe_name"><strong>'+value.recipe_name+'</strong></div>\n\
						  <div class="item-after">\n\
							<a href="#" class="chip chip-small add_cart add_product_cart" data-popup=".popup-careers-job-apply" recipe_id="'+value.recipe_id+'" recipe_name="'+value.recipe_name+'" recipe_datetime="'+value.recipe_datetime+'" recipes_image="'+value.recipes_image+'" recipe_description="'+value.recipe_description+'" recipe_price="'+value.recipe_price+'" estimate_time="'+value.estimate_time+'">Add +</a>\n\
						 </div>\n\
						</div>\n\
						<div class="item-text"><span class="recipe_description">'+value.recipe_description+'</span><br/>';
						
							content+='<span class="recipe_price food_price"><strong>$'+value.recipe_price+'</strong></span></div>';
						
						content+='\n\
					  </div>\n\
					</div>\n\
					</li>\n\
					';
					}
				
				});
				
				$('.recommend_menu').empty();
				$('.recommend_menu').append(content);
				
				$$('.page[data-page=food_menu] .add_product_cart').on('click', function(e) {
					if($(e.target).data('oneclicked')!='yes') {
						$(this).attr("disabled", true);
						var recipe_id= $(this).attr('recipe_id');
						var recipe_name= $(this).attr('recipe_name');
						var recipe_description= $(this).attr('recipe_description');
						var recipes_image= $(this).attr('recipes_image');
						var recipe_price= $(this).attr('recipe_price');
						var estimate_time= $(this).attr('estimate_time');
						var recipe_datetime= $(this).attr('recipe_datetime');
						var data={
							recipe_id:recipe_id,
							recipe_name:recipe_name,
							recipe_description:recipe_description,
							recipes_image:recipes_image,
							recipe_price:recipe_price,
							estimate_time:estimate_time,
							recipe_datetime:recipe_datetime,
							recipe_quantity:1,
							
						}
						
						cart_data.push(data);
						
						localStorage.setItem("food_store", JSON.stringify(cart_data));
						myApp.addNotification({
							message:'Item added to cart successfully',
							hold: 3000,
						});
						
						//cart_data = (JSON.parse(localStorage.getItem("food_store")));
						//console.log(cart_data);
					}
					$(e.target).data('oneclicked','yes');
					setTimeout(function(){ 
						$(e.target).data('oneclicked','no');
					}, 500);
				});
			}else{
				$('.display_recommend').addClass("display_none");
				$('.recommend_menu').empty();
			}
			
			
	})

	.error(function (data, status) {
	});
	
	var product_trend_item =[];
	$.post(API_URL+'users/product_trend')
		.success(function (data, status) {
			console.log("product_trend_item");
			console.log(data.data);
			if(data.status == 200){
				content='';
				product_trend_item = data.data;
				$(product_trend_item).each(function(key,value){
					if(value.recipe_price){
					content+='<li>\n\
					<div  class="item-content">\n\
					  <div class="item-media recipes_image">\n\
						<img  src="'+API_BASE_URL+'uploads/'+value.recipes_image+'" height="50px" width="50px" />\n\
					  </div>\n\
					  <div class="item-inner">\n\
						<div class="item-title-row">\n\
						 <div class="item-title recipe_name"><strong>'+value.recipe_name+'</strong></div>\n\
						  <div class="item-after">\n\
							<a href="#" class="chip chip-small add_cart add_product_cart" data-popup=".popup-careers-job-apply" recipe_id="'+value.product_trend_id+'" recipe_name="'+value.recipe_name+'" recipe_datetime="'+value.recipe_datetime+'" recipes_image="'+value.recipes_image+'" recipe_description="'+value.recipe_description+'" recipe_price="'+value.recipe_price+'" estimate_time="'+value.estimate_time+'">Add +</a>\n\
						 </div>\n\
						</div>\n\
						<div class="item-text"><span class="recipe_description">'+value.recipe_description+'</span><br/>';
						
							content+='<span class="recipe_price food_price"><strong>'+value.recipe_price+'$</strong></span></div>';
						
					content+=' </div>\n\
					</div>\n\
					</li>\n\
					';
					}
				
				});
				
				$('.trending_menu').empty();
				$('.trending_menu').append(content);
				
				$$('.page[data-page=food_menu] .add_product_cart').on('click', function(e) {
					if($(e.target).data('oneclicked')!='yes') {
						
						$(this).attr("disabled", true);
						var recipe_id= $(this).attr('recipe_id');
						var recipe_name= $(this).attr('recipe_name');
						var recipe_description= $(this).attr('recipe_description');
						var recipes_image= $(this).attr('recipes_image');
						var recipe_price= $(this).attr('recipe_price');
						var estimate_time= $(this).attr('estimate_time');
						var recipe_datetime= $(this).attr('recipe_datetime');
						var data={
							recipe_id:recipe_id,
							recipe_name:recipe_name,
							recipe_description:recipe_description,
							recipes_image:recipes_image,
							recipe_price:recipe_price,
							estimate_time:estimate_time,
							recipe_datetime:recipe_datetime,
							recipe_quantity:1,
							
						}
						
						cart_data.push(data);
						
						localStorage.setItem("food_store", JSON.stringify(cart_data));
						myApp.addNotification({
							message:'Item added to cart successfully',
							hold: 3000,
						});
						
						//cart_data = (JSON.parse(localStorage.getItem("food_store")));
						//console.log(cart_data);
					
					}
					$(e.target).data('oneclicked','yes');
					setTimeout(function(){ 
						$(e.target).data('oneclicked','no');
					}, 500);
				});
			}else{
				$('.trending_menu').empty();
			}
	
	})
	
	.error(function (data, status) {
	});
});	


$$('[data-action=Log-Out]').on('click', function(e) {
	e.preventDefault();
myApp.modal({
			title: 'Confirm Log Out',
			text: 'Do you want to Logout ?',
			buttons: [
				{
					text: 'Logout',
					onClick: function() {
						localStorage.clear();
						user_detail =[];
			localStorage.setItem("lmapp_user_details", JSON.stringify('empty'));
			localStorage.setItem("publicsection_charity", JSON.stringify('true'));
			localStorage.setItem("privatesection_charity", JSON.stringify('false'));
			$(".is_public").removeClass('display_none');
			$(".is_private").addClass('display_none');
			var user_bh = JSON.parse(localStorage.getItem("lmapp_user_details"))
			if(user_bh =='empty'){
				console.log(user_bh);
			setTimeout(function(){
				
			location.reload();
			}, 1000);	
			}
			
			console.log(localStorage);
		myApp.addNotification({message:'Log Out Success Fully',hold: 1500});
					}
				},
				{
					text: 'Close',
					onClick: function() {
						myApp.closeModal();
					}
				}
			]
		});
});

















/*
|------------------------------------------------------------------------------
| Splash Screen
|------------------------------------------------------------------------------
*/

myApp.onPageInit('splash-screen', function(page) {
	
	var xx = "window.plugins.socialsharing.share('Buy local...Be local. Become a localmandi user like me & get 5% off on your first order if you sign up using my referral code ";
	
	if(user_detail ==''){
		page_name = 'landing_page.html';
	}else{
		xx = xx+user_detail.user_moblie_number;
		if(user_detail.user_type=='vendor'){
			var page_name =  'vendor_order_list.html';
		}else{
			var page_name =  'user-profile.html';
		}	
	}
	xx = xx+"' , null, 'http://localmandi.net/assets/img/logo.png', 'https://play.google.com/store/apps/details?id=com.phonegap.Localmandi')";
	
	new Vivus('logo', {
		duration: 50,
		onReady: function(obj) {
			obj.el.classList.add('animation-begin');
		}
	},
	function(obj) {
		obj.el.classList.add('animation-finish');
		console.log('hi');
		/* 3 seconds after logo animation is completed, open walkthrough screen. */
		setTimeout(function(){
			
			mainView.router.load({
				url: page_name
			});
			
			$('.share_onclick').attr('onclick',xx);
		console.log(xx);

		}, 500);
	});

	/* 1 second after page is loaded, show preloader. */
	setTimeout(function() {
		$$('.page[data-page=splash-screen] .splash-preloader').css('opacity', 1);
	}, 100);

});



myApp.onPageInit('usercart', function(page) {

	$('.side_span_card_counter').html(counter_for_cart_item_count);	
	
	//cart_data = (JSON.parse(localStorage.getItem("lmapp_cart_store")));
	//console.log(cart_data);

	var only_ontime_goods_total_price=0;	
	var cart_data = (JSON.parse(localStorage.getItem("food_store")));	
	console.log(cart_data);
	if(jQuery.isEmptyObject(cart_data)){
		var content = '';
		content += '<div class="item-content live-search-list" >';
				content += '<div class="row" style="width: 100%;padding: 20px 10px;">';
					content += '<div class="col-100 " style="background-color: #f8d7da;border-color: #f5c6cb;">';
					content += '<h4 style="text-align:center;color:#721c24;margin: 15px;">No Item selected yet</h4>';
					content += '</div>';
				content += '</div>';
			content += '</div>';					
		
			$('#listcarthtml').empty();
			$('#listcarthtml').append(content);
	}else{	
		var content = '';
		var total_price=0;
		content += '  <div id="cartgoodsview"><ul>';
		$(cart_data).each(function(key,value){
			
			var temp_p= (parseFloat(value['recipe_price']) * parseInt(value['recipe_quantity']));
			
			total_price = total_price +parseFloat( temp_p);				
			
	
			content+='<li>\n\
					<div  class="item-content target" recipe_id="'+value['recipe_id']+'" recipe_name="'+value['recipe_name']+'" recipe_datetime="'+value['recipe_datetime']+'" recipes_image="'+value['recipes_image']+'" recipe_description="'+value['recipe_description']+'" recipe_price="'+value['recipe_price']+'" estimate_time="'+value['estimate_time']+'">\n\
					  <div class="item-media recipes_image">\n\
						<img src="'+API_BASE_URL+'uploads/'+value['recipes_image']+'" height="50px" width="50px" />\n\
					  </div>\n\
					  <div class="item-inner">\n\
						<div class="item-title-row">\n\
						 <div class="item-title recipe_name">'+value['recipe_name']+'</div>\n\
						  <div class="item-after">\n\
							<a href="#" class="user_goods_remove_to_cart" name="'+value['recipe_id']+'"><i class="material-icons">clear</i></a><br/>\n\
						 </div>\n\
						</div>\n\
						<div class="item-title-row">\n\
						 <div class="item-text"><span class="recipe_price food_price">$'+value['recipe_price']+'</span></div>\n\
						 <div class="item-after">\n\
						  <a href="#" class=" button-fill chip add_to_cart"><span class="decrement" style="font-size: xx-large;"> - </span><input type="text" readOnly style="height: 22px !important; width: 32px !important;" name="quentity" class="quantity" value="'+value['recipe_quantity']+'" /><span class="increment" style="font-size: xx-large;"> + </span></a>\n\
						 </div>\n\
						</div>\n\
					  </div>\n\
					</div>\n\
				</li>\n\
				';
		});
		content +='</ul>';
				console.log(total_price);
				console.log('content');
					content += '<div class="class="col-100" style="padding:10px;font-size: 18px;">';
					content += '<span><b>Total</b>:</span><span style="float: right;">$<span id="grand_total">'+total_price+'</span></span>';
					content += '</div>';
					
					content +='<a href="#" class="floating-button carttonext" style="background-color: transparent; width:100px" >\n\
								<img src="assets/custom/img/placeorder.png" style="width: 100%;" alt="set_goods_price" />\n\
							</a>';
					
		$('#listcarthtml').empty();
		$('#listcarthtml').append(content);
		
		
		$$('.page[data-page=usercart] .decrement').on('click', function() {
			//console.log("decrement");
			var xx = $(this).parent().find('.quantity').val();
			var x=xx-1;
			//console.log(x);
			if(x >= 1){
				$(this).parent().find('.quantity').val(x);
			}
			update_local_storage();
		});
		$$('.page[data-page=usercart] .increment').on('click', function() {
			//console.log("increment");
			var xx = $(this).parent().find('.quantity').val();
			//console.log(xx++);
			xx++;
			$(this).parent().find('.quantity').val(xx);
			update_local_storage();
		});
		
		function update_local_storage(){
			total_price=0;
			var cart_data1=[];
				$(".target").each(function(){
					var recipe_id= $(this).attr('recipe_id');
					var recipe_name= $(this).attr('recipe_name');
					var recipe_description= $(this).attr('recipe_description');
					var recipes_image= $(this).attr('recipes_image');
					var recipe_price= $(this).attr('recipe_price');
					var estimate_time= $(this).attr('estimate_time');
					var recipe_datetime= $(this).attr('recipe_datetime');
					var recipe_quantity= $(this).find('.quantity').val();
					
					var temp_p= (parseFloat(recipe_price) * parseInt(recipe_quantity));
			
			        total_price = total_price +parseFloat( temp_p);
					
					var data ={
							recipe_id:recipe_id,
							recipe_name:recipe_name,
							recipe_description:recipe_description,
							recipes_image:recipes_image,
							recipe_price:recipe_price,
							estimate_time:estimate_time,
							recipe_datetime:recipe_datetime,	
							recipe_quantity:recipe_quantity,	
						}
						cart_data1.push(data);
				});
				
				$('#grand_total').text(total_price);
			
			localStorage.setItem("food_store", JSON.stringify(''));
			localStorage.setItem("food_store", JSON.stringify(cart_data1));
		}
	}


	$$('.page[data-page=usercart] .carttonext').on('click', function(e) {
		if($(e.target).data('oneclicked')!='yes') {
			var cart_data1 = (JSON.parse(localStorage.getItem("food_store")));
			console.log(cart_data);
			
			var user_detail = (JSON.parse(localStorage.getItem("lmapp_user_details")));
			console.log(user_detail.first_name);
			var id=user_detail.user_id;
			var name=user_detail.first_name+' '+user_detail.last_name;
			var amount=$('#grand_total').text();
			
			var uuid_data = (JSON.parse(localStorage.getItem("data_uuid")));
			console.log(uuid_data);
			var table_no=uuid_data.table_no;
			var major=uuid_data.major;
			var minor=uuid_data.minor;
			console.log(table_no);
			console.log(minor);
			myApp.showIndicator();
			var data ={
				customer_id: id,
				customer_name: name,
				total_amount: amount,
				table_no: table_no,
				major: major,
				minor: minor,
			}
			$.post(API_URL+'users/add_product_order', data)
			.success(function (data, status) {
				myApp.hideIndicator();
				if(data.status == 200){
					console.log(data.status);
					console.log(data.data);
					var order_id=data.data;
					$(cart_data1).each(function(key,value){
						var data ={
							order_id: order_id,
							customer_id: id,
							customer_name: name,
							table_no: table_no,
							major: major,
							minor: minor,
							item_id:value['recipe_id'],
							item_name:value['recipe_name'],
							item_description:value['recipe_description'],
							item_img:value['recipes_image'],
							item_price:value['recipe_price'],
							item_quantity:value['recipe_quantity'],
							item_estimate_time:value['estimate_time'],	
						}
						$.post(API_URL+'users/add_product_order_detail', data)
						.success(function (data, status) {
							myApp.hideIndicator();
							if(data.status == 200){
								console.log(data.status);
								//myApp.addNotification({message:data.message,hold: 1500});
								//mainView.router.load({url: 'order_done.html'});
													
							}else{
								myApp.addNotification({message:data.message,hold: 1500});
							}
						})
						.error(function (data, status) {
						});
						
					});		
						myApp.addNotification({message:data.message,hold: 1500});
								mainView.router.load({url: 'order_done.html'});
				}else{
					myApp.addNotification({message:data.message,hold: 1500});
				}
			})
			.error(function (data, status) {
			});
			localStorage.setItem("food_store", JSON.stringify(''));
		}$(e.target).data('oneclicked','yes');
			setTimeout(function(){ 
				$(e.target).data('oneclicked','no');
			}, 500);
	});
	
	$$('.page[data-page=usercart] .user_goods_remove_to_cart').on('click', function() {	
			var cart_data1=[];
			var recipe_id = jQuery(this).attr('name');
				//var goods_qty =	$(this).closest('div .live-search-list').find('.goods_qty').val();
				
				
			localStorage.setItem("food_store_temp", JSON.stringify(''));
			localStorage.setItem("food_store_temp", JSON.stringify(cart_data));
			
				var temp_cart_data = (JSON.parse(localStorage.getItem("food_store_temp")));	
				$(temp_cart_data).each(function(key,value){
						
				
					if(recipe_id !=value['recipe_id'] ){
						var data ={
							recipe_id:value['recipe_id'],
							recipe_name:value['recipe_name'],
							recipe_description:value['recipe_description'],
							recipes_image:value['recipes_image'],
							recipe_price:value['recipe_price'],
							estimate_time:value['estimate_time'],
							recipe_datetime:value['recipe_datetime'],	
							recipe_quantity:value['recipe_quantity'],	
						}
						cart_data1.push(data);
						
					}
				
				});
			
			localStorage.setItem("food_store", JSON.stringify(''));
			localStorage.setItem("food_store", JSON.stringify(cart_data1));
				
			console.log(cart_data1);

			myApp.addNotification({message:' Remove goods to cart successfully.',hold: 1500});	
			
			redirect_page_name='cart.html';
			mainView.router.load({url: 'redirect_page.html'});
			//mainView.router.load({url: 'other_redireact.html'});
	});
		

	$$('.page[data-page=usercart] .apply_coupon').on('click', function() {
	
	 var coupon = $('.page[data-page=usercart] #coupon').val();
	 var price_for_apply_coupan = $('.page[data-page=usercart] #coupon').attr('price_for_apply_coupan');
	  myApp.showIndicator();
	 var data2 ={
		  price_for_apply_coupan:price_for_apply_coupan,
		  coupon:coupon,
		  cart_data:cart_data,	
	 }

		$.post(API_URL + 'vendor/check_apply_coupon', data2)
		.success(function (data, status) {
			myApp.hideIndicator();
			if (data.status == 200) { 
				
			
				var after_c_d_p =data.after_c_d_p;
				var coupons_discount =data.coupons_discount;
			
				myApp.alert(' '+data.message +' <i class="fa fa-inr fa-indian-rupee"></i> '+  coupons_discount + ' .');
					$$('.page[data-page=usercart] #c_discount').text(coupons_discount);
			
					$$('.page[data-page=usercart] #grand_total').text(after_c_d_p);
			
					payment_check =0;
					payment_check =after_c_d_p;
				
				$$('.page[data-page=usercart] .apply_coupon').addClass('disabled');
				$$('.page[data-page=usercart] #coupon').attr('reduce_money',coupons_discount);
				$$('.page[data-page=usercart] #coupon').addClass('disabled');
				$$('.page[data-page=usercart] .c_discount_remove').removeClass('display_none');
			}
			else if (data.status == 201) {
				$$('.page[data-page=usercart] #coupon').val('')
				myApp.alert('coupon code is not valid.', '');
			}
		})
		.error(function (data, status) {
		});
	
	});
	
	$$('.page[data-page=usercart] .c_discount_remove').on('click', function() {
		$('.c_discount_remove').addClass('display_none');
		redirect_page_name='cart.html';
		mainView.router.load({url: 'redirect_page.html'});
	});

	
	
});



myApp.onPageInit('usercart_sub', function(page) {
 avail_mandi_points_for_payment_page = 0;
	var data = {user_id:user_detail.user_id,}
		$.post(API_URL+'category/get_user_availble_mandipoints', data)
			.success(function (data, status) {
			if(data.status == 200){
				avail_mandi_points_for_payment_page = parseFloat(data.mandipoints) - parseFloat(data.todats_mandi_points);
				if(avail_mandi_points_for_payment_page > 0){
					$$('.page[data-page=usercart_sub] #avail_mandi_points').html(avail_mandi_points_for_payment_page);
					
				}else{
					$$('.page[data-page=usercart_sub] .insuffic_status').html(' Insufficient Mandi Points');
					$$('.page[data-page=usercart_sub] #avail_mandi_points').html('0');
				}
			}
		})
	
	$('.side_span_card_counter').html(counter_for_cart_item_count);
	
	$$('.page[data-page=usercart_sub] .carts_one_time_button').on('click', function() {
		mainView.router.load({url: 'cart.html'});
	});	
	var cart_data_sub = (JSON.parse(localStorage.getItem("lmapp_cart_store_sub")));	
	console.log(cart_data_sub);
					
	if(jQuery.isEmptyObject(cart_data_sub)){
		
			var content = '';
				content += '<div class="item-content live-search-list" >';
				content += '<div class="row" style="width: 100%;padding: 20px 10px;">';
				content += '<div class="col-100 " style="background-color: #f8d7da;border-color: #f5c6cb;">';
				content += '<h4 style="text-align:center;color:#721c24;margin: 15px;">No Goods selected yet</h4>';
				content += '</div>';
				content += '</div>';
				content += '</div>';					
		
			$('#listcarthtml1').empty();
			$('#listcarthtml1').append(content);
	}else{
			console.log(cart_data_sub);
			var content = '';
			
			var total_price=0;
			var price_for_apply_coupan=0;
			content += '  <div id="cartgoodsview">';
			$(cart_data_sub).each(function(key,value){
				var subscription_type='';
				var delivery_start_date='';
				var delivery_end_date='';
				var subscription_day='';
				var subscribe_weekday='';
				var subscribe_weekday1='';
				
				var goods_qty = value['goods_qty'];
				
				$(value['subscription_data']).each(function(key1,value1){
				
					 subscription_day = value1['subscription_day'];
					 subscription_type = value1['subscription_type'];
					 delivery_start_date = value1['delivery_start_date'];
					
					 delivery_end_date = value1['delivery_end_date'];
				});
					
				if(subscription_type== 'custom'){
					$(value['subscription_data']).each(function(key1,value1){
						subscribe_weekday = value1['weekday'].toString();
						subscribe_weekday1= value1['subscribe_weekday'];
					});
				}
					
				if(subscription_type== 'custom'){
					console.log(subscription_day);
					var perprice =(parseInt(subscription_day) * (parseInt(value['goods_price']) * parseInt(goods_qty)));
					
					console.log(subscription_day);
					total_price = total_price + perprice;
					price_for_apply_coupan = price_for_apply_coupan + perprice;
				}

				content += '<div class="item-content live-search-list" style="border-bottom: 1px solid #eee;padding: 5px 5px 5px 5px;">';
					content += '<div class="row sub-search" style="width: 100%;" >';
						content += '<div class="col-20 " >';
							content += '<img style="border-radius: 0px;padding-right: 10px;float: left;width:50px;height: 50px;" class="" src="'+APP_BASE_URL+'uploads/'+value['goods_image']+'"/>';
							
						content += '</div>';
						content += '<div class="col-70 " >';
							content += '<div style="font-size: 18px;"> '+ value['sub_cat_name'] +'</div> ';
							
							content += '<div  style="font-size: 16px;"> 	'+ value['type_value'] +' '+ value['type_name'] +'</div>';
							
								content += '<div style=""> <i class="fa fa-inr fa-indian-rupee"></i> '+ value['goods_price'] +' <span>*</span> '+ subscription_day +'</div> ';
								content += '<div style="">  Qty : '+ value['goods_qty'] +'</div> ';
							
							content += '</div>';
							content += '<div class="col-10">';
								
								content += '<a style="float: right;" href="javascript:void(0)" class="user_goods_remove_to_cart " goods_id="'+ value['goods_id'] +'" > <i style="border: 1px solid; padding: 0px 2px 1px 2px; border-radius: 50%;" class="fa fa-times"></i>  </a>';
							content += '</div>';
						content += '<div class="col-100">';
								if(subscription_type== 'onetime'){
									//content += '<span style="1margin-top: 5px;font-size: 15px;">Subscription: '+ delivery_start_date +'</span> ';
								}else{
									content += '<span style="1margin-top: 5px;font-size: 15px;">Subscription Starts from : '+ delivery_start_date +'  </span> ';
									
									content += '<span style="1margin-top: 5px;font-size: 15px;"></br>Day: '+ subscribe_weekday +' </span> ';
								}
							content += '</div>';
						content += '</div>';
					content += '</div>';
				});
			content += '  </div>';
					content += '<div class="offerdivhtml " style="padding:10px;"></div>';
			
					content += ' <div class="row">';
						content += '<div class="col-66"><input type="text" id="coupon" name="coupon" price_for_apply_coupan="'+total_price+'" reduce_money=""  class="coupon" placeholder="Coupon-Code" /></div>';
							content += '<div class="col-33"><a style="font-size: 18px;background: cadetblue;" href="#" class="button  button-block  button-fill  apply_coupon"> Apply</a></div>';
					content += '  </div>';
					content += '<div class="class="col-100" style="padding:10px;font-size: 18px;">';
						content += '<span>Subtotal :</span><span style="float: right;"> <i class="fa fa-inr fa-indian-rupee"></i> <span id="total_user_cart_order1"  ></span></span>';
					content += '  </div>';
					content += '<div class="class="col-100" style="padding:10px;font-size: 18px;">';
						content += '<span>Discount:</span><span style="float: right;"> <i class="fa fa-inr fa-indian-rupee"></i> <span id="discount"  >0</span></span>';
					content += '  </div>';
					content += '<div class="class="col-100" style="padding:10px;font-size: 18px;">';
						content += '<span>Coupan Discount:</span><span style="float: right;"> <i class="fa fa-inr fa-indian-rupee"></i> <span id="c_discount"  >0</span> <a  href="javascript:void(0)" class="c_discount_remove display_none" > <i style="border: 1px solid; padding: 0px 2px 1px 2px; border-radius: 50%;" class="fa fa-times"></i>  </a></span>';
				
				content += '  </div>';
					
					content += '<div class="class="col-100" style="padding:10px;font-size: 18px;">';
					content += '<span><b>Grand Total</b>:</span><span style="float: right;"> <i class="fa fa-inr fa-indian-rupee"></i> <span id="grand_total1"  ></span></span>';
					content += '</div>';
					
					content += '<div class="class="col-100" style="padding:10px;font-size: 18px;background:#eee;">';
					content += '<span class="insuffic_status">Usable Mandi Points :</span><span style="float: right;"> <i class="fa fa-inr fa-indian-rupee"></i> <span id="avail_mandi_points"  > '+avail_mandi_points_for_payment_page+' </span></span></br>';
					content += '<span style="font-size: 14px;" id="need_points">You need to add  <span ></span> mandi points more.</span>';
					content += '</div>';
					
					
					content += '<div class="class="col-100" style="padding:10px">';
						content += '<a style="font-size: 18px;" href="#" class="button button-big button-block  button-fill  carttonext">Next</a>';
					content += '</div>';
					content += '<p><b>NOTE : </b>Daily subscription amount will get deducted from your mandi points on previous day.<br/>\n\
								Cut-off time to modify or cancel the next day order is 10:00P.M</p>';
					
		$('#listcarthtml1').empty();
		$('#listcarthtml1').append(content);
		$('#total_user_cart_order1').text(price_for_apply_coupan);
			$$('.page[data-page=usercart_sub] #discount').text(parseFloat(price_for_apply_coupan - total_price));
			setTimeout(function(){
				var jkdj = total_price - avail_mandi_points_for_payment_page ;
				if(jkdj > 0){
					$$('.page[data-page=usercart_sub] #need_points').html('You need to add more mandi points.');
					
				}else{
					$$('.page[data-page=usercart_sub] #need_points').html('Pay with '+total_price+' mandi points.');
					$$('.page[data-page=usercart_sub] .carttonext').addClass('disabled_not');
					
				}
			}, 1000);
			
		$('#grand_total1').text(total_price);
			console.log(total_price);
			
			payment_check =0;
			payment_check =total_price;
			
			console.log(payment_check);
			
					
	}
			
			
			

		

	$$('.page[data-page=usercart_sub] .carttonext').on('click', function() {
			if($(this).hasClass('disabled_not')){
				var coupon = $$('.page[data-page=usercart_sub] #coupon').val();
				
				var price_for_apply_coupan = $$('.page[data-page=usercart_sub] #coupon').attr('price_for_apply_coupan');
					var reduce_money = $$('.page[data-page=usercart_sub] #coupon').attr('reduce_money');
				var coupon_array=[];
				if(coupon){
					coupon_array.push({'coupon' :coupon,'price_for_apply_coupan' :price_for_apply_coupan,'reduce_money':reduce_money,});
				}
				
				localStorage.setItem("lmapp_cart_coupon", JSON.stringify(coupon_array));	
				
				var offer_array=[];
				$('.page[data-page=usercart_sub] .offer_remove_to_cart').each( function( index, element ){
						var offer_id =$(this).attr('offer_id');
						offer_array.push({'offer_id' :offer_id});
				});
				localStorage.setItem("lmapp_cart_offer", JSON.stringify(''));
				localStorage.setItem("lmapp_cart_offer", JSON.stringify(offer_array));
				come_to_delivery_page='subtimecart';					
				mainView.router.load({url: 'check_delivery_info.html'});
			}else{
				var toast = myApp.toast('You do not have sufficient points for one of this subscription and Today all subscription .You need to add Mandi Points before order', '<i class="fa fa-info-circle"></i>');
				toast.show();
			}
	});
	
	$$('.page[data-page=usercart_sub] .user_goods_remove_to_cart').on('click', function() {	
			var cart_data=(JSON.parse(localStorage.getItem("lmapp_cart_store_sub")));
			var cart_data2=[];
			var goods_id = jQuery(this).attr('goods_id');
				//var goods_qty =	$(this).closest('div .live-search-list').find('.goods_qty').val();
				
				
			localStorage.setItem("lmapp_cart_store_temp", JSON.stringify(cart_data));
			
				var temp_cart_data = (JSON.parse(localStorage.getItem("lmapp_cart_store_temp")));	
				$(temp_cart_data).each(function(key,value){
						
				
					if(goods_id !=value['goods_id'] ){
						var data ={
								goods_discount:value['goods_discount'],
								goods_after_discount_price:value['goods_after_discount_price'],
								category_id:value['category_id'],
								category_name:value['category_name'],
								goods_id:value['goods_id'],
								goods_image:value['goods_image'],
								goods_price:value['goods_price'],
								goods_qty:value['goods_qty'],
								sub_cat_id:value['sub_cat_id'],
								sub_cat_name:value['sub_cat_name'],
								subscription_data:value['subscription_data'],
								type_name:value['type_name'],
								type_value:value['type_value'],
								vendor_id:value['vendor_id'],
								vendor_name:value['vendor_name'],
								
							}
						cart_data2.push(data);
						
					}
							
				});
			
			localStorage.setItem("lmapp_cart_store_sub", JSON.stringify(cart_data2));
				
			console.log(cart_data2);

			myApp.addNotification({message:' Remove goods to cart successfully.',hold: 1500});	
			var oooo =[];
			var ssss =[];
			if(JSON.parse(localStorage.getItem("lmapp_cart_store"))){
				 oooo = (JSON.parse(localStorage.getItem("lmapp_cart_store")));	
			}
			if(JSON.parse(localStorage.getItem("lmapp_cart_store_sub"))){
				 ssss = (JSON.parse(localStorage.getItem("lmapp_cart_store_sub")));	
			}
			counter_for_cart_item_count = oooo.length + ssss.length ;
			
			redirect_page_name='cart_subscription.html';
			mainView.router.load({url: 'redirect_page.html'});
			//mainView.router.load({url: 'other_redireact.html'});
			
	});
		

	$$('.page[data-page=usercart_sub] .apply_coupon').on('click', function() {
	
	 var coupon = $$('.page[data-page=usercart_sub] #coupon').val();
	 var price_for_apply_coupan = $$('.page[data-page=usercart_sub] #coupon').attr('price_for_apply_coupan');
	myApp.showIndicator();
	var data2 ={
		  price_for_apply_coupan:price_for_apply_coupan,
		  coupon:coupon,
		  cart_data:cart_data_sub,	
	 }

	$.post(API_URL + 'vendor/check_apply_coupon_sub', data2)
		.success(function (data, status) {
			myApp.hideIndicator();
			if (data.status == 200) { 
		
			
				var after_c_d_p =data.after_c_d_p;
				var coupons_discount =data.coupons_discount;
			
				myApp.alert(' '+data.message +' <i class="fa fa-inr fa-indian-rupee"></i> '+  coupons_discount + ' .');
					//$('#total_user_cart_order').text(price_for_apply_coupan);
					//$('#discount').text('0');
					$$('.page[data-page=usercart_sub] #c_discount').text(coupons_discount);
			
					$$('.page[data-page=usercart_sub] #grand_total1').text(after_c_d_p);
					if(after_c_d_p > avail_mandi_points_for_payment_page){
						$$('.page[data-page=usercart_sub] #need_points').html('You need to add  '+(after_c_d_p - avail_mandi_points_for_payment_page)+' mandi points more.');
					}else{
						$$('.page[data-page=usercart_sub] #need_points').html('Pay with '+after_c_d_p+' mandi points.');
					}
					
			
					payment_check =0;
					payment_check = after_c_d_p;
				
				$$('.page[data-page=usercart_sub] .apply_coupon').addClass('disabled');
				$$('.page[data-page=usercart_sub] #coupon').addClass('disabled');
				$$('.page[data-page=usercart_sub] #coupon').attr('reduce_money',coupons_discount);
				$$('.page[data-page=usercart_sub] .c_discount_remove').removeClass('display_none');
						
			}
			else if (data.status == 201) {
				$$('.page[data-page=usercart_sub] #coupon').val('')
				myApp.alert('coupon code is not valid.', '');
			}
		})
		.error(function (data, status) {
		});
		
	});
	$$('.page[data-page=usercart_sub] .c_discount_remove').on('click', function() {
		$('.c_discount_remove').addClass('display_none');
		redirect_page_name='cart_subscription.html';
		mainView.router.load({url: 'redirect_page.html'});
	});
	
	
	
});





myApp.onPageInit('otherredireact', function(page) {
	var oooo =[];
	var ssss =[];
	if(JSON.parse(localStorage.getItem("lmapp_cart_store"))){
		 oooo = (JSON.parse(localStorage.getItem("lmapp_cart_store")));	
	}
	if(JSON.parse(localStorage.getItem("lmapp_cart_store_sub"))){
		 ssss = (JSON.parse(localStorage.getItem("lmapp_cart_store_sub")));	
	}
	counter_for_cart_item_count = oooo.length + ssss.length ;
	setTimeout(function(){
		
		if(oooo.length != 0){
			mainView.router.load({url: 'cart.html'});
		}else if(ssss.length != 0){
			mainView.router.load({url: 'cart_subscription.html'});
		}else{
			mainView.router.load({url: 'cart.html'});
		}
	 
    }, 500);
	
});







myApp.onPageInit('vender_all_rating', function(page) {

  var user_profile =[];	  
	var data = {
		user_veiw_vendor_info : user_veiw_vendor_info,
	}
	$.post(API_URL+'vendor/get_vendor_all_comment_and_rating', data)
				.success(function (data, status) {
					console.log(data.data);
					if(data.status == 200){
					//user_profile = data.data[0];
					var value = data.data;
					var i = 0;
					var content = '';
							for(i=0;i< value.length;i++){
								content +='<div class="card facebook-card">\n\
												<div class="card-header">\n\
													<div class="facebook-user-avatar">\n\
														<img src="'+APP_BASE_URL+'uploads/'+value[i]['user_img']+'" width="36" height="36">\n\
													</div>\n\
													<div class="facebook-user-name" style="font-size: 15px;">'+value[i]['user_name']+'</div>\n\
													<div class="facebook-post-datetime" style="">'+value[i]['date']+'</div>\n\
												</div>\n\
												<div class="card-content">\n\
												<div class="card-content-inner" style="padding: 5px 15px;">\n\
												<div class="testimonial-rating" style="float:left;" data-rating="'+value[i]['feedback_rating']+'"></div></br>\n\
														<p style="font-size: 17px;margin-top:10px;"> '+value[i]['feedback_comment']+' </p>\n\
													</div>\n\
												</div>\n\
											</div>';
							}
				$('.allratingdiv').append(content);
					
					$('.page[data-page=vender_all_rating] .testimonial-rating').each(function() {
						$(this).rateYo({
							rating: $(this).data('rating'),
							halfStar: true,
							normalFill: '#9E9E9E',
							ratedFill: '#FFC107',
							readOnly: true,
							spacing: '4px',
							starWidth: '18px'
						});
					});	
					}
				})
				.error(function (data, status) {
				});

});




myApp.onPageInit('help', function(page) {

	var public_data =[];	  
	var data = {
		content_id : 1,
	}
	$.post(API_URL+'vendor/get_public_data', data)
		.success(function (data, status) {
			console.log(data.data);
			if(data.status == 200){
			public_data = data.data[0];
			
			$('.help-content').html(public_data.content);
			}
		})
		.error(function (data, status) {
		});

});





myApp.onPageInit('terms', function(page) {

  var public_data =[];	  
	var data = {
		content_id : 2,
	}
	$.post(API_URL+'vendor/get_public_data', data)
		.success(function (data, status) {
			console.log(data.data);
			if(data.status == 200){
			public_data = data.data[0];
			
			$('.terms-content').html(public_data.content);
			}
		})
		.error(function (data, status) {
		});

});





myApp.onPageInit('privacy-policy', function(page) {

  var public_data =[];	  
	var data = {
		content_id : 3,
	}
	$.post(API_URL+'vendor/get_public_data', data)
	.success(function (data, status) {
		console.log(data.data);
		if(data.status == 200){
		public_data = data.data[0];
		
		$('.privacy-policy-content').html(public_data.content);
		
		}
	})
	.error(function (data, status) {
	});

});



myApp.onPageInit('refund_policy', function(page) {

  var public_data =[];	  
	var data = {
		content_id : 4,
	}
	$.post(API_URL+'vendor/get_public_data', data)
	.success(function (data, status) {
		console.log(data.data);
		if(data.status == 200){
		public_data = data.data[0];
		
		$('.refund_policy-content').html(public_data.content);
		
		}
	})
	.error(function (data, status) {
	});

});

myApp.onPageInit('user_subs_plan', function(page) {
	
	$('.side_span_card_counter').html(counter_for_cart_item_count);
	
	$$('.page[data-page=user_subs_plan] .user_subs_plane_type_subs_time').on('click', function() {
		customer_plan_check='subscribe';
		category_veiw_vendor_info=0;
		//mainView.router.load({url: 'category.html'});
		mainView.router.load({url: 'vendors_list.html'});
	});
	
	$$('.page[data-page=user_subs_plan] .user_subs_plane_type_one_time').on('click', function() {
		customer_plan_check	='onetime';
		//mainView.router.load({url: 'category.html'});		
		mainView.router.load({url: 'vendors_list.html'});
	});

});	

myApp.onPageInit('My_vendors_list', function(page) {
myApp.showIndicator();
$('.side_span_card_counter').html(counter_for_cart_item_count);

		var data = {
			user_id : user_detail.user_id,
		}
		$.post(API_URL+'vendor/get_list_of_all_vendors', data)
			.success(function (data, status) {
				myApp.hideIndicator();
				var content ='';
				if(data.status == 200){
					var val2 = data.data;
					var j=0;
					for (j = 0; j < val2.length; j++) { 
							content += '<li class="accordion-item">\n\
											<a href="#" class="item-link">\n\
												<div class="item-content">\n\
												  <div class="item-inner gfhgfhg">\n\
														<div class="item-title"> '+val2[j]['cat_name']+'</div>\n\
												  </div>\n\
												</div>\n\
											</a>\n\
											<div class="accordion-item-content">\n\
												<div class="content-block">\n\
													<div class="list-block list-block-search">\n\
														<ul class="">';
								var value =[];
								var i=0;
								
							 value = val2[j]['data_all'];
							for (i = 0; i < value.length; i++) { 
								content += '<li>\n\
											<div class=" item-content vendor_info_view" >\n\
												<div class="item-media vendor_info_view22" value="'+value[i]['user_id']+'"  cat_id="'+val2[j]['cat_id']+'" >\n\
													<img src="'+APP_BASE_URL+'uploads/'+value[i]['user_img']+'" width="50" height="50" style="border-radius: 50%;" >\n\
												</div>\n\
												<div class="item-inner">\n\
													<div class="item-title">\n\
														<span>'+value[i]['bussiness_name']+'</span></br>';
											if(value[i]['num_review'] > 0){		
											content += '<a class="review_data_vendor" value="'+value[i]['user_id']+'" ><span style="font-size: 13px;">'+value[i]['num_review']+' reviews</span></a>';
											}
											content += '<div class="testimonial-rating" data-rating="'+value[i]['vendor_rating']+'"></div></div>\n\
													<a href="#" class="button  button-block button-fill color-white vendor_info_view22" style="float:right;width:30%;background: #f9f9f9 !important;" value="'+value[i]['user_id']+'" cat_id="'+val2[j]['cat_id']+'">\n\
														<img src="assets/custom/img/login.png" width="40">\n\
													</a>\n\
												</div>\n\
											</div>\n\
										</li>\n\
									';
							}	
							content += '				</ul>\n\
													</div>\n\
												</div>\n\
											</div>\n\
										</li>';
					
					}
					$('.church_users_list22').html(content);
				
					$('.page[data-page=My_vendors_list] .testimonial-rating').each(function() {
						$(this).rateYo({
							rating: $(this).data('rating'),
							halfStar: true,
							normalFill: '#9E9E9E',
							ratedFill: '#FFC107',
							readOnly: true,
							spacing: '3px',
							starWidth: '12px'
						});
					});	
				
					$$('.page[data-page=My_vendors_list] .vendor_info_view22').on('click', function(e) {
								category_veiw_vendor_info = jQuery(this).attr('value');
								category_veiw_selected_busi_cat_id = jQuery(this).attr('cat_id');
									mainView.router.load({url: 'category.html'});		
					});
					
					$$('.page[data-page=My_vendors_list] .review_data_vendor').on('click', function(e) {
								user_veiw_vendor_info = jQuery(this).attr('value');
								mainView.router.load({url: 'vendor_all_rating.html'});
								
					});
				
				}else{
					 content += '<div class="item-content live-search-list" >';
												content += '<div class="row" style="padding: 20px 10px;">';
													content += '<div class="col-100 " style="padding: 0px 40px;background-color: #f8d7da;border-color: #f5c6cb;">';
													content += '<h3 style="text-align:center;color:#721c24;">'+data.message+' !</h3>';
													content += '</div>';
												content += '</div>';
										content += '</div>';
																	
					$$('.page[data-page=My_vendors_list] .page-content').empty();
					$$('.page[data-page=My_vendors_list] .page-content').append(content);
				}
				
			})
			
});

myApp.onPageInit('My_fevorite_list', function(page) {

		var data = {user_id : user_detail.user_id,
				}
				$.post(API_URL+'vendor/get_list_of_my_fav_vendors', data)
							.success(function (data, status) {
							var content ='';
								if(data.status == 200){
									var value =[];
									var i=0;
									
									value = data.data;
									for (i = 0; i < value.length; i++) { 
										content += '<li>\n\
											<div class="item-content vendor_fevorite_list" value="'+value[i]['Fk_vendor_id']+'">\n\
												<div class="item-media " >\n\
													<img src="'+APP_BASE_URL+'uploads/'+value[i]['user_img']+'" width="50" height="50" style="border-radius: 50%;" >\n\
												</div>\n\
												<div class="item-inner">\n\
													<div class="item-title">'+value[i]['bussiness_name']+' </div>\n\
												</div>\n\
											</div>\n\
										</li>\n\
										';
									}
									$('.church_users_list').html(content);
														
									$$('.page[data-page=My_fevorite_list] .vendor_fevorite_list').on('click', function() {
											category_veiw_vendor_info = jQuery(this).attr('value');
											customer_plan_check	='onetime';
											mainView.router.load({url: 'category.html'});	
									});
								}else{
									content += '<div class="item-content live-search-list" >';
												content += '<div class="row" style="padding: 20px 10px;">';
													content += '<div class="col-100 " style="padding: 0px 40px;background-color: #f8d7da;border-color: #f5c6cb;">';
													content += '<h3 style="text-align:center;color:#721c24;">You do not have any fevorite vendor yet !</h3>';
													content += '</div>';
												content += '</div>';
										content += '</div>';
																	
									$('.church_users_list').empty();
									$('.church_users_list').append(content);
								}
								
							})
	
	

});

/*
|------------------------------------------------------------------------------
| Notifications
|------------------------------------------------------------------------------
*/

myApp.onPageInit('notifications', function(page) {
	if(user_detail.user_type == 'vendor'){
		$$('.page[data-page=notifications] .tool_for_customer').remove();
	}else{
		$$('.page[data-page=notifications] .tool_for_vendor').remove();
	}
	
	stop_variable_for_chat_api =0;
/*
	setTimeout(function() {
		var toast = myApp.toast('Swipe over the notifications to perform actions on them.', '', {duration: 3000});
		toast.show();
	}, 2000);	

	setTimeout(function() {
		var toast = myApp.toast('Pull the page down to refresh notifications list.', '', {duration: 3000});
		toast.show();
	}, 6000);	

	 Search Bar */
	var mySearchbar = myApp.searchbar('.page[data-page=notifications] .searchbar', {
    searchList: '.page[data-page=notifications] .list-block-search',
    searchIn: '.page[data-page=notifications] .item-title, .page[data-page=notifications] .item-after, .page[data-page=notifications] .item-subtitle, .page[data-page=notifications] .item-text'
	});

	/* Pull to Refresh 
	var ptrContent = $$('.page[data-page=notifications] .pull-to-refresh-content');
	ptrContent.on('ptr:refresh', function(e) {
		setTimeout(function() {
			myApp.addNotification({
        message: 'You have 3 new notifications.',
				hold: 2000,
				button: {
					text: ''
				}
			});
			myApp.pullToRefreshDone();
		}, 2000);	
	});*/
	
	var content ='';	
	var data = {
			user_id:user_detail['user_id'],
		}
		$.post(API_URL+'category/notification_for_public_user_unread', data)
				.success(function (data, status) {
					if(data.status == 200){
						var church_data = data.data;
						var i=0;
						for(i=0;i<church_data.length;i++){
							content +='<li class="swipeout unread">\n\
											<a href="#" class="swipeout-content item-content" name="'+church_data[i]['type_for']+'" value="'+church_data[i]['action_id']+'">\n\
												<div class="item-inner">\n\
													<div class="item-title-row">\n\
														<div class="item-title">'+church_data[i]['description']+'</div>\n\
													</div>\n\
													<div class="item-text">'+church_data[i]['created_date']+'    '+church_data[i]['created_time']+'</div>	\n\
												</div>\n\
											</a>\n\
										</li>\n\
										';
						}
						$('.all_request_notification').html(content);
						var data = {user_id : user_detail.user_id,}
							$.post(API_URL+'category/update_notification_for_public_user_read', data)
							.success(function (data, status) {})
					}
				})
				
	var data = {
			user_id:user_detail['user_id'],
		}
		$.post(API_URL+'category/notification_for_public_user_read', data)
				.success(function (data, status) {
					if(data.status == 200){
						var church_data = data.data;
						var i=0;
						for(i=0;i<church_data.length;i++){
							content +='<li class="swipeout read">\n\
											<a href="#" class="swipeout-content item-content" name="'+church_data[i]['type_for']+'" value="'+church_data[i]['action_id']+'">\n\
												<div class="item-inner">\n\
													<div class="item-title-row">\n\
														<div class="item-title">'+church_data[i]['description']+'</div>\n\
													</div>\n\
													<div class="item-text">'+church_data[i]['created_date']+'   '+church_data[i]['created_time']+'  </div>	\n\
												</div>\n\
											</a>\n\
										</li>\n\
										';
						}
						$('.all_request_notification').html(content);
					}
				})
	
	$$('.page[data-page=notifications] .swipeout-content').on('click', function() {
		var _id = $(this).attr('value');
		var type_for = $(this).attr('name');
		console.log(type_for);
		console.log(_id);
		if(type_for=='user_request_for_church'){
			mainView.router.load({url: 'friends_requests.html'});
		}else if(type_for=='user_request_for_another_user'){
			mainView.router.load({url: 'friends_requests.html'});
		}else{}
	});
	
	
		
});

myApp.onPageInit('redirect_page', function(page) {

	setTimeout(function() {
		mainView.router.load({
				url: redirect_page_name
			});
	}, 2000);

});




myApp.onPageInit('vendor_manage_offer', function(page) {
	setTimeout(
  function() 
  {
	  
		if(gotolist=='freeoffer'){
			
			$$( ".bbb").trigger( "click" );
			gotolist = '';
		}
		if(gotolist=='coupons'){
			
			$$( ".ccc").trigger( "click" );
			gotolist = '';
		}
  console.log('trigger');
	}, 100);
		
		$$('.page[data-page=vendor_manage_offer] .gotodiscountadd').on('click', function() {
			
			mainView.router.load({url: 'vendor_offer.html'});
		});
		$$('.page[data-page=vendor_manage_offer] .gotofreeofferadd').on('click', function() {
			gotoadd='freeoffer';
			
			mainView.router.load({url: 'vendor_offer.html'});
		});
		$$('.page[data-page=vendor_manage_offer] .gotocouponsadd').on('click', function() {
			gotoadd='coupons';
			
			mainView.router.load({url: 'vendor_offer.html'});
		});
	
//-------------------------------------------------------------------
	/*uploading drag and drop image for staff img add case*/
	$('#upload_image2').dmUploader({
        url: API_URL+'users/upload_banner_image',
        dataType: 'json',
		extraData: {
		  image_cat:'User',
		  sub_folder_name:$('#browseImage2').find('.sub_folder_name2').val(),
		},
		maxFiles :'1',
		fileName : 'myFile',
		//maxFileSize :'1',
        allowedTypes: 'image/*',
        /*extFilter: 'jpg;png;gif',*/
        onInit: function(){
          $.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
        },
        onBeforeUpload: function(id){
          
		  $.danidemo.addLog('#demo-debug', 'default', 'Starting the upload of #' + id);

          $.danidemo.updateFileStatus(id, 'default', 'Uploading...');
        },
        onNewFile: function(id, file){
			$('.demo-panel-files').empty();
			$.danidemo.addFile('#demo-files', id, file);
        },
        onComplete: function(){
          
		  $.danidemo.addLog('#demo-debug', 'default', 'All pending tranfers completed');
        },
        onUploadProgress: function(id, percent){
          var percentStr = percent + '%';

          $.danidemo.updateFileProgress(id, percentStr);
        },
        onUploadSuccess: function(id, data){
			var status= data.status;
			var filename_ = data.filename;
			if(status == 200){
				console.log(filename_);
				$('.bannerimage').attr('src',APP_BASE_URL+'uploads/'+filename_);
				$('#banner_image').val(filename_);
				myApp.closeModal('.popup-banner');
				//$("#myFile").val('');
			}else{
				//myApp.closeModal('.popup-cities');
                //alert(data.message);
				myApp.addNotification({message:data.message,hold: 1500});
			}
		  $.danidemo.addLog('#demo-debug', 'success', 'Upload of file #' + id + ' completed');

          $.danidemo.addLog('#demo-debug', 'info', 'Server Response for file #' + id + ': ' + JSON.stringify(data));

          $.danidemo.updateFileStatus(id, 'success', 'Upload Complete');

          $.danidemo.updateFileProgress(id, '100%');
			$('.demo-panel-files').empty();
			var content = '<span class="demo-note">No Files have been selected/droped yet...</span>';
			$('.demo-panel-files').html(content);
        },
        onUploadError: function(id, message){
			alert(message);
          $.danidemo.updateFileStatus(id, 'error', message);

          $.danidemo.addLog('#demo-debug', 'error', 'Failed to Upload file #' + id + ': ' + message);
        },
        onFileTypeError: function(file){
			alert('File \'' + file.name + '\' cannot be added: must be an image');
			$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: must be an image');
        },
        onFileSizeError: function(file){
			alert('File \'' + file.name + '\' cannot be added: size excess limit');
			$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: size excess limit');
        },
        /*onFileExtError: function(file){
          $.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' has a Not Allowed Extension');
        },*/
        onFallbackMode: function(message){
			alert('info', 'Browser not supported(do something else here!): ' + message);
          $.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);
        },
		onFilesMaxError: function(file){
			alert(' cannot be added to queue due to upload limits.');
		  $.danidemo.addLog(file.name + ' cannot be added to queue due to upload limits.');
		}
      });
	
	var data = {
		user_id:user_detail.user_id,			
					
	}
	$.post(API_URL+'vendor_side/get_categoy_list_of_goods', data)
		.success(function (data, status) {
			console.log(data.data);
				if(data.status == 200){
					var content = '';
					var category_data = data.data;
					content += ' <option value=""  >Select category</option>';
					$(category_data).each(function(key,value){		
						content += ' <option value="'+value['category_id']+'"  >'+value['category_name']+'</option>';
					});
					
					$('.category').empty();
					$('.category').append(content);
					
				}
				})
				.error(function (data, status) {
				});
			
			
	var data = {
		user_id:user_detail.user_id,			
					
	}
	$.post(API_URL+'vendor_side/get_flat_discount_on_vendor', data)
		.success(function (data, status) {
			console.log(data.data);
				if(data.status == 200){
					
					
					$('#flat_discount').val(data.data);
					
					if(data.flat_enable_status == 'enable'){
						$('.flat_msg').html('Flat discount currently enable.');
						setTimeout(function(){
							$('#checkbox_flat').prop("checked", true);
						}, 2000);
						
					
					}else{
						$('.flat_msg').html('Flat discount currently disable.');
					}
				}
				})
				.error(function (data, status) {
				});
			
			
			
			
			
		$('body').on('change', '.page[data-page=vendor_manage_offer] .category', function (){
			var cat_id= jQuery(this).val();
				myApp.showIndicator();
				var data = {
					user_id:user_detail.user_id,			
					cat_id:cat_id,			
								
				}
				$.post(API_URL+'vendor_side/get_subcat_list_of_goods', data)
					.success(function (data, status) {
						myApp.hideIndicator();
							if(data.status == 200){
								var content = '';
								var subcategory = data.data;
								
								content += ' <option value=""  >Select sub category</option>';
								$(subcategory).each(function(key,value){		
									content += ' <option value="'+value['sub_cat_id']+'"  >'+value['sub_cat_name']+'</option>';
								});
								
								$('.subcategory').empty();
								$('.subcategory').append(content);
								
							}
							})
							.error(function (data, status) {
							});	
		});


		$('body').on('change', '.page[data-page=vendor_manage_offer] .subcategory', function (){
				var subcat_id= jQuery(this).val();
				var cat_id= $('#category').val();
				myApp.showIndicator();
					var data = {
						user_id:user_detail.user_id,			
						subcat_id:subcat_id,			
						cat_id:cat_id,			
									
					}
					$.post(API_URL+'vendor_side/get_dis_list_of_goods', data)
						.success(function (data, status) {
							myApp.hideIndicator();
								if(data.status == 200){
									var content = '';
									var goodstype = data.data;
									
									content += ' <option value=""  >Select goods type</option>';
									$(goodstype).each(function(key,value){		
										content += ' <option value="'+value['goods_id']+'" price="'+value['goods_price']+'"  >'+value['type_value']+' '+value['type_name']+'</option>';
									});
									
									$('.goods_type').empty();
									$('.goods_type').append(content);
									
								}
								})
								.error(function (data, status) {
								});	
			});
	
	
	
		$('body').on('change', '.page[data-page=vendor_manage_offer] .goods_type', function (){
				
				var price= $(this).find(':selected').attr('price');
				
				console.log('00');
				$('#goods_price').val(price)
					
			});
	
	
	
		$('body').on('change', '.page[data-page=vendor_manage_offer] .discount_price', function (){
				
				var dis_price= $(this).val();
				var goods_price= $('#goods_price').val();
				var temp =goods_price*dis_price;
				var new_temp=(temp/100);
				
				
				var reduce_p= goods_price - new_temp.toFixed(2);
					$('#reduction_price').val(reduce_p)
			});
	
	
	
		$('body').on('click', '.page[data-page=vendor_manage_offer] .bannerimage', function (){
				myApp.popup('.popup-banner');
				
			});
	
	
	
	
	
$('.page[data-page=vendor_manage_offer] form[name=goods_discount]').validate({
	ignore: [],
	rules: {
			category: {
                required: true,
				
            },
		
			subcategory: {
                required: true,
				
            },
			discount_price: {
                required: true,
				
            },
			reduction_price: {
                required: true,
				
            },
			goods_type: {
                required: true,
				
            },
			/*banner_image: {
                required: true,
				
            },*/
		},
        messages: {
			category: {
                required: "Select category is required",
				
            },
			subcategory: {
                required: "Select subcategory is required",
				
            },
			discount_price: {
                required: "Enter discount is required",
				
            },
			reduction_price: {
                required: " reduction_price is required",
				
            },
			goods_type: {
                required: " goods type is required",
				
            },
			/*banner_image: {
                required: " image is required",
				
            },*/
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
			
            var category = $('#category').val();
            var subcategory = $('#subcategory').val();
            var discount_price = $('#discount_price').val();
            var reduction_price = $('#reduction_price').val();
            var goods_id = $('#goods_type').val();
            var banner_image = $('#banner_image').val();
           	myApp.showIndicator();
				var data1 = {
						category:category,			
						subcategory:subcategory,			
						goods_id:goods_id,
						discount_price:discount_price,
						user_id:user_detail.user_id,
						reduction_price:reduction_price,						
						banner_image:banner_image,						
					}
					$.post(API_URL+'vendor_side/manage_discount_on_goods', data1)
					.success(function (data, status) {
						myApp.hideIndicator();
						if(data.status == 200){
							
							redirect_page_name='vendor_manage_offer.html';
							myApp.addNotification({message:data.message,hold: 3000});
							mainView.router.load({url: 'redirect_page.html'});
						}else{
							myApp.addNotification({message:data.message,hold: 1500});
							
							return false;
						}
					})
					.error(function (data, status) {
					});
         
	}
	});


$('.page[data-page=vendor_manage_offer] form[name=goods_flat_discount]').validate({
	ignore: [],
	rules: {
			flat_discount: {
                required: true,
				
            },
		
			
		},
        messages: {
			
			flat_discount: {
                required: "Enter Flat discount is required",
            },
			
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
			var checkbox_flat =$('#checkbox_flat').is(':checked');
			console.log(checkbox_flat);
			if(checkbox_flat){
				var flat_enable_status='enable';
			}else{
				var flat_enable_status='disable';
			}
            var flat_discount = $('#flat_discount').val();
           myApp.showIndicator();
				var data1 = {
						
						flat_enable_status:flat_enable_status,
						flat_discount:flat_discount,
						user_id:user_detail.user_id,
											
					}
					$.post(API_URL+'vendor_side/manage_flat_discount_on_goods', data1)
					.success(function (data, status) {
						myApp.hideIndicator();
						if(data.status == 200){
							
							redirect_page_name='vendor_manage_offer.html';
							myApp.addNotification({message:data.message,hold: 3000});
							mainView.router.load({url: 'redirect_page.html'});
						}else{
							myApp.addNotification({message:data.message,hold: 1500});
							
							return false;
						}
					})
					.error(function (data, status) {
					});
         
	}
	});



$('.page[data-page=vendor_manage_offer] form[name=vendor_coupons]').validate({
	ignore: [],
	rules: {
			coupons_name: {
                required: true,
            },
			coupons_discount: {
                required: true,
            },
		
			
		},
        messages: {
			
			coupons_name: {
                required: "Enter  coupons is required",
            },
			coupons_discount: {
                required: "Enter  discount is required",
            },
			
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
			
            var coupons_name = $('#coupons_name').val();
            var coupons_discount = $('#coupons_discount').val();
            var coupon_id = $('#coupon_id').val();
           myApp.showIndicator();
				var data1 = {
						coupon_id:coupon_id,
						coupons_name:coupons_name,
						coupons_discount:coupons_discount,
						user_id:user_detail.user_id,
					}
					$.post(API_URL+'vendor_side/update_coupons', data1)
					.success(function (data, status) {
						myApp.hideIndicator();
						if(data.status == 200){
							
							redirect_page_name='vendor_manage_offer.html';
							myApp.addNotification({message:data.message,hold: 3000});
							mainView.router.load({url: 'redirect_page.html'});
						}else{
							myApp.addNotification({message:data.message,hold: 1500});
							
							return false;
						}
					})
					.error(function (data, status) {
					});
         
	}
	});


$('.page[data-page=vendor_manage_offer] form[name=goods_free_offer]').validate({
	ignore: [],
	rules: {
			offer_valid_amount: {
                required: true,
            },
			on_free_cat_id: {
                required: true,
            },
			on_free_subcat_id: {
                required: true,
            },
			free_quantity: {
                required: true,
            },
		
			
		},
        messages: {
			
			offer_valid_amount: {
                required: "Enter Purchase amount is required",
            },
			on_free_cat_id: {
                required: "Select category is required",
            },
			on_free_subcat_id: {
                required: "Select sub category is required",
            },
			free_quantity: {
                required: "Enter quantity is required",
            },
			
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
			
            var free_quantity = $('#free_quantity').val();
            var on_free_subcat_id = $('#on_free_subcat_id').val();
            var on_free_cat_id = $('#on_free_cat_id').val();
            var offer_valid_amount = $('#offer_valid_amount').val();
            var offer_id = $('#offer_id').val();
           myApp.showIndicator();
				var data1 = {
						offer_id:offer_id,
						offer_valid_amount:offer_valid_amount,
						free_quantity:free_quantity,
						on_free_subcat_id:on_free_subcat_id,
						on_free_cat_id:on_free_cat_id,
						user_id:user_detail.user_id,
					}
					$.post(API_URL+'vendor_side/update_free_offer', data1)
					.success(function (data, status) {
						myApp.hideIndicator();
						if(data.status == 200){
							
							redirect_page_name='vendor_manage_offer.html';
							myApp.addNotification({message:data.message,hold: 3000});
							mainView.router.load({url: 'redirect_page.html'});
						}else{
							myApp.addNotification({message:data.message,hold: 1500});
							
							return false;
						}
					})
					.error(function (data, status) {
					});
         
	}
	});



});



myApp.onPageInit('vendor_offer', function(page) {
	
	setTimeout(
  function() 
  {
	  
		if(gotoadd=='freeoffer'){
			
			$$( ".ddd").trigger( "click" );
			gotoadd = '';
		}
		if(gotoadd=='coupons'){
			
			$$( ".eee").trigger( "click" );
			gotoadd = '';
		}
  console.log('trigger');
	}, 100);
	
	
	
	
	
		$$('.page[data-page=vendor_offer] .gotodiscountlist').on('click', function() {
			
			mainView.router.load({url: 'vendor_manage_offer.html'});
		});
		$$('.page[data-page=vendor_offer] .gotofreeofferlist').on('click', function() {
			gotolist='freeoffer';
			
			mainView.router.load({url: 'vendor_manage_offer.html'});
		});
		$$('.page[data-page=vendor_offer] .gotocouponslist').on('click', function() {
			gotolist='coupons';
			
			mainView.router.load({url: 'vendor_manage_offer.html'});
		});
	
	
	$$('.page[data-page=vendor_offer] .free_offer_list').on('click', function() {
		myApp.showIndicator();
		var data = {
			user_id : user_detail.user_id,
				}
				$.post(API_URL+'vendor_side/get_all_list_offer', data)
							.success(function (data, status) {
								myApp.hideIndicator();
								if(data.status == 200){
									
									
									var content ='';
								 var fo_data = data.data;
								
								
								
								
								content += '<div class="item-content" style="border-bottom: 2px solid #eee;">';
							content += '<div class="row" style="width: 100%;">';
										content += '<div class="col-30">';
											content += '<span >Purchase Amount</span>';
										content += '</div>';
										content += '<div class="col-50">';								
										content += '<span >Offer</span>';
										content += '</div>';
										content += '<div class="col-20">';								
										content += '<span >Action</span>';
										content += '</div>';
								content += '</div>';
							content += '</div>';
							
								$(fo_data).each(function(key,value){
								
								
								content += '<div class="item-content" style="border-bottom: 1px solid #eee;padding: 5px 10px 5px 15px;">';
									content += '<div class="row" style="width: 100%;">';
												content += '<div class="col-30">';
													
													content += '<span style="padding-left: 10px; margin-top: 5px; line-height: 1.2em;"><i class="fa fa-inr fa-indian-rupee"></i>	'+ value['offer_valid_amount'] +'</span>';
												content += '</div>';
												content += '<div class="col-50">';								
												content += '<span style="padding-left: 10px; margin-top: 5px; line-height: 1.2em;">	'+ value['category_name'] +' '+ value['sub_category_name'] +'</span>';
												content += '</br><span style="padding-left: 10px; margin-top: 5px; line-height: 1.2em;"> '+ value['free_quantity'] +'</span>';
												content += '</div>';
												content += '<div class="col-20">';								
												content += '<a href="#" class="free_offer_edit" offer_id="'+ value['offer_id'] +'" ><i class="fa fa-edit"></i></a>';
												content += '<a href="#" style="padding-left: 10px;color:red;" class="free_offer_remove" offer_id="'+ value['offer_id'] +'" ><i class="fa fa-times"></i></a>';
												content += '</div>';
												
										content += '</div>';
									content += '</div>';
									
								});
						
							
								
								$('.vendorfreeofferhtmal').empty();
								$('.vendorfreeofferhtmal').append(content);
								
								$$('.page[data-page=vendor_offer] .free_offer_edit').on('click', function() {
									 free_offer_edit_id = jQuery(this).attr('offer_id');
									mainView.router.load({url: 'free_offer_edit.html'});		
								});	
								
								$$('.page[data-page=vendor_offer] .free_offer_remove').on('click', function() {
									 var offer_id= jQuery(this).attr('offer_id');
									 myApp.showIndicator();
									var data = {
											offer_id:offer_id,
											user_id : user_detail.user_id,
										}
										$.post(API_URL+'vendor_side/update_free_offer_remove', data)
												.success(function (data, status) {
													myApp.hideIndicator();
													if(data.status == 200){
																myApp.addNotification({message:data.message,hold: 1500});
																redirect_page_name='vendor_offer.html';
																mainView.router.load({url: 'redirect_page.html'});
													}else{
														myApp.addNotification({message:data.message,hold: 1500});
													}
													
												})
												.error(function (data, status) {
												});		
								});	
								
								
								}else{
									$('.vendorfreeofferhtmal').html('<p class=" text-center">You do not have any Free Offer yet!</p>');
								}
								
							})
							.error(function (data, status) {
							});
							
							
							
		});			

				
	$$('.page[data-page=vendor_offer] .cop_list').on('click', function() {
		myApp.showIndicator();
		var data = {
			user_id : user_detail.user_id,
				}
				$.post(API_URL+'vendor_side/get_all_vendor_coupons', data)
							.success(function (data, status) {
								myApp.hideIndicator();
								if(data.status == 200){
									
									
									var content ='';
								 var c_data = data.data;
								
								
								
								
								content += '<div class="item-content" style="border-bottom: 2px solid #eee;">';
							content += '<div class="row" style="width: 100%;">';
										content += '<div class="col-50">';
											content += '<span >Coupons</span>';
										content += '</div>';
										content += '<div class="col-30">';								
										content += '<span >Discount (%)</span>';
										content += '</div>';
										content += '<div class="col-20">';								
										content += '<span >Action</span>';
										content += '</div>';
								content += '</div>';
							content += '</div>';
							
								$(c_data).each(function(key,value){
								
								
								content += '<div class="item-content" style="border-bottom: 1px solid #eee;padding: 5px 10px 5px 15px;">';
									content += '<div class="row" style="width: 100%;">';
												content += '<div class="col-50">';
													
													content += '<span style="padding-left: 10px; margin-top: 5px; line-height: 1.2em;">	'+ value['coupons_name'] +'</span>';
												content += '</div>';
												content += '<div class="col-30">';								
												content += '<span style="padding-left: 10px; margin-top: 5px; line-height: 1.2em;">	'+ value['coupons_discount'] +'</span>';
												content += '</div>';
												content += '<div class="col-20">';								
												content += '<a href="#" class="coupons_edit" coupon_id="'+ value['coupon_id'] +'" ><i class="fa fa-edit"></i></a>';
												content += '<a href="#" style="padding-left: 10px;color:red;" class="coupons_remove" coupon_id="'+ value['coupon_id'] +'" ><i class="fa fa-times"></i></a>';
												content += '</div>';
												
										content += '</div>';
									content += '</div>';
									
								});
						
							
								
								$('.vendorcouponslisthtmal').empty();
								$('.vendorcouponslisthtmal').append(content);
								
								$$('.page[data-page=vendor_offer] .coupons_edit').on('click', function() {
									 coupon_id_edit= jQuery(this).attr('coupon_id');
									mainView.router.load({url: 'coupons_edit.html'});		
								});	
								
								$$('.page[data-page=vendor_offer] .coupons_remove').on('click', function() {
									 var coupon_id= jQuery(this).attr('coupon_id');
									 myApp.showIndicator();
									var data = {
											coupon_id:coupon_id,
											user_id : user_detail.user_id,
										}
										$.post(API_URL+'vendor_side/update_coupons_remove', data)
												.success(function (data, status) {
													myApp.hideIndicator();
													if(data.status == 200){
																myApp.addNotification({message:data.message,hold: 1500});
																redirect_page_name='vendor_offer.html';
																mainView.router.load({url: 'redirect_page.html'});
													}else{
														myApp.addNotification({message:data.message,hold: 1500});
													}
													
												})
												.error(function (data, status) {
												});		
								});	
								
								
								}else{
									$('.vendorcouponslisthtmal').html('<p class=" text-center">You do not have any coupons yet!</p>');
								}
								
							})
							.error(function (data, status) {
							});
							
							
							
		});			

				
							//// discout session
	
	
								
			var data = {
			user_id : user_detail.user_id,
				}
				$.post(API_URL+'vendor_side/get_all_vendor_discount_list', data)
							.success(function (data, status) {
								if(data.status == 200){
									
			
									var content1 ='';
								 var d_data = data.data;
								
						
						
						
						content1 += '<div class="item-content" style="border-bottom: 2px solid #eee;">';
					content1 += '<div class="row" style="width: 100%;">';
								content1 += '<div class="col-50">';
									content1 += '<span >Goods</span>';
								content1 += '</div>';
								content1 += '<div class="col-30">';								
								content1 += '<span >Discount (%)</span>';
								content1 += '</div>';
								content1 += '<div class="col-20">';								
								content1 += '<span >Action</span>';
								content1 += '</div>';
						content1 += '</div>';
					content1 += '</div>';
					
						$(d_data).each(function(key,value){
						
						
						content1 += '<div class="item-content" style="border-bottom: 1px solid #eee;padding: 5px 0px 5px 0px;">';
							content1 += '<div class="row" style="width: 100%;">';
										content1 += '<div class="col-50">';
											
											content1 += '<span style="padding-left: 10px; margin-top: 5px; line-height: 1.2em;">	'+ value['sub_category_name'] +'</span>';
							
											content1 += '</br><span style="padding-left: 10px; margin-top: 5px; line-height: 1.2em;"> '+ value['type_value'] +''+ value['type_name'] +', <i class="fa fa-inr fa-indian-rupee"></i> '+ value['goods_price'] +'</span>';
										content1 += '</div>';
										content1 += '<div class="col-30">';								
										content1 += '<span style="padding-left: 10px; margin-top: 5px; line-height: 1.2em;">	'+ value['discount'] +'</span>';
										content1 += '</div>';
										content1 += '<div class="col-20">';								
										content1 += '<a href="#" class="discount_edit" goods_id="'+ value['goods_id'] +'" ><i class="fa fa-edit"></i></a>';
										content1 += '<a href="#" style="padding-left: 10px;color:red;" class="discount_remove" goods_id="'+ value['goods_id'] +'" ><i class="fa fa-times"></i></a>';
										content1 += '</div>';
										
								content1 += '</div>';
							content1 += '</div>';
							
						});
				
	
		
			$('.vendordiscountslisthtmal').html(content1);
			
			$$('.page[data-page=vendor_offer] .discount_edit').on('click', function() {
					 discount_edit_goods_id= jQuery(this).attr('goods_id');
				
						mainView.router.load({url: 'discount_edit.html'});
									
				});
				
				$$('.page[data-page=vendor_offer] .discount_remove').on('click', function() {
					console.log('dsdssd');
					var goods_id= jQuery(this).attr('goods_id');
					
					var data = {
						goods_id:goods_id,
						user_id : user_detail.user_id,
					}
					$.post(API_URL+'vendor_side/update_discount_remove', data)
							.success(function (data, status) {
								if(data.status == 200){
											myApp.addNotification({message:data.message,hold: 1500});
											redirect_page_name='vendor_offer.html';
											mainView.router.load({url: 'redirect_page.html'});
								}else{
									myApp.addNotification({message:data.message,hold: 1500});
								}
								
							})
							.error(function (data, status) {
							});
				});
		}else{
			$('.vendordiscountslisthtmal').html('<p class=" text-center">You do not have any coupons yet!</p>');
		}
		
	})
	
				
								
	
});





myApp.onPageInit('discount_edit', function(page) {

	
//-------------------------------------------------------------------
	/*uploading drag and drop image for staff img add case*/
	$('#upload_image2').dmUploader({
        url: API_URL+'users/upload_banner_image',
        dataType: 'json',
		extraData: {
		  image_cat:'User',
		  sub_folder_name:$('#browseImage2').find('.sub_folder_name2').val(),
		},
		maxFiles :'1',
		fileName : 'myFile',
		//maxFileSize :'1',
        allowedTypes: 'image/*',
        /*extFilter: 'jpg;png;gif',*/
        onInit: function(){
          $.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
        },
        onBeforeUpload: function(id){
          
		  $.danidemo.addLog('#demo-debug', 'default', 'Starting the upload of #' + id);

          $.danidemo.updateFileStatus(id, 'default', 'Uploading...');
        },
        onNewFile: function(id, file){
			$('.demo-panel-files').empty();
			$.danidemo.addFile('#demo-files', id, file);
        },
        onComplete: function(){
          
		  $.danidemo.addLog('#demo-debug', 'default', 'All pending tranfers completed');
        },
        onUploadProgress: function(id, percent){
          var percentStr = percent + '%';

          $.danidemo.updateFileProgress(id, percentStr);
        },
        onUploadSuccess: function(id, data){
			var status= data.status;
			var filename_ = data.filename;
			if(status == 200){
				console.log(filename_);
				$('.bannerimage').attr('src',APP_BASE_URL+'uploads/'+filename_);
				$('#banner_image').val(filename_);
				myApp.closeModal('.popup-banner');
				//$("#myFile").val('');
			}else{
				//myApp.closeModal('.popup-cities');
                //alert(data.message);
				myApp.addNotification({message:data.message,hold: 1500});
			}
		  $.danidemo.addLog('#demo-debug', 'success', 'Upload of file #' + id + ' completed');

          $.danidemo.addLog('#demo-debug', 'info', 'Server Response for file #' + id + ': ' + JSON.stringify(data));

          $.danidemo.updateFileStatus(id, 'success', 'Upload Complete');

          $.danidemo.updateFileProgress(id, '100%');
			$('.demo-panel-files').empty();
			var content = '<span class="demo-note">No Files have been selected/droped yet...</span>';
			$('.demo-panel-files').html(content);
        },
        onUploadError: function(id, message){
			alert(message);
          $.danidemo.updateFileStatus(id, 'error', message);

          $.danidemo.addLog('#demo-debug', 'error', 'Failed to Upload file #' + id + ': ' + message);
        },
        onFileTypeError: function(file){
			alert('File \'' + file.name + '\' cannot be added: must be an image');
			$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: must be an image');
        },
        onFileSizeError: function(file){
			alert('File \'' + file.name + '\' cannot be added: size excess limit');
			$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: size excess limit');
        },
        /*onFileExtError: function(file){
          $.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' has a Not Allowed Extension');
        },*/
        onFallbackMode: function(message){
			alert('info', 'Browser not supported(do something else here!): ' + message);
          $.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);
        },
		onFilesMaxError: function(file){
			alert(' cannot be added to queue due to upload limits.');
		  $.danidemo.addLog(file.name + ' cannot be added to queue due to upload limits.');
		}
      });
	
	
	var data = {	goods_id:discount_edit_goods_id,
						user_id : user_detail.user_id,
					}
					$.post(API_URL+'vendor_side/get_list_discount_edit_goods_id', data)
					.success(function (data, status) {
						if(data.status == 200){
							var gdata = data.data[0];
					
						
							$('.bannerimage').attr('src',APP_BASE_URL+'uploads/'+gdata.banner_image);
							$('#banner_image').val(gdata.banner_image);			
							$('#goods_id').val(gdata.goods_id);			
							$('#category_name').val(gdata.category_name);			
							$('#subcategory').val(gdata.sub_category_name);			
							$('#goods_type').val(gdata.type_value +' '+gdata.type_name);			
							$('#goods_price').val(gdata.goods_price);			
							$('#discount_price').val(gdata.discount);			
							$('#reduction_price').val(gdata.after_discount_price);			
							
							$('body').on('change', '.page[data-page=discount_edit] .discount_price', function (){
									
								var dis_price= $(this).val();
								var goods_price= $('#goods_price').val();
								var temp =goods_price*dis_price;
								var new_temp=(temp/100);
								var reduce_p= goods_price - new_temp.toFixed(2);
								$('#reduction_price').val(reduce_p)
							});
	
						}
						
					})

					
					
					
					
				$('body').on('click', '.page[data-page=discount_edit] .bannerimage', function (){
						myApp.popup('.popup-banner');
						
					});
					
							
							
				
$('.page[data-page=discount_edit] form[name=edit_goods_discount]').validate({
	ignore: [],
	rules: {
			
			discount_price: {
                required: true,
				
            },
			reduction_price: {
                required: true,
				
            },
			goods_type: {
                required: true,
				
            },
			/*banner_image: {
                required: true,
				
            },*/
		},
        messages: {
			
			discount_price: {
                required: "Enter discount is required",
				
            },
			reduction_price: {
                required: " reduction_price is required",
				
            },
			goods_type: {
                required: " goods type is required",
				
            },
			/*banner_image: {
                required: " image is required",
				
            },*/
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
			
         
            var discount_price = $('#discount_price').val();
            var reduction_price = $('#reduction_price').val();
            var goods_id = $('#goods_id').val();
         //   var goods_type = $('#goods_type').val();
            var banner_image = $('#banner_image').val();
           	myApp.showIndicator();
				var data1 = {
								
					goods_id:goods_id,
					discount_price:discount_price,
					user_id:user_detail.user_id,
					reduction_price:reduction_price,						
					banner_image:banner_image,						
				}
				$.post(API_URL+'vendor_side/manage_discount_on_goods', data1)
				.success(function (data, status) {
					myApp.hideIndicator();
					if(data.status == 200){
						
						//redirect_page_name='vendor_manage_offer.html';
						myApp.addNotification({message:"Discount updated successfully",hold: 3000});
						mainView.router.load({url: 'vendor_offer.html'});
					}else{
						myApp.addNotification({message:data.message,hold: 1500});
						
						return false;
					}
				})
				.error(function (data, status) {
				});
         
	}
	});

				
							
							
});




myApp.onPageInit('coupons_edit', function(page) {

	

	
	var data = {
		coupon_id:coupon_id_edit,
		user_id : user_detail.user_id,
			}
			$.post(API_URL+'vendor_side/get_list_coupon_id', data)
			.success(function (data, status) {
				if(data.status == 200){
					var gdata = data.data[0];
			
				
							
					$('#coupons_discount').val(gdata.coupons_discount);			
					$('#coupon_id').val(gdata.coupon_id);			
					$('#coupons_name').val(gdata.coupons_name);			
					
				}
				
			})
			.error(function (data, status) {
			});
					
					
					
	
$('.page[data-page=coupons_edit] form[name=vendor_coupons]').validate({
	ignore: [],
	rules: {
			coupons_name: {
                required: true,
            },
			coupons_discount: {
                required: true,
            },
		
			
		},
        messages: {
			
			coupons_name: {
                required: "Enter  coupons is required",
            },
			coupons_discount: {
                required: "Enter  discount is required",
            },
			
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
			
            var coupons_name = $('#coupons_name').val();
            var coupons_discount = $('#coupons_discount').val();
            var coupon_id = $('#coupon_id').val();
           	myApp.showIndicator();
				var data1 = {
						coupon_id:coupon_id,
						coupons_name:coupons_name,
						coupons_discount:coupons_discount,
						user_id:user_detail.user_id,
					}
					$.post(API_URL+'vendor_side/update_coupons', data1)
					.success(function (data, status) {
						myApp.hideIndicator();
						if(data.status == 200){
							
							
							myApp.addNotification({message:"Coupon updated successfully",hold: 3000});
							mainView.router.load({url: 'vendor_offer.html'});
						}else{
							myApp.addNotification({message:data.message,hold: 1500});
							
							return false;
						}
					})
					.error(function (data, status) {
					});
         
	}
	});
				
							
				
});




myApp.onPageInit('free_offer_edit', function(page) {

	

	
	var data = {
		offer_id:free_offer_edit_id,
		user_id : user_detail.user_id,
			}
			$.post(API_URL+'vendor_side/get_offer_by_id', data)
			.success(function (data, status) {
				if(data.status == 200){
					var foedata = data.data[0];
			
				
							
					$('#offer_id').val(foedata.offer_id);			
					$('#offer_valid_amount').val(foedata.offer_valid_amount);			
					$('#category_name').val(foedata.category_name);			
					$('#sub_category_name').val(foedata.sub_category_name);			
					$('#free_quantity').val(foedata.free_quantity);			
					$('#on_free_subcat_id').val(foedata.on_free_subcat_id);			
					$('#on_free_cat_id').val(foedata.on_free_cat_id);			
					
				}
				
			})
			.error(function (data, status) {
			});
					
					
					
	
$('.page[data-page=free_offer_edit] form[name=goods_free_offer]').validate({
	ignore: [],
	rules: {
			offer_valid_amount: {
                required: true,
            },
			on_free_cat_id: {
                required: true,
            },
			on_free_subcat_id: {
                required: true,
            },
			free_quantity: {
                required: true,
            },
		
			
		},
        messages: {
			
			offer_valid_amount: {
                required: "Enter Purchase amount is required",
            },
			on_free_cat_id: {
                required: "Select category is required",
            },
			on_free_subcat_id: {
                required: "Select sub category is required",
            },
			free_quantity: {
                required: "Enter quantity is required",
            },
			
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
			
            var free_quantity = $('#free_quantity').val();
            var on_free_subcat_id = $('#on_free_subcat_id').val();
            var on_free_cat_id = $('#on_free_cat_id').val();
            var offer_valid_amount = $('#offer_valid_amount').val();
            var offer_id = $('#offer_id').val();
           myApp.showIndicator();
				var data1 = {
						offer_id:offer_id,
						offer_valid_amount:offer_valid_amount,
						free_quantity:free_quantity,
						on_free_subcat_id:on_free_subcat_id,
						on_free_cat_id:on_free_cat_id,
						user_id:user_detail.user_id,
					}
					$.post(API_URL+'vendor_side/update_free_offer', data1)
					.success(function (data, status) {
						myApp.hideIndicator();
						if(data.status == 200){
							
							
							myApp.addNotification({message:"Free Offer Updated successfully",hold: 3000});
							mainView.router.load({url: 'vendor_offer.html'});
						}else{
							myApp.addNotification({message:data.message,hold: 1500});
							
							return false;
						}
					})
					.error(function (data, status) {
					});
         
	}
	});
		
							
				
});





myApp.onPageInit('vendor_manage_combo_goods', function(page) {
	
	
	
	
	
	
		
//-------------------------------------------------------------------
	/*uploading drag and drop image for staff img add case*/
	$('#upload_image2').dmUploader({
        url: API_URL+'users/upload_image',
        dataType: 'json',
		extraData: {
		  image_cat:'User',
		  sub_folder_name:$('#browseImage2').find('.sub_folder_name2').val(),
		},
		maxFiles :'1',
		fileName : 'myFile',
		//maxFileSize :'1',
        allowedTypes: 'image/*',
        /*extFilter: 'jpg;png;gif',*/
        onInit: function(){
          $.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
        },
        onBeforeUpload: function(id){
          
		  $.danidemo.addLog('#demo-debug', 'default', 'Starting the upload of #' + id);

          $.danidemo.updateFileStatus(id, 'default', 'Uploading...');
        },
        onNewFile: function(id, file){
			$('.demo-panel-files').empty();
			$.danidemo.addFile('#demo-files', id, file);
        },
        onComplete: function(){
          
		  $.danidemo.addLog('#demo-debug', 'default', 'All pending tranfers completed');
        },
        onUploadProgress: function(id, percent){
          var percentStr = percent + '%';

          $.danidemo.updateFileProgress(id, percentStr);
        },
        onUploadSuccess: function(id, data){
			var status= data.status;
			var filename_ = data.filename;
			if(status == 200){
				console.log(filename_);
				$('.bannerimage').attr('src',APP_BASE_URL+'uploads/'+filename_);
				$('#banner_image').val(filename_);
				myApp.closeModal('.popup-banner');
				//$("#myFile").val('');
			}else{
				//myApp.closeModal('.popup-cities');
                //alert(data.message);
				myApp.addNotification({message:data.message,hold: 1500});
			}
		  $.danidemo.addLog('#demo-debug', 'success', 'Upload of file #' + id + ' completed');

          $.danidemo.addLog('#demo-debug', 'info', 'Server Response for file #' + id + ': ' + JSON.stringify(data));

          $.danidemo.updateFileStatus(id, 'success', 'Upload Complete');

          $.danidemo.updateFileProgress(id, '100%');
			$('.demo-panel-files').empty();
			var content = '<span class="demo-note">No Files have been selected/droped yet...</span>';
			$('.demo-panel-files').html(content);
        },
        onUploadError: function(id, message){
			alert(message);
          $.danidemo.updateFileStatus(id, 'error', message);

          $.danidemo.addLog('#demo-debug', 'error', 'Failed to Upload file #' + id + ': ' + message);
        },
        onFileTypeError: function(file){
			alert('File \'' + file.name + '\' cannot be added: must be an image');
			$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: must be an image');
        },
        onFileSizeError: function(file){
			alert('File \'' + file.name + '\' cannot be added: size excess limit');
			$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: size excess limit');
        },
        /*onFileExtError: function(file){
          $.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' has a Not Allowed Extension');
        },*/
        onFallbackMode: function(message){
			alert('info', 'Browser not supported(do something else here!): ' + message);
          $.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);
        },
		onFilesMaxError: function(file){
			alert(' cannot be added to queue due to upload limits.');
		  $.danidemo.addLog(file.name + ' cannot be added to queue due to upload limits.');
		}
      });
	
	
	
	$('body').on('click', '.page[data-page=vendor_manage_combo_goods] .bannerimage', function (){
			myApp.popup('.popup-banner');
			
		});
		
		
	  	var como_arrary=[];
	var data = {
			user_id:user_detail.user_id,
		}
	$.post(API_URL+'Vendor_combo/vendor_all_goods_list',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					var	goodsdata =data.data;
					var content = '';
					
						 content += ' <div class="tt">';
									
										 content += ' <div class="content-block" style="margin: 0px; padding: 0px;">';
										 content += '<div class="row" style="font-size: 16px;padding: 12px 10px; background-color: #009688!important; color: #fff;" >';
												content += '<div class="col-10"  >';
																
														content += '</label></div><div class="col-50"><span>Product Name</span></div>';	
												content += '<div class="col-40" style="text-align: center;"><span>Qyt : Price(<i class="fa fa-inr fa-indian-rupee"></i>)</span>';	
												content += '</div>';	
												content += '</div>';
												$(goodsdata).each(function(key1,value1){
														content += '<div class="item-content" style="border-bottom: 1px solid #eee;padding: 5px 0px 5px 5px;">';
															content += '<div class="row good_input_checkbox" style="width: 100%;">';
																		content += '<div class="col-10 " style="padding: 10px;">';
																		
																			content += '<label class="label-checkbox item-content ">';
																			
																				content += '<input  type="checkbox" class="checkbox_combo" id="checkbox_combo" name="checkbox_combo" name_combo="'+value1['sub_category_name']+' '+value1['type_value']+''+value1['type_name']+'" price="'+value1['goods_price']+'" value="'+value1['goods_id']+'" />';
																			
																			content += '<span class="item-media">';
																			content += '<i class="icon icon-form-checkbox"></i>';
																			content += '</span>';
																		content += '</label>';
																		
																		content += '</div>';
																		content += '<div class="col-50">';
																			content += '<img class=" " style="    float: left;width:50px;height: 50px;" src="'+APP_BASE_URL+'uploads/'+value1['goods_image']+'"  />';
																			
																			//content += '<span style="padding-left: 10px; margin-top: 5px; ">'+ value1['category_name'] +'</span>';
																		content += '<span style="padding-left: 10px; margin-top: 5px;">	'+ value1['sub_category_name'] +'</span></br>';
																		content += '</div>';
																		content += '<div class="col-40 ">';
																		
																	
																		content += '<span style="padding-left: 10px; margin-top: 5px; ">'+ value1['type_value'] +' '+ value1['type_name'] +' : <i class="fa fa-inr fa-indian-rupee"></i>'+ value1['goods_price'] +' </span>';
																		
														
																		content += '</div>';
																content += '</div>';
															content += '</div>';
													});
												
							content += '</div>';
												
					$('#vendormanagecombohtml1').empty();
					$('#vendormanagecombohtml1').append(content);
					$$('.page[data-page=vendor_manage_combo_goods] .checkbox_combo').on('change', function() {
					
						 como_arrary=[];
						
						var mytbTHis = $(this);
						var mytb = $(this).closest('.tt');
						
						var total_price=0;
						var name_combo='';
						$(mytb).find('.good_input_checkbox').each(function () {
							var checked =$(this).find('.checkbox_combo').is(':checked');
							if(checked){
								var goods_id=$(this).find('.checkbox_combo').val();
								var goods_price=$(this).find('.checkbox_combo').attr('price');
								var n_combo=$(this).find('.checkbox_combo').attr('name_combo');
								como_arrary.push(goods_id);
								if(name_combo ==''){
									name_combo =(n_combo);
								}else{
									name_combo =(name_combo) +' + '+ (n_combo);
								}
								total_price =parseInt(total_price)+parseInt(goods_price);
								$('#total_price').val(total_price);
								$('#name_combo').val(name_combo);
							}
						
						var dis_price =$('#combo_discount_price').val();
						if(dis_price >0){
							var goods_price= $('#total_price').val();
							var temp =goods_price*dis_price;
							var new_temp=(temp/100);
							var reduce_p= goods_price - new_temp.toFixed(2);
							$('#combo_price').val(reduce_p);
						}
						});
						
						
					});
					
					$$('.page[data-page=vendor_manage_combo_goods] .combo_discount_price').on('change', function() {
									
						var dis_price= $(this).val();
						var goods_price= $('#total_price').val();
						var temp =goods_price*dis_price;
						var new_temp=(temp/100);
						var reduce_p= goods_price - new_temp.toFixed(2);
						$('#combo_price').val(reduce_p);
					});
					
					
				}
			})
		.error(function (data, status) {
		});
							
				
			
$('.page[data-page=vendor_manage_combo_goods] form[name=combo]').validate({
	ignore: [],
	rules: {
			name_combo: {
                required: true,
            },
			total_price: {
                required: true,
            },
			combo_discount_price: {
                required: true,
            },
			combo_price: {
                required: true,
            },
			banner_image: {
                required: true,
            },
		
			
		},
        messages: {
			
			name_combo: {
                required: "Check above goods is required",
            },
			total_price: {
                required: "Select category is required",
            },
			combo_discount_price: {
                required: "combo discount is required",
            },
			combo_price: {
                required: "combo price is required",
            },
			banner_image: {
                required: "Image is required",
            },
			
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
			
            var name_combo = $('#name_combo').val();
			console.log(name_combo);
            var combo_image = $('#banner_image').val();
            var total_price = $('#total_price').val();
            var combo_discount_price = $('#combo_discount_price').val();
            var combo_price = $('#combo_price').val();
          myApp.showIndicator();
           var combo_id=0;
				var data1 = {
						como_arrary:como_arrary,
						combo_id:combo_id,
						combo_image:combo_image,
						name_combo:name_combo,
						total_price:total_price,
						combo_discount_price:combo_discount_price,
						combo_price:combo_price,
						
						user_id:user_detail.user_id,
					}
					$.post(API_URL+'vendor_combo/update_combo_goods', data1)
					.success(function (data, status) {
						myApp.hideIndicator();
						if(data.status == 200){
							
							
							myApp.addNotification({message:"Combo goods added successfully",hold: 3000});
							redirect_page_name='vendor_combo_list.html';
								mainView.router.load({url: 'redirect_page.html'});
												
						}else{
							myApp.addNotification({message:data.message,hold: 1500});
							
							return false;
						}
					})
					.error(function (data, status) {
					});
         
	}
	});	
				
	
	
	
});









myApp.onPageInit('vendor_combo_list', function(page) {
	
	  
	var data = {
			user_id:user_detail.user_id,
		}
	$.post(API_URL+'vendor_combo/get_combo_goods_list',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					var	combodata =data.data;
					var content = '';
					
							content += '<div class="item-content" style="border-bottom: 2px solid #eee; padding-left: 0px;">';
							content += '<div class="row" style="width: 100%;">';
										content += '<div class="col-80">';
											content += '<span >Combo </span>';
										content += '</div>';
										content += '<div class="col-20">';								
										content += '<span >Action</span>';
										content += '</div>';
								content += '</div>';
							content += '</div>';
							
								$(combodata).each(function(key,value){
								
									content += '<div class="item-content" style="border-bottom: 1px solid #eee;padding: 5px 0px 5px 0px;">';
									content += '<div class="row" style="width: 100%;">';
									content += '<div class="col-80">';
									content += '<span style=" margin-top: 5px;"><i>'+ value['name_combo'] +'</i></span></br>';
									content += '<span style=" margin-top: 5px;"><i><img style="width: 50px;height: 50px;" src="'+APP_BASE_URL+'uploads/'+value['combo_image']+'" width="100%" /> </i></span>';
									
									
									content += '</br><span style="margin-top: 5px;font-size: 12px;">Offer Price: <i class="fa fa-inr fa-indian-rupee"></i>'+ value['combo_price'] +',<br/> Discount: '+ value['combo_discount_price'] +'(%) ,<br/> Actual Price: <i class="fa fa-inr fa-indian-rupee"></i>'+ value['total_price'] +' </span>';
									content += '</div>';
									content += '<div class="col-20">';								
									content += '<a href="#" class="combo_goods_edit" combo_id="'+ value['combo_id'] +'" ><i class="fa fa-edit"></i></a>';
									content += '<a href="#" style="padding-left: 10px;color:red;" class="combo_goods_remove" combo_id="'+ value['combo_id'] +'" ><i class="fa fa-times"></i></a>';
									content += '</div>';
									content += '</div>';
									content += '</div>';
									
								});
						
												
					$('#vendor_combo_listhtml').empty();
					$('#vendor_combo_listhtml').append(content);
					
						$$('.page[data-page=vendor_combo_list] .combo_goods_remove').on('click', function() {
									 var combo_id= jQuery(this).attr('combo_id');
									  myApp.showIndicator();
									var data = {
											combo_id:combo_id,
											user_id : user_detail.user_id,
										}
										$.post(API_URL+'vendor_combo/update_combo_goods_remove', data)
												.success(function (data, status) {
													myApp.hideIndicator();
													if(data.status == 200){
																myApp.addNotification({message:data.message,hold: 1500});
																redirect_page_name='vendor_combo_list.html';
																mainView.router.load({url: 'redirect_page.html'});
													}else{
														myApp.addNotification({message:data.message,hold: 1500});
													}
													
												})
												.error(function (data, status) {
												});		
								});	
								
								$$('.page[data-page=vendor_combo_list] .combo_goods_edit').on('click', function() {
									  combo_id_goods_edit= jQuery(this).attr('combo_id');
										mainView.router.load({url: 'vendor_combo_edit.html'});
								});	
					
				}
			})
		.error(function (data, status) {
		});
							
				
	
	
});







myApp.onPageInit('vendor_edit_combo_goods', function(page) {
	
	
		
//-------------------------------------------------------------------
	/*uploading drag and drop image for staff img add case*/
	$('#upload_image2').dmUploader({
        url: API_URL+'users/upload_image',
        dataType: 'json',
		extraData: {
		  image_cat:'User',
		  sub_folder_name:$('#browseImage2').find('.sub_folder_name2').val(),
		},
		maxFiles :'1',
		fileName : 'myFile',
		//maxFileSize :'1',
        allowedTypes: 'image/*',
        /*extFilter: 'jpg;png;gif',*/
        onInit: function(){
          $.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
        },
        onBeforeUpload: function(id){
          
		  $.danidemo.addLog('#demo-debug', 'default', 'Starting the upload of #' + id);

          $.danidemo.updateFileStatus(id, 'default', 'Uploading...');
        },
        onNewFile: function(id, file){
			$('.demo-panel-files').empty();
			$.danidemo.addFile('#demo-files', id, file);
        },
        onComplete: function(){
          
		  $.danidemo.addLog('#demo-debug', 'default', 'All pending tranfers completed');
        },
        onUploadProgress: function(id, percent){
          var percentStr = percent + '%';

          $.danidemo.updateFileProgress(id, percentStr);
        },
        onUploadSuccess: function(id, data){
			var status= data.status;
			var filename_ = data.filename;
			if(status == 200){
				console.log(filename_);
				$('.bannerimage').attr('src',APP_BASE_URL+'uploads/'+filename_);
				$('#banner_image').val(filename_);
				myApp.closeModal('.popup-banner');
				//$("#myFile").val('');
			}else{
				//myApp.closeModal('.popup-cities');
                //alert(data.message);
				myApp.addNotification({message:data.message,hold: 1500});
			}
		  $.danidemo.addLog('#demo-debug', 'success', 'Upload of file #' + id + ' completed');

          $.danidemo.addLog('#demo-debug', 'info', 'Server Response for file #' + id + ': ' + JSON.stringify(data));

          $.danidemo.updateFileStatus(id, 'success', 'Upload Complete');

          $.danidemo.updateFileProgress(id, '100%');
			$('.demo-panel-files').empty();
			var content = '<span class="demo-note">No Files have been selected/droped yet...</span>';
			$('.demo-panel-files').html(content);
        },
        onUploadError: function(id, message){
			alert(message);
          $.danidemo.updateFileStatus(id, 'error', message);

          $.danidemo.addLog('#demo-debug', 'error', 'Failed to Upload file #' + id + ': ' + message);
        },
        onFileTypeError: function(file){
			alert('File \'' + file.name + '\' cannot be added: must be an image');
			$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: must be an image');
        },
        onFileSizeError: function(file){
			alert('File \'' + file.name + '\' cannot be added: size excess limit');
			$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: size excess limit');
        },
        /*onFileExtError: function(file){
          $.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' has a Not Allowed Extension');
        },*/
        onFallbackMode: function(message){
			alert('info', 'Browser not supported(do something else here!): ' + message);
          $.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);
        },
		onFilesMaxError: function(file){
			alert(' cannot be added to queue due to upload limits.');
		  $.danidemo.addLog(file.name + ' cannot be added to queue due to upload limits.');
		}
      });
	
	
	
	$('body').on('click', '.page[data-page=vendor_edit_combo_goods] .bannerimage', function (){
			myApp.popup('.popup-banner');
			
		});
		
		
	  	var como_arrary=[];
		
		
	var data = {
		combo_id:combo_id_goods_edit,
		user_id : user_detail.user_id,
			}
			$.post(API_URL+'vendor_combo/get_combo_goods_by_id', data)
			.success(function (data, status) {
				if(data.status == 200){
					var cdata = data.data[0];
			
				
						como_arrary=cdata.goods_id_combo;
					$('#combo_id').val(cdata.combo_id);			
					$('#name_combo').val(cdata.name_combo);			
					$('#total_price').val(cdata.total_price);			
					$('#combo_discount_price').val(cdata.combo_discount_price);			
					$('#combo_price').val(cdata.combo_price);			
					$('.bannerimage').attr('src',APP_BASE_URL+'uploads/'+cdata.combo_image);
					$('#banner_image').val(cdata.combo_image);
				}
				
			})
			.error(function (data, status) {
			});
				
		
		
		
	var data = {
			
			user_id:user_detail.user_id,
		}
	$.post(API_URL+'Vendor_combo/vendor_all_goods_list',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					var	goodsdata =data.data;
					var content = '';
					
						 content += ' <div class="tt">';
									
										 content += ' <div class="content-block" style="margin: 0px; padding: 0px;">';
										 content += '<div class="row" style="font-size: 16px;padding: 12px 10px; background-color: #009688!important; color: #fff;" >';
												content += '<div class="col-10">';
																
														content += '</label></div><div class="col-50"><span>Product Name</span></div>';	
												content += '<div class="col-40" style="text-align: center;"><span>Qyt : Price(<i class="fa fa-inr fa-indian-rupee"></i>)</span>';	
												content += '</div>';	
												content += '</div>';
												$(goodsdata).each(function(key1,value1){
														content += '<div class="item-content" style="border-bottom: 1px solid #eee;padding: 5px 0px 5px 5px;">';
															content += '<div class="row good_input_checkbox" style="width: 100%;">';
																		content += '<div class="col-10 " style="padding: 10px;">';
																		
																			content += '<label class="label-checkbox item-content ">';
																					content += '<input  type="checkbox" class="checkbox_combo1" id="checkbox_combo1" name="checkbox_combo1" name_combo="'+value1['sub_category_name']+' '+value1['type_value']+''+value1['type_name']+'" price="'+value1['goods_price']+'" value="'+value1['goods_id']+'" />';
																				
																			
																			content += '<span class="item-media">';
																			content += '<i class="icon icon-form-checkbox"></i>';
																			content += '</span>';
																		content += '</label>';
																		
																		content += '</div>';
																		content += '<div class="col-50">';
																			content += '<img class=" " style="    float: left;width:50px;height: 50px;" src="'+APP_BASE_URL+'uploads/'+value1['goods_image']+'"  />';
																			
																			//content += '<span style="padding-left: 10px; margin-top: 5px; ">'+ value1['category_name'] +'</span>';
																		content += '<span style="padding-left: 10px; margin-top: 5px;">	'+ value1['sub_category_name'] +'</span></br>';
																		content += '</div>';
																		content += '<div class="col-40 ">';
																		
																	
																		content += '<span style="padding-left: 10px; margin-top: 5px; ">'+ value1['type_value'] +' '+ value1['type_name'] +' : <i class="fa fa-inr fa-indian-rupee"></i>'+ value1['goods_price'] +' </span>';
																		
														
																		content += '</div>';
																content += '</div>';
															content += '</div>';
													});
												
							content += '</div>';
												
					$('#vendoreditcombohtml1').empty();
					$('#vendoreditcombohtml1').append(content);
					
						
					$$('.page[data-page=vendor_edit_combo_goods] .checkbox_combo1').on('change', function() {
					
						 como_arrary=[];
						
						var mytbTHis = $(this);
						var mytb = $(this).closest('.tt');
						
						var total_price=0;
						var name_combo='';
						$(mytb).find('.good_input_checkbox').each(function () {
							var checked =$(this).find('.checkbox_combo1').is(':checked');
							
							if(checked){
								$(this).find('.checkbox_combo1').prop("checked", true);
								var goods_id=$(this).find('.checkbox_combo1').val();
								var goods_price=$(this).find('.checkbox_combo1').attr('price');
								var n_combo=$(this).find('.checkbox_combo1').attr('name_combo');
								como_arrary.push(goods_id);
								if(name_combo ==''){
									name_combo =(n_combo);
								}else{
									name_combo =(name_combo) +' + '+ (n_combo);
								}
								total_price =parseInt(total_price)+parseInt(goods_price);
								$('#total_price').val(total_price);
								$('#name_combo').val(name_combo);
							}else{
								$(this).find('.checkbox_combo1').prop("checked", false);
							}
						
						var dis_price =$('#combo_discount_price').val();
						if(dis_price >0){
							var goods_price= $('#total_price').val();
							var temp =goods_price*dis_price;
							var new_temp=(temp/100);
							var reduce_p= goods_price - new_temp.toFixed(2);
							$('#combo_price').val(reduce_p);
						}
						});
						
						
					});
					
					$$('.page[data-page=vendor_edit_combo_goods] .combo_discount_price').on('change', function() {
									
						var dis_price= $(this).val();
						var goods_price= $('#total_price').val();
						var temp =goods_price*dis_price;
						var new_temp=(temp/100);
						var reduce_p= goods_price - new_temp.toFixed(2);
						$('#combo_price').val(reduce_p);
					});
					setTimeout(function() {
						$('.tt').find('.good_input_checkbox').each(function () {
							
									var goods_id=$(this).find('.checkbox_combo1').val();
										var yyy=$(this);							
								$(como_arrary).each(function(key,value){
									console.log(goods_id+'=='+value);
									
										if(goods_id==value){
										$(yyy).find('.checkbox_combo1').prop('checked', true );										
														
												
										}
									});					
						});	
						}, 1000);
					
				}
			})
		.error(function (data, status) {
		});
						
			
		
			
$('.page[data-page=vendor_edit_combo_goods] form[name=combo]').validate({
	ignore: [],
	rules: {
			name_combo: {
                required: true,
            },
			total_price: {
                required: true,
            },
			combo_discount_price: {
                required: true,
            },
			combo_price: {
                required: true,
            },
		
			banner_image: {
                required: true,
            },
		
			
		},
        messages: {
			
			name_combo: {
                required: "Check above goods is required",
            },
			total_price: {
                required: "Select category is required",
            },
			combo_discount_price: {
                required: "combo discount is required",
            },
			combo_price: {
                required: "combo price is required",
            },
			banner_image: {
                required: "Image is required",
            },
			
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
	submitHandler: function(form) {
			
            var name_combo = $('#name_combo').val();
			console.log(name_combo);
            var total_price = $('#total_price').val();
            var combo_discount_price = $('#combo_discount_price').val();
            var combo_price = $('#combo_price').val();
            var combo_image = $('#banner_image').val();
         
           var combo_id=$('#combo_id').val();
		   myApp.showIndicator();
				var data1 = {
						como_arrary:como_arrary,
						combo_id:combo_id,
						name_combo:name_combo,
						total_price:total_price,
						combo_discount_price:combo_discount_price,
						combo_price:combo_price,
						combo_image:combo_image,
						
						user_id:user_detail.user_id,
					}
					$.post(API_URL+'vendor_combo/update_combo_goods', data1)
					.success(function (data, status) {
						myApp.hideIndicator();
						if(data.status == 200){
							
							
							myApp.addNotification({message:"Combo goods updated successfully",hold: 3000});
						//	mainView.router.load({url: 'vendor_combo_list.html'});
							redirect_page_name='vendor_combo_list.html';
							mainView.router.load({url: 'redirect_page.html'});
												
						}else{
							myApp.addNotification({message:data.message,hold: 1500});
							
							return false;
						}
					})
					.error(function (data, status) {
					});
         
	}
	});	
				
	
	
	
});








myApp.onPageInit('all_offer', function(page) {
		var content ='';		
var limit = 4;
var start_range = 0;
var lastIndex = 100;
	  
	var data = {
			user_id:user_detail.user_id,
			limit:limit,
			start_range:start_range,
		}
	$.post(API_URL+'vendor_combo/get_list_of_all_combo_goods_for_user_veiw',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					
					var	combodata =data.data;
							content += '<div class="item-content" style="border-bottom: 2px solid #eee; padding-left: 0px;">';
							content += '<div class="row" style="width: 100%;">';
										content += '<div class="col-80">';
											content += '<span >Combo Offer </span>';
										content += '</div>';
										
								content += '</div>';
							content += '</div>';
							
								$(combodata).each(function(key,value){
								
									content += '<div class="item-content" style="border-bottom: 1px solid #eee;padding: 5px 0px 5px 0px;">';
									content += '<div class="row" style="width: 100%;">';
									content += '<div class="col-20">';
									content += '<span style=" margin-top: 5px;"><i style="position: relative;"><span style="position: absolute; background-color: red; width: 30px; height: 22px; font-size: 12px; border-radius: 40%; padding-top: 8px; top: -48px; left: -15px; color: #fff;">'+ value['combo_discount_price'] +'% </span><img style="width: 50px;height: 50px;" src="'+APP_BASE_URL+'uploads/'+value['combo_image']+'" width="100%" /> </i></span>';
									content += '</div>';
									content += '<div class="col-60">';
									content += '<span style=" margin-top: 5px;"><i>'+ value['name_combo'] +'</i></span>';
									content += '</br><span style="margin-top: 5px;font-size: 12px;">Offer Price: <i class="fa fa-inr fa-indian-rupee"></i>'+ value['combo_price'] +',<br/> Discount: '+ value['combo_discount_price'] +'(%) ,<br/> Actual Price: <i class="fa fa-inr fa-indian-rupee"></i>'+ value['total_price'] +' </span>';
									content += '</div>';
									content += '<div class="col-20">';	
									content += '<a href="#" style="padding-left: 10px;background: #d06f6f;" class="comboaddcart button button-fill button-raised" combo_id="'+ value['combo_id'] +'" >Add</a>';
									content += '</div>';
									content += '</div>';
									content += '</div>';
									
								});
						
						start_range = start_range + limit; 							
					$('#combo_listhtml').empty();
					$('#combo_listhtml').append(content);
					if(combodata.length < 4){
						$$('.page[data-page=all_offer] .infinite-scroll-preloader').remove();
					}
				
					$$('.page[data-page=all_offer] .comboaddcart').on('click', function() {
						  var combo_id= jQuery(this).attr('combo_id');
						  	myApp.popup('.popup-filter-events');
							$('.goods_id').val(combo_id);
						
					});	
					
				}else{
					
					content += '<div class="item-content live-search-list" >';
								content += '<div class="row" style="padding: 20px 10px;">';
									content += '<div class="col-100 " style="padding: 0px 40px;background-color: #f8d7da;border-color: #f5c6cb;">';
									content += '<h3 style="text-align:center;color:#721c24;">you dont have Combo Goods.</h3>';
									content += '</div>';
								content += '</div>';
						content += '</div>';
													
					$('#combo_listhtml').empty();
					$('#combo_listhtml').append(content);
					$$('.page[data-page=all_offer] .infinite-scroll-preloader').remove();
				}
			})
		.error(function (data, status) {
		});
							
			
	var dateToday = new Date();
	
	var dateLater = new Date().setDate(dateToday.getDate() - 500);
	var datetodat = new Date().setDate(dateToday.getDate() - 1);
	var calendarBasic = myApp.calendar({
		disabled: {
		  from: dateLater,
		  to: datetodat
		},
		input: '.page[data-page=all_offer] #delivery_start_date'
	});
	

		
	$('.page[data-page=all_offer] form[name=user_place_order_once]').validate({
		rules: {
			delivery_start_date: {
                required: true,
            },
			delivery_start_timing: {
                required: true,
				
            },
			delivery_end_timing: {
                required: true,
				
            },
		},
        messages: {
			delivery_start_date: {
                required: "Delivery date is required",
            },
			delivery_start_timing: {
                required: "Delivery Start Time is required",
				
            },
			delivery_end_timing: {
                required: "Delivery End Time is required",
				
            },
		},
		onkeyup: false,
		errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			
            var delivery_start_date = $('#delivery_start_date').val();
            var delivery_start_timing = $('#delivery_start_timing').val();
            var delivery_end_timing = $('#delivery_end_timing').val();
            var goods_id = $('#goods_id').val();
            var goods_qty = $('#goods_qty').val();
           
			var subscription_type = 'onetime';
			var subscription_day = '1';
			
			
			if(parseInt(delivery_start_timing) < parseInt(delivery_end_timing)){
			
			}else{
				myApp.addNotification({message:'select correct delivery time',hold: 3000});
				return false;
			}
			
			myApp.showIndicator();
			var subscription_data ={
				delivery_start_timing: delivery_start_timing,
				delivery_end_timing: delivery_end_timing,
				delivery_start_date: delivery_start_date,
				delivery_end_date: delivery_start_date,
				sub_category_id: sub_category_id_chek_by_user,
				subscription_type: subscription_type,
				subscription_day: subscription_day,
				goods_id: goods_id,
			}
			
			var data = {
				goods_id:goods_id,	
			}
			$.post(API_URL+'vendor_combo/get_combo_goods_by_id_to_addcart', data)
				.success(function (data, status) {
					myApp.hideIndicator();
					if(data.status == 200){
						var cart = data.data;
						console.log(cart);
						var data1 ={
							goods_discount:cart[0]['combo_discount_price'],
							goods_after_discount_price:cart[0]['combo_price'],
							goods_id:cart[0]['combo_id'],
							goods_price:cart[0]['total_price'],
							goods_image:cart[0]['combo_image'],
							type_value:'',
							type_name:'combo',
							category_id:0,
							category_name:0,
							sub_cat_name:cart[0]['name_combo'],
							sub_cat_id:0,
							
							
							vendor_id:cart[0]['vendor_id'],
							vendor_name:cart[0]['vendor_name'],
							
							
							goods_qty:goods_qty,
							subscription_data:subscription_data,
						}
							cart_data.push(data1);
							localStorage.setItem("lmapp_cart_store", JSON.stringify(cart_data));
								$('#delivery_start_date').val('');
								$('#delivery_end_date').val('');
								console.log(cart_data);
				
								myApp.closeModal('.popup-filter-events'); 
								myApp.modal({
									title: 'Goods added to cart successfully',
									text: '',
									buttons: [
										{
											text: '<div class="chip color-red"><div class="chip-label" style="text-transform: initial;">Shop more</div></div>',
											onClick: function() {
												mainView.router.load({url: 'subscription.html'});
											}
										},
										{
											text: '<div class="chip color-cyan"><div class="chip-label" style="text-transform: initial;">Checkout</div></div>',
											onClick: function() {
												mainView.router.load({url: 'cart.html'});
											}
										}
									]
								});	
							}else{
							
							}
						})
						.error(function (data, status) {
						});
					
					
		}
	});
			
	
	function get_ALL_OFEER_list(){
		
		var data ={
			 user_id:user_detail.user_id,
			 limit:limit,
			 start_range:start_range,
		}
		$.post(API_URL+'vendor_combo/get_list_of_all_combo_goods_for_user_veiw',data)
				.success(function (data, status) {
					if(data.status == 200){
							var	combodata =data.data;
					
					
						
							
								$(combodata).each(function(key,value){
								
									content += '<div class="item-content" style="border-bottom: 1px solid #eee;padding: 5px 0px 5px 0px;">';
									content += '<div class="row" style="width: 100%;">';
									content += '<div class="col-20">';
									content += '<span style=" margin-top: 5px;"><i><img style="width: 50px;height: 50px;" src="'+APP_BASE_URL+'uploads/'+value['combo_image']+'" width="100%" /> </i></span>';
									content += '</div>';
									content += '<div class="col-60">';
									content += '<span style=" margin-top: 5px;"><i>'+ value['name_combo'] +'</i></span>';
									content += '</br><span style="margin-top: 5px;font-size: 12px;">Offer Price: <i class="fa fa-inr fa-indian-rupee"></i>'+ value['combo_price'] +',<br/> Discount: '+ value['combo_discount_price'] +'(%) ,<br/> Actual Price: <i class="fa fa-inr fa-indian-rupee"></i>'+ value['total_price'] +' </span>';
									content += '</div>';
									content += '<div class="col-20">';	
									content += '<a href="#" style="padding-left: 10px;background: #d06f6f;" class="comboaddcart button button-fill button-raised" combo_id="'+ value['combo_id'] +'" >Add</a>';
									content += '</div>';
									content += '</div>';
									content += '</div>';
									
								});
						
												
					$('#combo_listhtml').empty();
					$('#combo_listhtml').append(content);
					start_range = start_range + limit; 	
				
					$$('.page[data-page=all_offer] .comboaddcart').on('click', function() {
						  var combo_id= jQuery(this).attr('combo_id');
						  	myApp.popup('.popup-filter-events');
							$('.goods_id').val(combo_id);
						
					});	
					
						
					}else{
						$$('.page[data-page=all_offer] .infinite-scroll-preloader').remove();
					}
				})
				.error(function (data, status) {
				});
	
	
		
	}	
	
				/* Loading Flag */
	var loading = false;
	/* Attach 'infinite scroll' Event Handler */
	$$('.page[data-page=all_offer] .infinite-scroll').on('infinite', function() {

		/* Exit, If Loading in Progress */
		if (loading) return;

		/* Set Loading Flag */
		loading = true;

		/* Emulate 1s Loading */
		setTimeout(function() {
			/* Reset Loading Flag */
			loading = false;

			if (start_range >= lastIndex) {
				/* Nothing more to load, detach infinite scroll events to prevent unnecessary loadings */
				myApp.detachInfiniteScroll($$('.page[data-page=all_offer] .infinite-scroll'));
				/* Remove Preloader */
				$$('.page[data-page=all_offer] .infinite-scroll-preloader').remove();
				return;
			}
			get_ALL_OFEER_list();
			
		}, 1000);
	});   
	
	
});










myApp.onPageInit('all_free_goodsoffer', function(page) {
	var content ='';		
var limit = 6;
var start_range = 0;
var lastIndex = 100;
	  
	var data = {
		user_id:user_detail.user_id,
			limit:limit,
			 start_range:start_range,
		}
	$.post(API_URL+'vendor_combo/get_all_list_offer',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					var	combodata =data.data;
					
					
							content += '<div class="item-content" style="border-bottom: 2px solid #eee; padding-left: 0px;">';
							content += '<div class="row" style="width: 100%;">';
										content += '<div class="col-80">';
											content += '<span >Free goods Offer </span>';
										content += '</div>';
										
								content += '</div>';
							content += '</div>';
							
								$(combodata).each(function(key,value){
								
									content += '<div class="swiper-slide"  offer_id="'+value['offer_id']+'"  style="background-image: url(assets/custom/img/banner_logo.jpg);margin-bottom: 10px;background-repeat: no-repeat; background-size: 100% 100%;" >';
										content += '<div class="slide-content" style="color:white;">';
											content += '<div class="slide-title">Purchase  <i class="fa fa-inr fa-indian-rupee"></i>  '+value['offer_valid_amount']+'  on </div>';
											content += '<div class="slide-text">'+value['sub_category_name']+' '+value['free_quantity']+'  free </div>';
											content += '<div class="slide-text">vendor by : '+value['vendor_name']+'  </div>';
										content += '</div>';
									content += '</div>';
									
								});
						
					start_range = start_range + limit; 							
					$('#free_goods_listhtml').empty();
					$('#free_goods_listhtml').append(content);
					
					if(combodata.length < 6){
						$('.infinite-scroll-preloader').remove();
					}
				
					
				}else{
					
					content += '<div class="item-content live-search-list" >';
								content += '<div class="row" style="padding: 20px 10px;">';
									content += '<div class="col-100 " style="padding: 0px 40px;background-color: #f8d7da;border-color: #f5c6cb;">';
									content += '<h3 style="text-align:center;color:#721c24;">you dont have Free  Goods.</h3>';
									content += '</div>';
								content += '</div>';
						content += '</div>';
													
					$('#free_goods_listhtml').empty();
					$('#free_goods_listhtml').append(content);
					$$('.page[data-page=all_free_goodsoffer] .infinite-scroll-preloader').remove();
				}
			})
		.error(function (data, status) {
		});
	
	function get_user_FREEOFFER_list(){
		
		var data ={
			 user_id:user_detail.user_id,
			 limit:limit,
			 start_range:start_range,
		}
		$.post(API_URL+'vendor_combo/get_all_list_offer',data)
				.success(function (data, status) {
					if(data.status == 200){
						var	combodata = data.data;
					
							$(combodata).each(function(key,value){
								
									content += '<div class="swiper-slide"  offer_id="'+value['offer_id']+'"  style="background-image: url(assets/custom/img/banner_logo.jpg);margin-bottom: 10px;background-repeat: no-repeat; background-size: 100% 100%;" >';
										content += '<div class="slide-content" style="color:white;">';
											content += '<div class="slide-title">Purchase  <i class="fa fa-inr fa-indian-rupee"></i>  '+value['offer_valid_amount']+'  on </div>';
											content += '<div class="slide-text">'+value['sub_category_name']+' '+value['free_quantity']+'  free </div>';
											content += '<div class="slide-text">vendor by : '+value['vendor_name']+'  </div>';
										content += '</div>';
									content += '</div>';
									
								});
						
					start_range = start_range + limit; 							
					$('#free_goods_listhtml').empty();
					$('#free_goods_listhtml').append(content);
					
				
						
						
					}else{
						$$('.page[data-page=all_free_goodsoffer] .infinite-scroll-preloader').remove();
					}
				})
				.error(function (data, status) {
				});
	
	
		
	}					
			

			/* Loading Flag */
	var loading = false;
	/* Attach 'infinite scroll' Event Handler */
	$$('.page[data-page=all_free_goodsoffer] .infinite-scroll').on('infinite', function() {

		/* Exit, If Loading in Progress */
		if (loading) return;

		/* Set Loading Flag */
		loading = true;

		/* Emulate 1s Loading */
		setTimeout(function() {
			/* Reset Loading Flag */
			loading = false;

			if (start_range >= lastIndex) {
				/* Nothing more to load, detach infinite scroll events to prevent unnecessary loadings */
				myApp.detachInfiniteScroll($$('.page[data-page=all_free_goodsoffer] .infinite-scroll'));
				/* Remove Preloader */
				$$('.page[data-page=all_free_goodsoffer] .infinite-scroll-preloader').remove();
				return;
			}
			get_user_FREEOFFER_list();
			
		}, 1000);
	});       		
	
	
	
});






myApp.onPageInit('all_coupon_offer', function(page) {
	var content ='';		
var limit = 6;
var start_range = 0;
var lastIndex = 100;
	  
	var data = {
		user_id:user_detail.user_id,
			limit:limit,
			 start_range:start_range,
		}
	$.post(API_URL+'vendor_combo/get_all_vendor_coupons',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					var	combodata =data.data;
					
					
							content += '<div class="item-content" style="border-bottom: 2px solid #eee; padding-left: 0px;">';
							content += '<div class="row" style="width: 100%;">';
										content += '<div class="col-80">';
											content += '<span >Coupon Offer </span>';
										content += '</div>';
										
								content += '</div>';
							content += '</div>';
							
								$(combodata).each(function(key,value){
								
									content += '<div class="swiper-slide"  coupon_id="'+value['coupon_id']+'"  style="background-image: url(assets/custom/img/banner_logo.jpg);margin-bottom: 10px;background-repeat: no-repeat; background-size: 100% 100%;" >';
										content += '<div class="slide-content" style="color:white;">';
											content += '<div class="slide-title">Coupons <span style="color:#ff9800;">'+value['coupons_name']+'</span>  on discount  </div>';
											content += '<div class="slide-title">Coupons '+value['coupons_discount']+'%  </div>';
										
											content += '<div class="slide-text">vendor by : '+value['vendor_name']+'  </div>';
										content += '</div>';
									content += '</div>';
									
								});
						
					start_range = start_range + limit; 							
					$('#coupan_listhtml').empty();
					$('#coupan_listhtml').append(content);
					
					if(combodata.length < 6){
						$('.infinite-scroll-preloader').remove();
					}
				
					
				}else{
					
					content += '<div class="item-content live-search-list" >';
								content += '<div class="row" style="padding: 20px 10px;">';
									content += '<div class="col-100 " style="padding: 0px 40px;background-color: #f8d7da;border-color: #f5c6cb;">';
									content += '<h3 style="text-align:center;color:#721c24;">you dont have Coupon.</h3>';
									content += '</div>';
								content += '</div>';
						content += '</div>';
													
					$('#coupan_listhtml').empty();
					$('#coupan_listhtml').append(content);
					$$('.page[data-page=all_coupon_offer] .infinite-scroll-preloader').remove();
				}
			})
		.error(function (data, status) {
		});
	
	function get_coupan_list(){
		
		var data ={
			 user_id:user_detail.user_id,
			 limit:limit,
			 start_range:start_range,
		}
		$.post(API_URL+'vendor_combo/get_all_vendor_coupons',data)
				.success(function (data, status) {
					if(data.status == 200){
						var	combodata = data.data;
					
							$(combodata).each(function(key,value){
								
									content += '<div class="swiper-slide"  coupon_id="'+value['coupon_id']+'"  style="background-image: url(assets/custom/img/banner_logo.jpg);margin-bottom: 10px;background-repeat: no-repeat; background-size: 100% 100%;" >';
										content += '<div class="slide-content" style="color:white;">';
											content += '<div class="slide-title">Coupons '+value['coupons_name']+'  on discount  </div>';
											content += '<div class="slide-title">Coupons '+value['coupons_discount']+'%  </div>';
										
											content += '<div class="slide-text">vendor by : '+value['vendor_name']+'  </div>';
										content += '</div>';
									content += '</div>';
									
								});
						
					start_range = start_range + limit; 							
					$('#coupan_listhtml').empty();
					$('#coupan_listhtml').append(content);
					
				
						
						
					}else{
						$$('.page[data-page=all_coupon_offer] .infinite-scroll-preloader').remove();
					}
				})
				.error(function (data, status) {
				});
	
	}					
			

			/* Loading Flag */
	var loading = false;
	/* Attach 'infinite scroll' Event Handler */
	$$('.page[data-page=all_coupon_offer] .infinite-scroll').on('infinite', function() {

		/* Exit, If Loading in Progress */
		if (loading) return;

		/* Set Loading Flag */
		loading = true;

		/* Emulate 1s Loading */
		setTimeout(function() {
			/* Reset Loading Flag */
			loading = false;

			if (start_range >= lastIndex) {
				/* Nothing more to load, detach infinite scroll events to prevent unnecessary loadings */
				myApp.detachInfiniteScroll($$('.page[data-page=all_coupon_offer] .infinite-scroll'));
				/* Remove Preloader */
				$$('.page[data-page=all_coupon_offer] .infinite-scroll-preloader').remove();
				return;
			}
			get_coupan_list();
			
		}, 1000);
	});       		
	
	
	
});






myApp.onPageInit('all_flat_offer', function(page) {
	var content ='';		
var limit = 6;
var start_range = 0;
var lastIndex = 100;
	  
	var data = {
			user_id:user_detail.user_id,
			limit:limit,
			 start_range:start_range,
		}
	$.post(API_URL+'vendor_combo/get_list_of_flat',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					var	combodata =data.data;
					
					
							content += '<div class="item-content" style="border-bottom: 2px solid #eee; padding-left: 0px;">';
							content += '<div class="row" style="width: 100%;">';
										content += '<div class="col-80">';
											content += '<span >Flat Offer </span>';
										content += '</div>';
										
								content += '</div>';
							content += '</div>';
							
								$(combodata).each(function(key,value){
								
									content += '<div class="swiper-slide gotoflat"  vendor_id="'+value['vendor_id']+'"  style="background-image: url(assets/custom/img/banner_logo.jpg);margin-bottom: 10px;background-repeat: no-repeat; background-size: 100% 100%;" >';
										content += '<div class="slide-content">';
											content += '<div class="slide-title">Flat discount on all goods   '+value['flat_discount']+' % </div>';
											
										
											content += '<div class="slide-text">vendor by : '+value['vendor_name']+'  </div>';
										content += '</div>';
									content += '</div>';
									
								});
						
					start_range = start_range + limit; 							
					$('#flat_listhtml').empty();
					$('#flat_listhtml').append(content);
					
					if(combodata.length < 6){
						$('.infinite-scroll-preloader').remove();
					}
					$$('.page[data-page=all_flat_offer] .gotoflat').on('click', function(e) {
									customer_plan_check	='onetime';
									category_veiw_vendor_info = $(this).attr('vendor_id');
									
									
										mainView.router.load({url: 'category.html'});		
						});
					
				}else{
					
					content += '<div class="item-content live-search-list" >';
								content += '<div class="row" style="padding: 20px 10px;">';
									content += '<div class="col-100 " style="padding: 0px 40px;background-color: #f8d7da;border-color: #f5c6cb;">';
									content += '<h3 style="text-align:center;color:#721c24;">No Flat discount availble</h3>';
									content += '</div>';
								content += '</div>';
						content += '</div>';
													
					$('#flat_listhtml').empty();
					$('#flat_listhtml').append(content);
					$$('.page[data-page=all_flat_offer] .infinite-scroll-preloader').remove();
				}
			})
		.error(function (data, status) {
		});
	
	function get_flat_list(){
		
		var data ={
			 user_id:user_detail.user_id,
			 limit:limit,
			 start_range:start_range,
		}
		$.post(API_URL+'vendor_combo/get_list_of_flat',data)
				.success(function (data, status) {
					if(data.status == 200){
						var	combodata = data.data;
					
							$(combodata).each(function(key,value){
								
									content += '<div class="swiper-slide gotoflat"  vendor_id="'+value['vendor_id']+'"  style="background-image: url(assets/custom/img/banner_logo.jpg);margin-bottom: 10px;background-repeat: no-repeat; background-size: 100% 100%;" >';
										content += '<div class="slide-content">';
											content += '<div class="slide-title">Flat discount on all goods   '+value['flat_discount']+' % </div>';
											
										
											content += '<div class="slide-text">vendor by : '+value['vendor_name']+'  </div>';
										content += '</div>';
									content += '</div>';
									
								});
						
					start_range = start_range + limit; 							
					$('#flat_listhtml').empty();
					$('#flat_listhtml').append(content);
					$$('.page[data-page=all_flat_offer] .gotoflat').on('click', function(e) {
									customer_plan_check	='onetime';
									category_veiw_vendor_info = $(this).attr('vendor_id');
									
										mainView.router.load({url: 'category.html'});		
						});
				
						
						
					}else{
						$$('.page[data-page=all_flat_offer] .infinite-scroll-preloader').remove();
					}
				})
				.error(function (data, status) {
				});
	
	}					
			

			/* Loading Flag */
	var loading = false;
	/* Attach 'infinite scroll' Event Handler */
	$$('.page[data-page=all_flat_offer] .infinite-scroll').on('infinite', function() {

		/* Exit, If Loading in Progress */
		if (loading) return;

		/* Set Loading Flag */
		loading = true;

		/* Emulate 1s Loading */
		setTimeout(function() {
			/* Reset Loading Flag */
			loading = false;

			if (start_range >= lastIndex) {
				/* Nothing more to load, detach infinite scroll events to prevent unnecessary loadings */
				myApp.detachInfiniteScroll($$('.page[data-page=all_flat_offer] .infinite-scroll'));
				/* Remove Preloader */
				$$('.page[data-page=all_flat_offer] .infinite-scroll-preloader').remove();
				return;
			}
			get_flat_list();
			
		}, 1000);
	});       		
	
	
	
});








myApp.onPageInit('all_discount_offer', function(page) {
	var content ='';		
var limit = 10;
var start_range = 0;
var lastIndex = 100;
	  
	var data = {
			user_id:user_detail.user_id,
			limit:limit,
			 start_range:start_range,
		}
	$.post(API_URL+'vendor_combo/get_list_of_discount',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					var	banner_data = data.data;
					
					
							content += '<div class="item-content" style="border-bottom: 2px solid #eee; padding-left: 0px;">';
							content += '<div class="row" style="width: 100%;">';
										content += '<div class="col-80">';
											content += '<span >Discount Offer </span>';
										content += '</div>';
										
								content += '</div>';
							content += '</div>';
						
					
						$(banner_data).each(function(key,value){
							if(value['banner_image']=='banner_logo.jpg'){
									content += '<div class="swiper-slide" vendor_id="'+value['vendor_id']+'" sub_cat_id="'+value['sub_cat_id']+'" sub_cat_nm="'+value['sub_cat_name']+'" cat_id="'+value['category_id']+'" cat_name="'+value['category_name']+'"  style="background-image: url(assets/custom/img/banner_logo.jpg);margin-bottom: 5px;background-repeat: no-repeat; background-size: 100% 100%;" >';
										content += '<div class="slide-content" style="color:white;">';
											content += '<div class="slide-title">'+value['discount']+'% discount on '+value['type_value'] +''+value['type_name'] +'</div>';
											content += '<div class="slide-text">'+value['sub_cat_name']+'</div>';
											content += '<div class="slide-text"> Vendor by : '+value['vendor_name']+'</div>';
										content += '</div>';
									content += '</div>';
			
							}else{
								content += '<div class="swiper-slide"  vendor_id="'+value['vendor_id']+'" sub_cat_id="'+value['sub_cat_id']+'" sub_cat_nm="'+value['sub_cat_name']+'" cat_id="'+value['category_id']+'" cat_name="'+value['category_name']+'" style="background-image: url('+APP_BASE_URL+'uploads/'+value['banner_image']+');margin-bottom: 5px;height: 100px;background-repeat: no-repeat; background-size: 100% 100%;" >';
									content += '<div class="slide-content">';
										content += '<div class="slide-title"></div>';
										content += '<div class="slide-text"></div>';
									content += '</div>';
								content += '</div>';
							}
						});
						
					start_range = start_range + limit; 							
					$('#dis_listhtml').empty();
					$('#dis_listhtml').append(content);
					
					if(banner_data.length < 10){
						$('.infinite-scroll-preloader').remove();
					}
				
						
						$$('.page[data-page=all_discount_offer] .swiper-slide').on('click', function() {
								category_veiw_vendor_info = $(this).attr('vendor_id');
							 category_id_chek_by_user = jQuery(this).attr('cat_id');
							 category_name_chek_by_user = jQuery(this).attr('cat_name');
							sub_category_id_chek_by_user = jQuery(this).attr('sub_cat_id');
							sub_category_name_chek_by_user = jQuery(this).attr('sub_cat_nm');
							console.log(category_veiw_vendor_info);
							console.log(category_id_chek_by_user);
							console.log(category_name_chek_by_user);
							console.log(sub_category_id_chek_by_user);
							console.log(sub_category_name_chek_by_user);
							mainView.router.load({url: 'view_goods.html'});
						});
					
				}else{
					
					content += '<div class="item-content live-search-list" >';
								content += '<div class="row" style="padding: 20px 10px;">';
									content += '<div class="col-100 " style="padding: 0px 40px;background-color: #f8d7da;border-color: #f5c6cb;">';
									content += '<h3 style="text-align:center;color:#721c24;">you dont have discount.</h3>';
									content += '</div>';
								content += '</div>';
						content += '</div>';
													
					$('#dis_listhtml').empty();
					$('#dis_listhtml').append(content);
					$$('.page[data-page=all_discount_offer] .infinite-scroll-preloader').remove();
				}
			})
		.error(function (data, status) {
		});
	
	function get_flat_list(){
		
		var data ={
			 user_id:user_detail.user_id,
			 limit:limit,
			 start_range:start_range,
		}
		$.post(API_URL+'vendor_combo/get_list_of_discount',data)
				.success(function (data, status) {
					if(data.status == 200){
						var	banner_data = data.data;
					
						$(banner_data).each(function(key,value){
							if(value['banner_image']=='banner_logo.jpg'){
									content += '<div class="swiper-slide" vendor_id="'+value['vendor_id']+'" sub_cat_id="'+value['sub_cat_id']+'" sub_cat_nm="'+value['sub_cat_name']+'" cat_id="'+value['category_id']+'" cat_name="'+value['category_name']+'"  style="background-image: url(assets/custom/img/banner_logo.jpg);margin-bottom: 5px;background-repeat: no-repeat; background-size: 100% 100%;" >';
										content += '<div class="slide-content" style="color:white;">';
											content += '<div class="slide-title">'+value['discount']+'% discount on '+value['type_value'] +''+value['type_name'] +'</div>';
											content += '<div class="slide-text">'+value['sub_cat_name']+'</div>';
											content += '<div class="slide-text"> Vendor by : '+value['vendor_name']+'</div>';
										content += '</div>';
									content += '</div>';
			
							}else{
								content += '<div class="swiper-slide"  vendor_id="'+value['vendor_id']+'" sub_cat_id="'+value['sub_cat_id']+'" sub_cat_nm="'+value['sub_cat_name']+'" cat_id="'+value['category_id']+'" cat_name="'+value['category_name']+'"  style="background-image: url('+APP_BASE_URL+'uploads/'+value['banner_image']+');margin-bottom: 5px;height: 100px;background-repeat: no-repeat; background-size: 100% 100%;" >';
									content += '<div class="slide-content">';
										content += '<div class="slide-title"></div>';
										content += '<div class="slide-text"></div>';
									content += '</div>';
								content += '</div>';
							}
						});
						
					start_range = start_range + limit; 							
					$('#dis_listhtml').empty();
					$('#dis_listhtml').append(content);
					$$('.page[data-page=all_discount_offer] .swiper-slide').on('click', function() {
								category_veiw_vendor_info = $(this).attr('vendor_id');
							 category_id_chek_by_user = jQuery(this).attr('cat_id');
							 category_name_chek_by_user = jQuery(this).attr('cat_name');
							sub_category_id_chek_by_user = jQuery(this).attr('sub_cat_id');
							sub_category_name_chek_by_user = jQuery(this).attr('sub_cat_nm');
							customer_plan_check='onetime';
							mainView.router.load({url: 'view_goods.html'});
						});
				
						
						
					}else{
						$$('.page[data-page=all_discount_offer] .infinite-scroll-preloader').remove();
					}
				})
				.error(function (data, status) {
				});
	
	}					
			

			/* Loading Flag */
	var loading = false;
	/* Attach 'infinite scroll' Event Handler */
	$$('.page[data-page=all_discount_offer] .infinite-scroll').on('infinite', function() {

		/* Exit, If Loading in Progress */
		if (loading) return;

		/* Set Loading Flag */
		loading = true;

		/* Emulate 1s Loading */
		setTimeout(function() {
			/* Reset Loading Flag */
			loading = false;

			if (start_range >= lastIndex) {
				/* Nothing more to load, detach infinite scroll events to prevent unnecessary loadings */
				myApp.detachInfiniteScroll($$('.page[data-page=all_discount_offer] .infinite-scroll'));
				/* Remove Preloader */
				$$('.page[data-page=all_discount_offer] .infinite-scroll-preloader').remove();
				return;
			}
			get_flat_list();
			
		}, 1000);
	});       		
	
	
	
});









myApp.onPageInit('user_mandi_point', function(page) {
	
	  
	var data = {
			user_id:user_detail.user_id,
			
		}
	$.post(API_URL+'vendor_delivered/get_user_transtion_10_list',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					var	mp_data = data.data;
					
					$('#avail_mandi_point').text(data.user_avilable_point);
					
					
						var content = '';
						$(mp_data).each(function(key,value){
							content += '<tr>';
								content += '<td class="label-cell" style="padding-left:20px;text-align:left;">'+value['description']+'</td>';
								content += '<td class="label-cell" style="width: 25%;text-align:left;">'+value['date']+'</td>';
								content += '<td class="numeric-cell">₹ '+value['deposit']+'</td>';
								content += '<td class="numeric-cell">₹ '+value['withdraw']+'</td>';
								
							content += '</tr>';
							
						});
						
											
					$('#transactions_data').empty();
					$('#transactions_data').append(content);
					if(mp_data.length == 10){
						$('.loadmoreusertransation').removeClass('display_none');
					}
					
					
					$$('.page[data-page=user_mandi_point] .loadmoreusertransation').on('click', function() {
						myApp.showIndicator();
						var data = {
									user_id:user_detail.user_id,
								}
							$.post(API_URL+'vendor_delivered/get_user_transtion_list',data)
								.success(function (data, status) {
									myApp.hideIndicator();
									if(data.status == 200){
										var content = '';
										var	mp_data = data.data;
										$(mp_data).each(function(key,value){
											content += '<tr>';
												content += '<td class="label-cell" style="padding-left:20px;text-align:left;">'+value['description']+'</td>';
												content += '<td class="label-cell">'+value['date']+'</td>';
												content += '<td class="numeric-cell">₹ '+value['deposit']+'</td>';
												content += '<td class="numeric-cell">₹ '+value['withdraw']+'</td>';
												
											content += '</tr>';
											
										});
									$('#transactions_data').empty();
									$('#transactions_data').append(content);
									$('.loadmoreusertransation').addClass('display_none');
									
									}else{
										$('.loadmoreusertransation').addClass('display_none');
									}
								})
					});
					
				}else{
					$$('.page[data-page=user_mandi_point] .data-table').empty();
				}
			})
		.error(function (data, status) {
		});
		
	
	
	$$('.page[data-page=user_mandi_point] .goForpaymentPageBtn').on('click', function() {
 		//myApp.closeModal('.popup-earn-credits');
		var price = $(this).attr('credit_amount');
		$$('.popup-pay-credits #add_amount').val(price);
		$$('.popup-pay-credits .goForpaymeeBtn').html('Proceed To Pay &nbsp;<i class="fa fa-inr fa-indian-rupee"></i>'+price);
	});
	
	$$('.popup-pay-credits #add_amount').on('keyup', function() {
 		
		var price = $(this).val();
		$$('.popup-pay-credits .goForpaymeeBtn').html('Proceed To Pay &nbsp;<i class="fa fa-inr fa-indian-rupee"></i>'+price);
	});
	
	/* Validate & Submit Form */
	$('.page[data-page=user_mandi_point] .popup-pay-credits form[name=valid_amount]').validate({
		rules: {
			add_amount: {
				required: true,
			},
		},
		messages: {
			add_amount: {
				required: 'Please enter amount.',
				},
		},
		onkeyup: false,
		errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
		
		var add_amount = $('#add_amount').val();
		$('#paymentWithoutUpi').attr('payment_token_p','');
		$('#paymentWithUpi').attr('payment_token_p','');
		$('#paymentWithUpi').attr('from_','add_point');
		$('#paymentWithUpi').attr('user_name_p',user_detail.full_name);
		$('#paymentWithUpi').attr('user_mobile_p',user_detail.user_moblie_number);
		$('#paymentWithUpi').attr('amount_p',parseFloat(add_amount*100));
		$('#paymentFinalStauts').attr('payment_type','paymentWithUpi');
		$('#paymentWithUpi').trigger('click');
		myApp.closeModal('.popup-pay-credits');
		}
	});

	
});







myApp.onPageInit('vendor_mandi_point', function(page) {
	var todayDate = new Date().toISOString().slice(0,10);
	  
	var data = {
			user_id:user_detail.user_id,
			
		}
	$.post(API_URL+'vendor_delivered/get_vendor_transtion_10_list',data)
		.success(function (data, status) {
			
				if(data.status == 200){
					var	mp_data = data.data;
					
					$('#vendor_points').text(data.vendor_points);
						content = '';
						$(mp_data).each(function(key,value){
							if(Date.parse(value['date_action']) >  Date.parse(todayDate)){
								content += '<tr style="background: #eee;">';
									content += '<td class="label-cell" style="padding-left:10px;">'+value['date_action']+'</td>';
									content += '<td class="label-cell" style="text-align:left;">'+value['description']+'</td>';
									content += '<td class="numeric-cell">₹ '+value['deposit']+'</td>';
									content += '<td class="numeric-cell">₹ '+value['withdraw']+'</td>';
									
								content += '</tr>';
							}else{
								content += '<tr>';
									content += '<td class="label-cell" style="padding-left:20px;">'+value['date_action']+'</td>';
									content += '<td class="label-cell" style="text-align:left;">'+value['description']+'</td>';
									content += '<td class="numeric-cell">₹ '+value['deposit']+'</td>';
									content += '<td class="numeric-cell">₹ '+value['withdraw']+'</td>';
									
								content += '</tr>';
							}
						});
						
											
					$('#vtransactions_data').empty();
					$('#vtransactions_data').append(content);
					
					if(mp_data.length == 10){
						$('.loadmoreverndortransation').removeClass('display_none');
					}
				
						
						
					
				}else{
					$$('.page[data-page=vendor_mandi_point] .data-table').empty();
				}
			})
		.error(function (data, status) {
		});
	
	$('body').on('click','.loadmoreverndortransation',function(e){
		if($(e.target).data('oneclicked')!='yes') {
			
			myApp.showIndicator();
			var data = {
				user_id:user_detail.user_id,
				
			}
		$.post(API_URL+'vendor_delivered/get_vendor_transtion_list',data)
			.success(function (data, status) {
				myApp.hideIndicator();
					if(data.status == 200){
						var	mp_data = data.data;
						
						
							content = '';
							$(mp_data).each(function(key,value){
								if(Date.parse(value['date_action']) >  Date.parse(todayDate)){
									content += '<tr style="background: #eee;">';
										content += '<td class="label-cell" style="padding-left:10px;">'+value['date_action']+'</td>';
										content += '<td class="label-cell" style="text-align:left;">'+value['description']+'</td>';
										content += '<td class="numeric-cell">₹ '+value['deposit']+'</td>';
										content += '<td class="numeric-cell">₹ '+value['withdraw']+'</td>';
										
									content += '</tr>';
								}else{
									content += '<tr >';
										content += '<td class="label-cell" style="padding-left:20px;">'+value['date_action']+'</td>';
										content += '<td class="label-cell" style="text-align:left;">'+value['description']+'</td>';
										content += '<td class="numeric-cell">₹ '+value['deposit']+'</td>';
										content += '<td class="numeric-cell">₹ '+value['withdraw']+'</td>';
										
									content += '</tr>';
								}
								
							});
							
												
						$('#vtransactions_data').empty();
						$('#vtransactions_data').append(content);
						$('.loadmoreverndortransation').addClass('display_none');
						
					}else{
						
					}
				})
			.error(function (data, status) {
			});
		}
		$(e.target).data('oneclicked','yes');
		setTimeout(function(){ 
			$(e.target).data('oneclicked','no');
		}, 500);
	});
	
	
	$$('.page[data-page=vendor_mandi_point] .withdraw_funds').on('click', function() {
		console.log('vendor_mandi_point');		
		myApp.showIndicator();
		var data = {
			user_id:user_detail.user_id
		}
		$.post(API_URL+'vendor_delivered/request_for_withdraw_funds',data)
			.success(function (data, status) {
				myApp.hideIndicator();
					if(data.status == 200){
						myApp.addNotification({
							message:data.message,
							hold: 1500
						});
						mainView.router.load({url: 'vendor_order_list.html'});
					}else{
						myApp.addNotification({
							message:data.message,
							hold: 1500
						});
					}
				})
			.error(function (data, status) {
			});
	});
});


myApp.onPageInit('vendor_withdraw_list', function(page) {
	var todayDate = new Date().toISOString().slice(0,10);
	  
	var data = {
		user_id:user_detail.user_id
	}
	$.post(API_URL+'vendor_delivered/get_vendor_withdraw_list',data)
		.success(function (data, status) {
			if(data.status == 200){
				var	mp_data = data.data;
				content = '';
				$(mp_data).each(function(key,value){
					content += '<tr>';
						content += '<td class="label-cell" style="padding-left:20px;">'+value['created_date']+'</td>';
						content += '<td class="label-cell" style="text-align:left;">₹ '+value['amount']+'</td>';
						content += '<td class="numeric-cell"> '+value['current_status']+'</td>';
					content += '</tr>';
				});					
				$('#vwithdraw_data').empty();
				$('#vwithdraw_data').append(content);
			}else{
				$$('.page[data-page=vendor_withdraw_list] .data-table').empty();
			}
		})
		.error(function (data, status) {
		});
});


myApp.onPageInit('refer_list', function(page) {

	$('.page[data-page=refer_list] form[name=refer_list]').validate({
		//console.log(API_URL);
		rules: {
			refer_code: {
				required: true,
     			},		
			},
    messages: {
			refer_code: {
				required: 'Please enter refer code.'
      			},
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
		var refer_code = $('#refer_code').val();
		console.log(refer_code);
		user_detail = JSON.parse(localStorage.getItem("lmapp_user_details"));
		myApp.showIndicator();
		var data ={
			user_id : user_detail.user_id,
			refer_code:refer_code,
		}
		
			
         $.post(API_URL+'users/insert_refer_code', data)
				.success(function (data, status) {
					 myApp.hideIndicator();
					console.log(data.message);
					if(data.status == 200){
						myApp.addNotification({
							message:data.message,
							hold: 1500
						});
						mainView.router.load({url: 'subscription.html'});
					}else{
						myApp.addNotification({
							message:data.message,
							hold: 1500
						});
						mainView.router.load({url: 'subscription.html'});
					}
				})
				.error(function (data, status) {
					//toastr.error(data.message, 'Error');
				});	
			
			
		}
	});

		$.post(API_URL+'users/fatch_refer_code_details', data)
			.success(function (data, status) {
				if(data.status == 200){
				var val = data.data[0];
					var counter_i = 0;
					var content = '';
					$(val).each(function(key,value){
						counter_i++;
						
						content += '<tr><th scope="row">'+counter_i+'</th><td>'+value['date']+' '+value['refer_type']+'</td><td>'+value['is_cashback']+'</td></tr>';
							
						});
						
							
				$('#refer_html').append(content);
					
				}
			})
			.error(function (data, status) {
			});
	
});






