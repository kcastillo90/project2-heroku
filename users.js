const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  firstname: { type: String, required: true },
  middlename: { type: String, required: false },
  lastname: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)

module.exports = User
