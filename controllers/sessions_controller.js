const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/session_new.ejs', {
    currentUser: req.session.currentUser
  })
})

sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if(err) {
      console.log(err)
      res.send('Database error')
    } else if (!foundUser) {
      res.send('<a href="/"> User not found, try another username... </a>')
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect(`/users/${req.session.currentUser.id}`)
      } else {
        res.send('<a href="/"> Incorrect password! Please try again.</a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy( () => {
    res.redirect('/')
  })
})

module.exports = sessions
