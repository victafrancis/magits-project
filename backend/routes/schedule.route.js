//this is our api.js
const express = require('express');
const app = express();
const scheduleRoute = express.Router();

// models
let Schedule = require('../model/Schedule');
let Course = require('../model/Course');

//import logging tool
let Log = require('../logging')


// Add Schedule to a course
scheduleRoute.route('/add-schedule/:id').post((req, res, next) => {

  var newSchedule = req.body;
  newSchedule.course = req.params.id;

  Schedule.create(newSchedule, (error, data) => {
    if (error) {return next(error)}

    //find course and add new schedule to the schedule array
    Course.findByIdAndUpdate(data.course, {
      $push: {"schedule": data._id}
    }, (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      }
    })

    //log event
    Log.newLog('New schedule created by admin. CourseID:'+req.params.id)
    res.json(data)
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
      console.log('Schedule successfully updated!')
      //log event
      Log.newLog('Schedule updated by admin. CourseID:'+data.course)
      res.json(data)
    }
  })
})

// Delete schedule
scheduleRoute.route('/delete-schedule/:id').delete((req, res, next) => {
  Schedule.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {return next(error);}

    //find course attached to schedule and remove schedule from that array
    Course.findByIdAndUpdate(data.course, {
      $pull: {"schedule": req.params.id}
    }, (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      }
    })

    console.log("schedule deleted!")
    //log event
    Log.newLog('Schedule deleted by admin. CourseID:'+data.course)
    res.status(200).json({
      msg: data
    })

  })
})

module.exports = scheduleRoute;
