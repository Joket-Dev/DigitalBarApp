'use strict';
/*
|------------------------------------------------------------------------------
| Settings
|------------------------------------------------------------------------------
*/

myApp.onPageInit('settings', function(page) {
$('.user_photo').attr('src',APP_BASE_URL+'uploads/'+user_detail.user_img);	
$('.Name_user').html(user_detail.full_name);


if(user_detail.user_type=='vendor'){
	$('.user_panel').addClass('display_none');
	$('.vendor_panel').removeClass('display_none');
}


if(user_detail.user_type=='customer'){
	$('.vendor_panel').addClass('display_none');
	$('.user_panel').removeClass('display_none');
}

$('body').on('click', ' .vender_add_goods212212', function (e) {
console.log('vender_add_goods');		
			 edit_vendor_goods_id = 0;
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
			localStorage.setItem("charity_user_details", JSON.stringify('empty'));
			localStorage.setItem("publicsection_charity", JSON.stringify('true'));
			localStorage.setItem("privatesection_charity", JSON.stringify('false'));
			$(".is_public").removeClass('display_none');
			$(".is_private").addClass('display_none');
			var user_bh = JSON.parse(localStorage.getItem("charity_user_details"))
			if(user_bh =='empty'){
				console.log(user_bh);
			setTimeout(function(){
			mainView.router.load({
				url: 'login.html'
				});
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

});

