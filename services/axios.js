const axios = require("axios")

/**
 * @fileOverview Creates and exports an Axios instance
 */
const base_url_prod = "https://brpiosantanderapihml.viverebrasil.com.br"
/** @type {AxiosStatic} */

const client = axios.create({
  baseURL: base_url_prod,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "", // application/json
  },
})

module.exports = class Http {
  static get(path = "", authHeader) {
    return client({
      method: "GET",
      url: path,
      headers: { ...authHeader },
    })
  }
  static postUrlEncoded(
    path = "",
    data = {},
    auth = {},
    authHeader = () => {}
  ) {
    return client({
      method: "POST",
      url: path,
      auth,
      data,
      headers: { ...authHeader() },
    })
  }
  static post(path = "", data = {}, authHeader) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...authHeader },
    })
  }
  static patch(path = "", data = {}, authHeader = () => {}) {
    return client({
      method: "PATCH",
      url: path,
      data,
      headers: { ...authHeader() },
    })
  }
  static delete(path = "", data = {}, authHeader = () => {}) {
    return client({
      method: "DELETE",
      url: path,
      data,
      headers: { ...authHeader() },
    })
  }
  static put(path = "", data = {}, authHeader = () => {}) {
    return client({
      method: "PUT",
      url: path,
      data,
      headers: { ...authHeader() },
    })
  }
}

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error
    const originalRequest = error.config
    if (response) {
      if (response.status === 500) {
        return response
      } else {
        return originalRequest
      }
    }
    return Promise.reject(error)
  }
)

/**
 * Add token to header request
 */
