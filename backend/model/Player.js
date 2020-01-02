const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Player = new Schema({
  player: {
    type: String
  },
  rank: {
    type: String
  },
  score: {
    type: String
  },
  time: {
    type: String
  },
  games_played: {
    type: String
  },
  status: {
    type: String
  }
}, {
  collection: 'players'
})

module.exports = mongoose.model('Player', Player)