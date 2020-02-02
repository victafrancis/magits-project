//this is our api.js
const express = require('express');
const app = express();
const sessionRoute = express.Router();

// models
let Session = require('../model/Session');
let Course = require('../model/Course')

// Add Session for a course
sessionRoute.route('/add-session').post((req, res, next) => {
  Session.create(req.body, (error, data) => {
    if (error) {return next(error)}

    //add session id to course sessions array
    Course.findByIdAndUpdate(req.body.course, {
      $push: {"sessions": data._id}
    }, (error, data,next) => {
      if (error) {
        return next(error);
        console.log(error)
      }
    
    })

    console.log(`Session created on ${req.body.date}`)
    res.json(data)

  })
});

// Get all session
sessionRoute.route('/').get((req, res, next) => {
  Session.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single session
sessionRoute.route('/read-session/:id').get((req, res,next) => {
  Session.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update session
sessionRoute.route('/update/:id').put((req, res, next) => {
  Session.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Session successfully updated!')
    }
  })
})

// Delete session
sessionRoute.route('/delete-session/:id').delete((req, res, next) => {
  Session.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = sessionRoute;
