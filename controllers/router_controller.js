const express = require('express')
const router = express.Router()
const Stock = require('../models/stocks.js')
const stockSeed = require('../models/seed.js')

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

//___________________
// Routes
//___________________
//localhost:3000

// Index
router.get('/' , (req, res) => {
  Stock.find({}, (error, allStocks) => {
    res.render('home_index.ejs', {
      stocks: allStocks,
      currentUser: req.session.currentUser
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
router.get('/new', isAuthenticated (req, res) => {
  res.render('stock_new.ejs', {
      currentUser: req.session.currentUser
  })
})

// Create new
router.post('/', (req, res) => {
  Stock.create(req.body, (error, addedStock) => {
    res.redirect('/')
  })
})

// Edit get
router.get('/:id/edit', isAuthenticated (req, res) => {
  Stock.findById(req.params.id, (error, foundStock) => {
    res.render(
      'stock_edit.ejs',
      {
        stock: foundStock,
        currentUser: req.session.currentUser
      }
    )
  })
})

// Edit put
router.put('/:id', isAuthenticated (req, res) => {
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
  if (req.session.currentUser) {
    Stock.findById(req.params.id, (error, foundStock) => {
      console.log(foundStock);
      res.render('stock_show.ejs', {
        stock: foundStock,
        currentUser: req.session.currentUser
      })
    })
  }
})


module.exports = router
