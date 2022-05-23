// const req = {
//   otovoId: "c71442d1-9ae4-4a9f-96e4-ee1079dc04a3",
//   totalPrice: 50000,
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
module.exports = (event) => {
  const data = JSON.parse(event.body)
  if (data) {
    if (data.totalPrice) mock.gross_price = data.totalPrice
  }

  return mock
}
