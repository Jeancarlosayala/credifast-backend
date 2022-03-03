const mongoose = require('mongoose')

const PaymentSchema = mongoose.Schema({
  titular: String,
  tarjeta: Number,
  mes: Number,
  año: Number,
  cvv: Number
})

module.exports = mongoose.model('payment', PaymentSchema)