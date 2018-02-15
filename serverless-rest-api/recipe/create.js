'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event,context,callback) =>{
   const timestamp = new Date().getTime();
   const data = JSON.parse(event.body);
   
   if(typeof data.text !== 'string'){
       console.erroe('Validation Failed');
       callback(new Error('Cannot create any recipe'))
        return;
       
   }
   const params = {
      TableName:'Recipe',
      Item: {
          id: uuid.v1(),
          text: data.text,
          checked: false,
          createdAt: timestap,
          updatedAt: timestamp
          
      }
   }
   
    dynamodb.put(params, (error,result) =>{
        if(error){
            console.error(error);
            callback(new Error('Cannot create the receipe'));
            return;
        }
        const response ={
            statusCode: 200,
            body: JSON.stringify(results.Item)
        }
        callback(null,response);
    });
}