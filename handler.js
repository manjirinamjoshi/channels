(function (module, require) {
    'use strict';
  
    var channelService = require('./channel-service');
  
    module.exports.readByChannelCode = (event, context, callback) => {
        channelService.readByChannelCode(event, context).then(readSuccessCallback).catch();
    
      function readSuccessCallback(serviceResponse) {
        var response = {
          'statusCode': serviceResponse.httpStatusCode,
          'headers': { 'Content-Type': 'application/json' },
          "body": JSON.stringify(serviceResponse.body),
          "isBase64Encoded": false
        };
        callback(null, response);
      }
    };

    module.exports.createChannel = (event, context, callback) => {
      channelService.createChannel(event, context).then(createSuccessCallback).catch();
  
    function createSuccessCallback(serviceResponse) {
      var response = {
        'statusCode': serviceResponse.httpStatusCode,
        'headers': { 'Content-Type': 'application/json' },
        "body": null,
        "isBase64Encoded": false
      };
      callback(null, response);
    }
  };
}(module, require));