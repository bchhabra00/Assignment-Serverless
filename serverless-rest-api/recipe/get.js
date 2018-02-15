'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const params = {
        TableName: 'Recipe',
        key:{
            id: event.pathParameters.id
        }
    };
    
    dynamodb.get(params,(error, result) =>{
        if(error){
            console.error(error);
            callback(new Error('Cannot create any recipe'));
            return;
        }
        
        const response = {
            statusCode:200,
            body: JSON.stringify(result.Items)
        }
        
        callback(null,response);
    });
}