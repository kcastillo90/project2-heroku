const express = require('express')
const router = express.Router()
const Stock = require('../models/stocks.js')
const stockSeed = require('../models/seed.js')

//___________________
// Routes
//___________________
//localhost:3000

// Index
router.get('/' , (req, res) => {
  Stock.find({}, (error, allStocks) => {
    res.render('home_index.ejs', {
      stocks: allStocks
    })
  })
})

// Seed
router.get('/seed', (req, res) => {
  Stock.deleteMany({}, () => {})
  Stock.create(stockSeed, (error, data) => {
    error ? res.status(400).json(error) : res.status(200).json(data)
  })
})








// Show
router.get('/:id', (req, res) => {
  Stock.find(req.params.id, (error, foundStock) => {
    console.log(foundStock);
    res.render('stock_show.ejs', {
      stock: foundStock
    })
  })
})


module.exports = router
