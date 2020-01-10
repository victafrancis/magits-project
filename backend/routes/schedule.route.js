//this is our api.js
const express = require('express');
const app = express();
const scheduleRoute = express.Router();

// Schedule model
let Schedule = require('../model/Schedule');


// Add Schedule
scheduleRoute.route('/add-schedule').post((req, res, next) => {
  Schedule.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all schedule
scheduleRoute.route('/').get((req, res) => {
  Schedule.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single schedule
scheduleRoute.route('/read-schedule/:id').get((req, res) => {
  Schedule.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update schedule
scheduleRoute.route('/update/:id').put((req, res, next) => {
  Schedule.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Schedule successfully updated!')
    }
  })
})

// Delete schedule
scheduleRoute.route('/delete-schedule/:id').delete((req, res, next) => {
  Schedule.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = scheduleRoute;
