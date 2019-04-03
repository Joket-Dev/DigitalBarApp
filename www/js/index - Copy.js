var app = {
    // Application Constructor
    initialize: function() {
		alert('initialize');
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		console.log('initialize1');
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

		alert('onDeviceReady');
		
        document.getElementById("paymentWithoutUpi").addEventListener("click", paymentWithoutUpi);
        document.getElementById("paymentWithUpi").addEventListener("click", paymentWithUpi);
        document.getElementById("googleLogin").addEventListener("click", googleLogin);
        document.getElementById("facebookLogin").addEventListener("click", facebookLogin);

     

		function paymentWithoutUpi (){
			alert('paymentWithoutUpi');
			//key: rzp_test_XnnO1BfncyMLUB
			console.log("call");
			//document.getElementById("buyNowBtn").setAttribute("paypal_id", payment.response.id);
			var user_email_p = document.getElementById("paymentWithoutUpi").getAttribute("user_email_p");
			var user_mobile_p = document.getElementById("paymentWithoutUpi").getAttribute("user_mobile_p");
			var user_name_p = document.getElementById("paymentWithoutUpi").getAttribute("user_name_p");
			var amount_p = document.getElementById("paymentWithoutUpi").getAttribute("amount_p");
			
			var options = {
				description: '',
				image: 'https://localmandi.net/assets/img/logo.png',
				currency: 'INR',
				key: 'rzp_live_owjvtNY2yX8i9t',
				// order_id: 'order_6234vbdd643hdf64bddh',
				amount: amount_p,
				name: 'LocalMandi',
				prefill: {
					email: user_email_p,
					contact: user_mobile_p,
					name: user_name_p
				},
				theme: {
					color: '#00AA9D'
				}
			}
			
			var successCallback = function(success) {
				alert('payment_id: ' + success.razorpay_payment_id);
				document.getElementById("paymentWithoutUpi").setAttribute("payment_token_p", success.razorpay_payment_id);
				//var orderId = success.razorpay_order_id
				//var signature = success.razorpay_signature
				$('#paymentFinalStauts').trigger('click');
			}
			
			var cancelCallback = function(error) {
				alert(JSON.stringify(error));
				$('#paymentFinalStauts').trigger('click');
			}
			
			RazorpayCheckout.on('payment.success', successCallback)
			RazorpayCheckout.on('payment.cancel', cancelCallback)
			RazorpayCheckout.open(options)
		}


		function paymentWithUpi (){
			
			var user_email_p = document.getElementById("paymentWithUpi").getAttribute("user_email_p");
			var user_mobile_p = document.getElementById("paymentWithUpi").getAttribute("user_mobile_p");
			var user_name_p = document.getElementById("paymentWithUpi").getAttribute("user_name_p");
			var amount_p = document.getElementById("paymentWithUpi").getAttribute("amount_p");

			var options = {
				description: 'Credits towards consultation',
				image: 'https://localmandi.net/assets/img/logo.png',
				currency: 'INR',
				key: 'rzp_live_owjvtNY2yX8i9t',
				amount: amount_p,
				name: 'LocalMandi',
				prefill: {
				  email: user_email_p,
				  contact: user_mobile_p,
				  name: user_name_p
				},
				theme: {
				  color: '#009B90'
				}
			  }
			  
			  var successCallback = function(payment_id) {
				//alert('payment_id: ' + payment_id);
				document.getElementById("paymentWithUpi").setAttribute("payment_token_p", payment_id);
				
				$('#paymentFinalStauts').trigger('click');
			  }
			  
			  var cancelCallback = function(error) {
				//alert(error.description + ' (Error '+error.code+')');
				$('#paymentFinalStauts').trigger('click');
			  }
			  
			  RazorpayCheckout.open(options, successCallback, cancelCallback)

			console.log("call");

		 }

		 function googleLogin(){

			 console.log("Login Call");

			 window.plugins.googleplus.login({
					'webClientId': '222969602590-8i2fsf7m8nukutbqnf985et05oe8f8vb.apps.googleusercontent.com',
					'offline': true
				},
				function (obj) {
				  alert(JSON.stringify(obj)); // do something useful instead of alerting
				},
				function (msg) {
				  alert('error: ' + msg);
				}
			);
		 }


	   function  facebookLogin(){
			 
				var fbLoginSuccess = function (userData) {
					console.log("UserInfo: ", userData);
					alert(JSON.stringify(userData))
				}
				
				facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
					function loginError (error) {
					   console.error(error)
					}
				);

				

		 }
  
		this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
		console.log('receivedEvent');
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
document.addEventListener('deviceready', function () {
		console.log('notificationOpenedCallback');
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("2759c0bc-f561-43af-a06d-88d2cdcad265")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

	window.plugins.OneSignal.getIds(function(ids) {
		//document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
		//document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
		//alert('userId');
		$('#player_id').val(JSON.stringify(ids['userId']));
		//alert(JSON.stringify(ids['userId']));
		document.getElementById("player_id").setAttribute("payer_id", JSON.stringify(ids['userId']));
	});
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);


app.initialize();