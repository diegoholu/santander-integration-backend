"use strict"

const servicesDynamo = require("../services/dynamodb")
const uuid = require("uuid")
const servicesSantander = require("../services/santander")

module.exports = async (event) => {
  try {
    const data = JSON.parse(event.body)

    let response = await servicesSantander.createSimulation(data)
    if (!response.data.proposalId)
      throw new Error(JSON.stringify(response.data.messages))

    let item = {}
    item.id = uuid.v1()
    item.partner = "santander"
    item.createdAt = new Date().getTime()
    item.updatedAt = new Date().getTime()
    item.proposalId = response.data.proposalId
    item.simulation = response.data
    const params = { TableName: "santander", Item: item }
    await servicesDynamo.Dynamodb.put(params)
    return item
  } catch (error) {
    throw error
  }
}
