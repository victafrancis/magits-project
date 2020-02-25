//this is our api.js
const express = require('express');
const app = express();
const feedbackRoute = express.Router();

// Feedback model
let Feedback = require('../model/Feedback');
let User = require('../model/User')
let Session = require('../model/Session')

//import logging tool
let Log = require('../logging')


// Add Feedback
feedbackRoute.route('/add-feedback').post((req, res, next) => {
  var feedbackData = {}

  Feedback.create(req.body)
    .then(
      function(data){
        feedbackData = data

        return User.findByIdAndUpdate(req.body.member, {$push: {"feedback": feedbackData._id}})
      }
    )
    .then(
      function(data){

        return Session.findByIdAndUpdate(req.body.session, {$push: {"feedback": feedbackData._id}})
      }
    )
    .then(
      function(data){
        //log event
        Log.newLog('Member added feedback for session. SessionID:'+req.body.session, req.body.member)
        res.json(feedbackData)
      }
    )
    .catch(
      function(error){
        return error
      }
    )
});

// Get all feedback
feedbackRoute.route('/').get((req, res) => {
  Feedback.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single feedback
feedbackRoute.route('/read-feedback/:id').get((req, res) => {
  Feedback.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update feedback
feedbackRoute.route('/update/:id').put((req, res, next) => {
  Feedback.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Feedback successfully updated!')
    }
  })
})

// Delete feedback
feedbackRoute.route('/delete-feedback/:id').delete((req, res, next) => {
  Feedback.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = feedbackRoute;
