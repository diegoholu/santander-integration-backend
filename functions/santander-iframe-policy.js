"use strict"

const services = require("../services/santander")

module.exports = async (event) => {
  try {
    let response = await services.getListTerms()
    response = response.data.data.listTerms[0]
    return response
  } catch (error) {
    throw error
  }
}
