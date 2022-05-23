const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient()

class Dynamodb {
  static get(params) {
    return dynamoDb.get(params).promise()
  }
  static put(params) {
    return dynamoDb.put(params, (error) => {
      if (error) return error
    })
  }
}

const services = {
  Dynamodb,
}
module.exports = services
