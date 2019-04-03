'use strict';

/*
|------------------------------------------------------------------------------
| User Profile
|------------------------------------------------------------------------------
*/

myApp.onPageInit('user-profile', function(page) {
	
	if(user_detail.user_type == 'vendor'){
		$$('.page[data-page=user-profile] .tool_for_customer').remove();
	}else{
		$$('.page[data-page=user-profile] .tool_for_vendor').remove();
	}
	
//$('.user_photo').attr('src',APP_BASE_URL+'uploads/'+user_detail.user_img);	
//$('.Name_user').html(user_detail.full_name);	
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
				myApp.closeModal('.popup-cities');
				console.log(filename_);
				var data ={
						 User_id : user_detail['user_id'],
						 Upload_file_name : filename_
					 }
							$.post(API_URL+'users/update_profile_pic', data)
							.success(function (data, status) {
								console.log(data);
								console.log(data.message);
								if(data.status == 200){
								
								$('.user_photo').attr('src',APP_BASE_URL+'uploads/'+data.filename);	
								myApp.addNotification({message:data.message,hold: 1500});
								mainView.router.load({url: 'user-profile.html'});
								}else{
									myApp.addNotification({message:'please try again',hold: 1500});
								}
							})
							.error(function (data, status) {
							});	
				$("#myFile").val('');
			}else{
               myApp.closeModal('.popup-cities');
                alert(data.message);
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
	  
  var user_profile =[];	  
	var data = {
		user_id : user_detail.user_id,
	}
	$.post(API_URL+'users/fatch_profile', data)
				.success(function (data, status) {
					console.log(data.data);
					if(data.status == 200){
					user_profile = data.data[0];
					$('.Name_user').html(user_profile.first_name+' '+user_profile.last_name);
					$('.contact_no').html(user_profile.user_email);
					$('.user_photo').attr('src',APP_BASE_URL+'uploads/'+user_profile.user_img);
					}
				})
				.error(function (data, status) {
				});

});









