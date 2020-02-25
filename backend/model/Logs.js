const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Log = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  log: {
    type: String
  }
}, {
  collection: 'logs'
})

module.exports = mongoose.model('Log', Log)
