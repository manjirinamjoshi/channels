(function (module, require) {
    'use strict';

    const AWS = require('aws-sdk');
    var service = {
        readByChannelCode: readByChannelCode,
        createChannel: createChannel
    };

    function readByChannelCode(event, context) {
        console.log("Entered: register");
        var dynamoDb = new AWS.DynamoDB.DocumentClient();
        var channelCode = event['pathParameters']['channelCode'];
        
        console.log("channelCode="+channelCode);

        var params = {  
            TableName: 'channels',  
            Key:{
                "channelCd": channelCode
            }
          };
        /*dynamoDb.get(params, function(err, data) {
            var response;
            if (err) {
              console.log("Error", err);
              response = {
                "httpStatusCode": 500, "body": null
              }
            } else {
              console.log("Success", data.Item);
              response = {
                "httpStatusCode": 200, "body": data.Item
              }
            }
            return response;
        });*/

        function dynamoSuccessCallback(data) {
            console.log("Success", data.Item);
            var response = {
                "httpStatusCode": 200, "body": data.Item
            };
            return response;
        }

        function dynamoErrorCallback(err) {
            console.log("Error", err);
            var response = {
                "httpStatusCode": 500, "body": null
            };
            return response;
        }
        return dynamoDb.get(params).promise().then(dynamoSuccessCallback).catch(dynamoErrorCallback);
    }


    function createChannel(event, context) {
        console.log("Entered: register");
        var dynamoDb = new AWS.DynamoDB.DocumentClient();
        var channelBody = event['body'];
        var channelBodyObj = JSON.parse(channelBody);
    
        console.log("channelBody="+channelBody);

        var params = {  
            TableName: 'channels',  
            Item: {
                channelCd: channelBodyObj.channelCd,
                status: channelBodyObj.status
            } 
          }
        return dynamoDb.put(params).promise().then(response => 201).catch(err => console.log(err));
    }
    module.exports = service;
}(module, require));