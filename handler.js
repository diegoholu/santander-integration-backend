"use strict"

// const AWSXRay = require("aws-xray-sdk-core")
// import AWSXRay from "aws-xray-sdk-core"
// const aws = AWSXRay.captureAWS("aws-sdk")
// const lambda = new aws.Lambda()
// const apigateway_key = "Uj8tYuFDBQ1B4dpTZURL12oARW2JyNlc2aJV2Qyy"

const healthCheck = require("./functions/ping.js")
const santanderIframeCreate = require("./functions/santander-iframe-create.js")
const santanderIframeUpdate = require("./functions/santander-iframe-update.js")
const santanderIframePolicy = require("./functions/santander-iframe-policy.js")
const santanderIframeMockResponse = require("./functions/santander-iframe-mock-response.js")

module.exports.ping = async (event) => {
  const data = {}
  try {
    data.body = await healthCheck(event)
    data.body = serialize(data.body)
    return formatResponse(data.body)
  } catch (error) {
    return formatError(error)
  }
}

module.exports.mockResponse = async (event) => {
  const data = {}
  try {
    data.body = await santanderIframeMockResponse(event)
    data.body = serialize(data.body)
    return formatResponse(data.body)
  } catch (error) {
    return formatError(error)
  }
}

module.exports.policyPrivacy = async (event) => {
  const data = {}
  try {
    data.body = await santanderIframePolicy(event)
    data.body = serialize(data.body)
    return formatResponse(data.body)
  } catch (error) {
    return formatError(error)
  }
}

module.exports.create = async (event) => {
  const data = {}
  try {
    data.body = await santanderIframeCreate(event)
    data.body = serialize(data.body)
    return formatResponse(data.body)
  } catch (error) {
    return formatError(error)
  }
}
module.exports.update = async (event) => {
  const data = {}
  try {
    data.body = await santanderIframeUpdate(event)
    data.body = serialize(data.body)
    return formatResponse(data.body)
  } catch (error) {
    return formatError(error)
  }
}

const serialize = function (object) {
  return JSON.stringify(object, null, 2)
}

const formatResponse = (body) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: body,
  }
  return response
}

const formatError = (error) => {
  const response = {
    statusCode: 500,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-amzn-ErrorType": error.code,
    },
    isBase64Encoded: false,
    body: error.message,
  }
  return response
}
