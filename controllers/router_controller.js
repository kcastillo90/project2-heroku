const express = require('express')
const router = express.Router()
const Stock = require('../models/stocks.js')
const stockSeed = require('../models/seed.js')
const UserStock = require('../models/users.js')   // gets portfolio data from users.js

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

// Index for home page
router.get('/' , (req, res) => {
    res.render('home_index.ejs', {
      currentUser: req.session.currentUser
  })
})


// Add stock to user list form
router.get('/users/addstock', (req, res) => {
  console.log(req.session.currentUser);
  UserStock.findById(req.params.id, (error, foundUser) => {
    res.render('user_addstock.ejs', {
      currentUser: req.session.currentUser
    })
  })
})

// Add stock to user list
router.put('/users/addstock/:id', (req, res) => {
  UserStock.findById(req.params.id, (error, updatedPortfolio) => {
    Stock.create(req.body, (err, newStock) => {
        updatedPortfolio.portfolio.push(newStock)
        updatedPortfolio.save(() => {
          res.redirect(`/users/${req.params.id}`)
        })
    })
  })
})

// Index for user portfolio
router.get('/users/:id', (req, res) => {
  UserStock.find({}, (error, allStocks) => {
    res.render('user_portfolio.ejs', {
      stocks: req.session.currentUser.portfolio,
      currentUser: req.session.currentUser
    })
  })
})

// Edit get
router.get('/:id/edit', (req, res) => {
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
router.put('/:id', (req, res) => {
  Stock.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedStock) => {
    UserStock.findOne({ 'portfolio._id': req.params.id }, (err, foundUser) => {
      foundUser.portfolio.id(req.params.id).remove()
      foundUser.portfolio.push(updatedStock)
      foundUser.save( (err, data) => {
        res.redirect(`/${req.params.id}`)
      })
    })
  })
})

// Delete
router.delete('/:id', (req, res) => {
  UserStock.findByIdAndRemove(req.params.id, (err, foundStock) => {
    UserStock.findOne({'portfolio._id': req.params.id}, (err, foundUser) => {
      foundUser.portfolio.id(req.params.id).remove()
      foundUser.save( (err, data) => {
        res.redirect(`/users/${req.session.currentUser.id}`)
      })
    })
  })
})

// Show
router.get('/:id', (req, res) => {
    Stock.findById(req.params.id, (error, foundStock) => {
      res.render('stock_show.ejs', {
        stock: foundStock,
        currentUser: req.session.currentUser
      })
    })
})


module.exports = router
