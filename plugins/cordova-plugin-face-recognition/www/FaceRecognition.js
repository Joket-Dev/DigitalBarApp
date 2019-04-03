var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var safesmsExport = {};

safesmsExport.create = function(options, successCallback, failureCallback) {
    if (typeof options === 'object') {
        cordova.exec(successCallback, failureCallback, 'FaceRecognition', 'create', [options]);
    } else {
        if (typeof failureCallback === 'function') {
            failureCallback('options should be specified.');
        }
    }
}
module.exports = safesmsExport;