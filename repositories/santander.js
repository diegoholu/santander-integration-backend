const Http = require(`../services/axios.js`)
var qs = require("qs")

const VARIABLES = {
  base_url_prod: "https://brpiosantanderapihml.viverebrasil.com.br",
  consumer_key_username_prod: "FCquqdAcGl9j9xyP0QJmp8ANshUa",
  consumer_key_password_prod: "0FKJh6A_Pepkk81o9PdtvBIIIiMa",
  username: "36485363000101",
  password: "1qaz@WSX",
  store_id: "453933", //"4595450000",
}

const BODY_TOKEN = {
  //HEADERS PRÉ AUTH
  grant_type: "password",
  username: VARIABLES.username,
  password: VARIABLES.password,
  businessCode: "2",
  loginTypeId: "9",
  tpLoginCode: "00008",
  storeId: VARIABLES.store_id,
  revokeSession: true,
} //BACKEND

const authHeaderAuthentication = () => ({
  "Content-Type": "application/x-www-form-urlencoded",
})

const authHeaderAuthenticated = () => ({
  Authorization: `Bearer ${VARIABLES.access_token_prod}`,
  "Content-Type": "application/json",
  Connection: "keep-alive",
})
const authHeaderWithAccessToken = (access_token = "") => ({
  Authorization: `Bearer ${access_token}`,
  "Content-Type": "application/json",
  Connection: "keep-alive",
})

// FLUXO AUTH
//1- [POST]/token //armazena o access_token
//// body -> BODY_TOKEN

//FLUXO CREATE SIMULATION
//2- [GET]/domains/list-terms //exibi o html dos termos em rota especifica
//3- [POST]/domains/consent-register //aceita os termos
//// body -> BODY_DOMAINS_CONSENTREGISTER
//4- [POST]/simulation/simulation // nova simulação
//// body -> BODY_SIMULATION_SIMULATION

//FLUXO UPDATE SIMULATION
//1- [POST]/simulation/finish // atualizar simulação
//// body -> BODY_SIMULATION_FINISH

//FLUXO READ SIMULATION
//1- [GET]/simulation/:proposalId // ler simulação por proposalId

module.exports = {
  postToken() {
    const auth = {
      username: VARIABLES.consumer_key_username_prod,
      password: VARIABLES.consumer_key_password_prod,
    }
    return Http.postUrlEncoded(
      `${VARIABLES.base_url_prod}/token`,
      qs.stringify(BODY_TOKEN),
      auth,
      authHeaderAuthentication
    )
  },

  getListTerms(access_token = "") {
    return Http.get(
      `${VARIABLES.base_url_prod}/domains/list-terms`,
      authHeaderWithAccessToken(access_token)
    )
  },
  postDomainsConsentRegister(data = {}, access_token = "") {
    return Http.post(
      `${VARIABLES.base_url_prod}/domains/consent-register`,
      data,
      authHeaderWithAccessToken(access_token)
    )
  },
  postSimulation(data = {}, access_token = "") {
    return Http.post(
      `${VARIABLES.base_url_prod}/simulation/2.0.0/simulation`,
      data,
      authHeaderWithAccessToken(access_token)
    )
  },

  postSimulationFinish(data = {}, access_token = "") {
    return Http.post(
      `${VARIABLES.base_url_prod}/simulation/finish`,
      data,
      authHeaderWithAccessToken(access_token)
    )
  },
  getSimulationByProposalId(proposalId, access_token = "") {
    return Http.get(
      `${VARIABLES.base_url_prod}/simulation/${proposalId}`,
      authHeaderWithAccessToken(access_token)
    )
  },
}