myApp.onPageInit('Edit_profile', function(page) {
	
	if(user_detail.user_type == 'vendor'){
		$$('.page[data-page=Edit_profile] .tool_for_customer').remove();
	}else{
		$$('.page[data-page=Edit_profile] .tool_for_vendor').remove();
	}
	
var user_profile =[];	  
var calendarBasic = myApp.calendar({
    input: '.page[data-page=Edit_profile] #dob'
	});

	var data = {
		user_id : user_detail.user_id,
	}
	$.post(API_URL+'users/fatch_profile', data)
				.success(function (data, status) {
					console.log(data.data);
					if(data.status == 200){
					user_profile = data.data[0];
					$('.first_name').attr('value',user_profile.first_name);
					$('.last_name').attr('value',user_profile.last_name);
					$('.user_email').attr('value',user_profile.user_email);
					$('.user_photo').attr('src',APP_BASE_URL+'uploads/'+user_profile.user_img);
					}
				})
				.error(function (data, status) {
				});

$('.page[data-page=Edit_profile] form[name=profile_detail]').validate({
	rules: {
			first_name: {
                required: true,
				
            },
			last_name: {
                required: true,
				
            },
			 user_email: {
                required: true,
				
            },
        },
        messages: {
			first_name: {
                required: " First Name is required",
				
            },
			last_name: {
                required: " Last Name is required",
				
            },
			user_email: {
                required: "  Email is required",
				
            },
		},
		ignore: '',
		onkeyup: false,
		errorElement : 'div',
			errorPlacement: function(error, element) {
				error.appendTo(element.parent().siblings('.input-error'));
			},
		submitHandler: function(form) {
			
            var first_name = $('#first_name').val();
            var last_name = $('#last_name').val();
            var user_email = $('#user_email').val();
			myApp.showIndicator();
			var data ={
                
                first_name: first_name,
                last_name: last_name,
				user_id: user_detail.user_id,
                user_email: user_email,
			}
		$.post(API_URL+'users/update_profile', data)
				.success(function (data, status) {
					myApp.hideIndicator();
					if(data.status == 200){
						console.log(data.status);
						console.log(data.data);
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



myApp.onPageInit('bank_detail', function(page) {

	if(user_detail.user_type == 'vendor'){
		$$('.page[data-page=bank_detail] .tool_for_customer').remove();
	}else{
		$$('.page[data-page=bank_detail] .tool_for_vendor').remove();
	}

	console.log(user_detail);
	var data = {
		user_id : user_detail.user_id,
	}
	$.post(API_URL+'users/fatch_your_bank_details', data)
				.success(function (data, status) {
					if(data.status == 200){
					var val = data.data[0];
					if(val.account_status == 'active'){
						$('.pro_bank_detail').addClass('display_none');
						$('.pro_bank_detail_').removeClass('display_none');
					}else{
						$('.pro_bank_detail_').addClass('display_none');
						$('.pro_bank_detail').removeClass('display_none');
					}
					$('.user_email_').attr('value',val.user_email_);
					$('.business_name').attr('value',val.business_name);
					$('.business_type').attr('value',val.business_type);
					$('.account_type').attr('value',val.account_type);
					$('.acc_holder_name').attr('value',val.acc_holder_name);
					$('.bank_name').attr('value',val.bank_name);
					$('.ifsc_bank').attr('value',val.ifsc_bank);
					$('.acc_no').attr('value',val.acc_no);
					}
				})
				.error(function (data, status) {
				});

	$('.page[data-page=bank_detail] form[name=pro_bank_detail]').validate({
		rules: {
			business_name: {
                required: true
            },
			user_email_: {
                required: true
            },
			acc_holder_name: {
                required: true
            },
			bank_name: {
                required: true,
				
            },
			ifsc_bank: {
                required: true,
			},
			acc_no: {
                required: true,
			},
        },
        messages: {
			business_name: {
                required: " Business Name is required"
            },
			user_email_: {
                required: " Email is required"
            },
			acc_holder_name: {
                required: "  Name is required"
            },
			bank_name: {
                required: "  Bank Name is required",
			},
			ifsc_bank: {
                required: " Ifsc Code is required",
			},
			acc_no: {
                required: " Account number is required",
			},
			
		},
		ignore: '',
		onkeyup: false,
		errorElement : 'div',
			errorPlacement: function(error, element) {
				error.appendTo(element.parent().siblings('.input-error'));
			},
		submitHandler: function(form) {
			
            var business_name = $('#business_name').val();
            var user_email_ = $('#user_email_').val();
            var business_type = $('#business_type').val();
            var account_type = $('#account_type').val();
            var acc_holder_name = $('#acc_holder_name').val();
            var bank_name = $('#bank_name').val();
            var ifsc_bank = $('#ifsc_bank').val();
        
            var acc_no = $('#acc_no').val();
			myApp.showIndicator();
			var data ={
                
                business_name: business_name,
                user_email_: user_email_,
                business_type: business_type,
                account_type: account_type,
                acc_holder_name: acc_holder_name,
				user_id: user_detail.user_id,
				full_name: user_detail.full_name,
                bank_name: bank_name,
                ifsc_bank: ifsc_bank,
                acc_no: acc_no,
            }
			$.post(API_URL+'users/update_vendor_bank_details', data)
				.success(function (data, status) {
					myApp.hideIndicator();
					if(data.status == 200){
						console.log(data.status);
					myApp.addNotification({message:data.message,hold: 1500});
					mainView.router.load({url: 'vendor_order_list.html'});
					}else{
						myApp.addNotification({message:data.message,hold: 1500});
					}
				})
				.error(function (data, status) {
				});
		
		}
	});
});



myApp.onPageInit('user_refund_detail', function(page) {
	
	if(user_detail.user_type == 'vendor'){
		$$('.page[data-page=user_refund_detail] .tool_for_customer').remove();
	}else{
		$$('.page[data-page=user_refund_detail] .tool_for_vendor').remove();
	}
	
var refund = 0;
	var data = {
		user_id : user_detail.user_id,
	}
	$.post(API_URL+'users/fatch_refund_money', data)
				.success(function (data, status) {
					if(data.status == 200){
					 refund = parseFloat(data.refund_amount);
					if(refund > 0){
						$('.refund_amount').text(refund);
						$('form[name="pro_bank_detail"]').removeClass('display_none');
					}
					
					}
				})
				.error(function (data, status) {
				});


	$('.page[data-page=user_refund_detail] form[name=pro_bank_detail]').validate({
		rules: {
			acc_holder_name: {
                required: true,
				
            },
			bank_name: {
                required: true,
				
            },
			ifsc_bank: {
                required: true,
			},
			acc_no: {
                required: true,
			},
        },
        messages: {
			acc_holder_name: {
                required: "  Name is required",
				
            },
			bank_name: {
                required: "  Bank Name is required",
			},
			ifsc_bank: {
                required: " Ifsc Code is required",
			},
			acc_no: {
                required: " Account number is required",
			},
			
		},
		ignore: '',
		onkeyup: false,
		errorElement : 'div',
			errorPlacement: function(error, element) {
				error.appendTo(element.parent().siblings('.input-error'));
			},
		submitHandler: function(form) {
			
            var acc_holder_name = $('#acc_holder_name').val();
            var bank_name = $('#bank_name').val();
            var ifsc_bank = $('#ifsc_bank').val();
        
            var acc_no = $('#acc_no').val();
			myApp.showIndicator();
			var data ={
                
                acc_holder_name: acc_holder_name,
				user_id: user_detail.user_id,
                bank_name: bank_name,
                ifsc_bank: ifsc_bank,
                acc_no: acc_no,
                refund: refund,
            }
			$.post(API_URL+'users/send_request_to_refund', data)
				.success(function (data, status) {
					myApp.hideIndicator();
					if(data.status == 200){
						console.log(data.status);
						myApp.addNotification({message:data.message,hold: 5000});
						redirect_page_name='subscription.html';
						mainView.router.load({url: 'redirect_page.html'});					
					}
				})
				.error(function (data, status) {
				});
		
		}
	});
});