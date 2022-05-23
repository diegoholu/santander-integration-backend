const santanderRepository = require("../repositories/santander.js")

const getAccessToken = async () => {
  try {
    let response = await santanderRepository.postToken()
    let { access_token } = response.data
    return access_token
  } catch (error) {
    return error
  }
}
const postDomainsConsentRegister = async (docNum, token) => {
  try {
    await santanderRepository.postDomainsConsentRegister(
      { documentNumber: docNum },
      token
    )
  } catch (error) {
    throw error
  }
}

module.exports = {
  getListTerms: async () => {
    let token = await getAccessToken()
    return santanderRepository.getListTerms(token)
  },
  getSimulationByProposalId: async (id) => {
    let token = await getAccessToken()
    return santanderRepository.getSimulationByProposalId(id, token)
  },
  createSimulation: async (data) => {
    let docNum = data.partnerClient.documentNumber
    let token = await getAccessToken()
    await postDomainsConsentRegister(docNum, token)
    return santanderRepository.postSimulation(data, token)
  },
  updateSimulation: async (data) => {
    let token = await getAccessToken()
    return santanderRepository.postSimulationFinish(data, token)
  },
}
