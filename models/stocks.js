const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  ticker: {type: String, required: true},
  company: {type: String, required: true},
  price: {type: String, required: true},
  description: String,
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock
