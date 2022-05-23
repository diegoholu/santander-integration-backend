"use strict"

const actions = require("../services/santander")

const services = require("../services/dynamodb")

module.exports = async (event) => {
  try {
    const data = JSON.parse(event.body)
    if (
      !data.otovoId ||
      !data.totalPrice ||
      !event.pathParameters.loanRequestId
    )
      throw new Error("missing parameters")

    // const otovoId = data.otovoId

    // let id = event.pathParameters.loanRequestId

    // let params = { TableName: "santander", Key: { id: id } }
    // let { Item } = await services.Dynamodb.get(params)

    // let proposalId = Item.proposalId
    // let payloadSantander = {
    //   SimulationInput: {
    //     proposalId: proposalId,
    //     payment: {
    //       financedValue: data.totalPrice,
    //       installmentAmount: 36,
    //     },
    //   },
    // }

    // let response = await actions.flows.updateSimulation(payloadSantander)

    // // ATUALIZAR DYNAMO
    // let payloadDynamo = {}
    // payloadDynamo.id = id
    // payloadDynamo.otovoId = otovoId
    // payloadDynamo.createdAt = Item.createdAt
    // payloadDynamo.updatedAt = new Date().getTime()
    // payloadDynamo.proposalId = proposalId
    // payloadDynamo.simulation = response.data

    // params = { TableName: "santander", Item: payloadDynamo }
    // let simulation = await services.Dynamodb.put(params)
    // simulation = simulation.rawParams.Item.simulation

    // //MONTAR PAYLOAD PARA O FRONTEND
    // const result = {
    //   loan_num_terms: simulation.simulationData.installmentTotalQuantity,
    //   monthly_gross_price: simulation.simulationData.installmentValue,
    //   total_customer_cost: simulation.simulationData.financedTotalValue,
    //   gross_price: simulation.simulationData.financedValue,
    //   currency: "BRL",
    //   interest_rate_by_year: simulation.simulationData.interestRateByYear,
    //   has_accepted_GDPR: true,
    //   has_accepted_contact_messages: true,
    // }
    const mock = {
      loan_num_terms: 36,
      monthly_gross_price: 1580,
      total_customer_cost: 50000,
      gross_price: "35000",
      currency: "BRL",
      interest_rate_by_year: 22.5,
      has_accepted_GDPR: true,
      has_accepted_contact_messages: true,
    }

    return mock
  } catch (error) {
    throw error
  }
}
