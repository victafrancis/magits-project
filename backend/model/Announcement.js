const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Announcement = new Schema({
  date: {
    type: Date
  },
  subject: {
    type: String
  },
  content: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  collection: 'announcements'
})

module.exports = mongoose.model('Announcement', Announcement)

