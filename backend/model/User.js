const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  birthdate: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String
  },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', User)

