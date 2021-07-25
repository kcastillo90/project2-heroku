const express = require('express')
const router = express.Router()
const Stock = require('../models/stocks.js')
const stockSeed = require('../models/seed.js')

//___________________
// Routes
//___________________
//localhost:3000
router.get('/' , (req, res) => {
  res.render('home_index.ejs')
});




module.exports = router
