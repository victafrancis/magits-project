const express = require('express');
const app = express();
const announcementRoute = express.Router();

// announcement model
let Announcement = require('../model/Announcement');


//add an Announcement
announcementRoute.route('/add-announcement').post((req, res, next) => {
  Announcement.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Get all announcements
announcementRoute.route('/').get((req, res) => {
  Announcement.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single announcement
announcementRoute.route('/read-announcement/:id').get((req, res) => {
  Announcement.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Delete announcement
announcementRoute.route('/delete-announcement/:id').delete((req, res, next) => {
  Announcement.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = announcementRoute;
