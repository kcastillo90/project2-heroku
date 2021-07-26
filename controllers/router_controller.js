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
  res.redirect('/')
})

// Get new
router.get('/new', (req, res) => {
  res.render('stock_new.ejs')
})

// Create new
router.post('/', (req, res) => {
  Stock.create(req.body, (error, addedStock) => {
    res.redirect('/')
  })
})

// Edit get
router.get('/:id/edit', (req, res) => {
  Stock.findById(req.params.id, (error, foundStock) => {
    res.render(
      'stock_edit.ejs',
      {
        stock: foundStock
      }
    )
  })
})

// Edit put
router.put('/:id', (req, res) => {
  Stock.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedStock) => {
    res.redirect(`/${req.params.id}`)
  })
})

// Delete
router.delete('/:id', (req, res) => {
  Stock.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/')
  })
})


// Show
router.get('/:id', (req, res) => {
  Stock.findById(req.params.id, (error, foundStock) => {
    console.log(foundStock);
    res.render('stock_show.ejs', {
      stock: foundStock
    })
  })
})


module.exports = router
