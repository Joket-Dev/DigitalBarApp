cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "es6-promise-plugin.Promise",
    "file": "plugins/es6-promise-plugin/www/promise.js",
    "pluginId": "es6-promise-plugin",
    "runs": true
  },
  {
    "id": "cordova-plugin-x-socialsharing.SocialSharing",
    "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
    "pluginId": "cordova-plugin-x-socialsharing",
    "clobbers": [
      "window.plugins.socialsharing"
    ]
  },
  {
    "id": "onesignal-cordova-plugin.OneSignal",
    "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
    "pluginId": "onesignal-cordova-plugin",
    "clobbers": [
      "OneSignal"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "com.unarin.cordova.beacon.underscorejs",
    "file": "plugins/com.unarin.cordova.beacon/www/lib/underscore-min-1.6.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.Q",
    "file": "plugins/com.unarin.cordova.beacon/www/lib/q.min.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.LocationManager",
    "file": "plugins/com.unarin.cordova.beacon/www/LocationManager.js",
    "pluginId": "com.unarin.cordova.beacon",
    "merges": [
      "cordova.plugins"
    ]
  },
  {
    "id": "com.unarin.cordova.beacon.Delegate",
    "file": "plugins/com.unarin.cordova.beacon/www/Delegate.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.Region",
    "file": "plugins/com.unarin.cordova.beacon/www/model/Region.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.Regions",
    "file": "plugins/com.unarin.cordova.beacon/www/Regions.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.CircularRegion",
    "file": "plugins/com.unarin.cordova.beacon/www/model/CircularRegion.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.BeaconRegion",
    "file": "plugins/com.unarin.cordova.beacon/www/model/BeaconRegion.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "cordova-plugin-badge.Badge",
    "file": "plugins/cordova-plugin-badge/www/badge.js",
    "pluginId": "cordova-plugin-badge",
    "clobbers": [
      "cordova.plugins.notification.badge"
    ]
  },
  {
    "id": "cordova-plugin-ezar-facedetector.FaceInfo",
    "file": "plugins/cordova-plugin-ezar-facedetector/www/FaceInfo.js",
    "pluginId": "cordova-plugin-ezar-facedetector",
    "clobbers": [
      "FaceInfo"
    ]
  },
  {
    "id": "cordova-plugin-ezar-facedetector.facedetector",
    "file": "plugins/cordova-plugin-ezar-facedetector/www/facedetector.js",
    "pluginId": "cordova-plugin-ezar-facedetector",
    "merges": [
      "ezar"
    ]
  },
  {
    "id": "cordova-plugin-ezar-videooverlay.videoOverlay",
    "file": "plugins/cordova-plugin-ezar-videooverlay/www/videoOverlay.js",
    "pluginId": "cordova-plugin-ezar-videooverlay",
    "merges": [
      "ezar"
    ]
  },
  {
    "id": "cordova-plugin-ezar-videooverlay.camera",
    "file": "plugins/cordova-plugin-ezar-videooverlay/www/camera.js",
    "pluginId": "cordova-plugin-ezar-videooverlay",
    "clobbers": [
      "camera"
    ]
  },
  {
    "id": "com.razorpay.cordova.RazorpayCheckout",
    "file": "plugins/com.razorpay.cordova/www/RazorpayCheckout.js",
    "pluginId": "com.razorpay.cordova",
    "clobbers": [
      "RazorpayCheckout"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-android-support-gradle-release": "1.4.4",
  "cordova-plugin-statusbar": "2.4.2",
  "cordova-plugin-whitelist": "1.3.3",
  "es6-promise-plugin": "4.2.2",
  "cordova-plugin-x-socialsharing": "5.4.1",
  "onesignal-cordova-plugin": "2.4.5",
  "cordova-plugin-device": "2.0.2",
  "com.unarin.cordova.beacon": "3.6.1",
  "cordova-plugin-badge": "0.8.8",
  "cordova-plugin-ezar-facedetector": "1.0.0",
  "cordova-plugin-ezar-videooverlay": "1.0.0",
  "com.razorpay.cordova": "0.16.1"
};
// BOTTOM OF METADATA
});