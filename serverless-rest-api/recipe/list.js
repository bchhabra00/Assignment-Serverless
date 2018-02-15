'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();


module.exports.create = (event, context, callback) => {
    const params = {
    TableName: 'Recipe'
}
    dynamodb.scan(params, (error,result) =>{
         if(error){
            console.erroe(error);
            callback(new Error('Cannot create any recipe'));
            return;
        }
        const response = {
            statusCode:200,
            body: JSON.stringify(result.Items)
        };
    
        callback(null,response);
    });
}