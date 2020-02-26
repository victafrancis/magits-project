const express = require('express');
const app = express();
const userRoute = express.Router();
const jwt = require('jsonwebtoken');

// user model
let User = require('../model/User');
let Course = require('../model/Course')
let Feedback = require('../model/Feedback')
var myDay = new Date();
var currentDay

//import logging tool
let Log = require('../logging')

//register a User
userRoute.route('/register').post((req, res, next) => {


  let userData = req.body;
  User.findOne({email: userData.email}, (error, user) => {
    if(error){
      console.log(error);
    }else {
      if(user) {
        res.status(401).send('Email Exist!');
      } else {
        User.create(req.body, (error, user) => {
          if (error) {
            console.log(error);
          }
          let payload = {
            subject: user._id,
            role: user.role,
            firstname: user.firstname,
            lastname: user.lastname
          }
          let token = jwt.sign(payload, 'secretKey');
          //log event
          Log.newLog('New user created', user._id)
          res.status(200).send({token});
        });
      }
    }
  })
});

//Login
userRoute.route('/login').post((req, res, next) => {
  let userData = req.body;
  User.findOne({email: userData.email}, (error, user) => {
    if(error){
      console.log(error);
    }else {
      if(!user) {
        res.status(401).send('Invalid Email');
      } else if( user.password !== userData.password){
        res.status(401).send('Invalid Password');
      }else {
        let payload = {
          subject: user._id,
          role: user.role,
          firstname: user.firstname,
          lastname: user.lastname
        }
        let token = jwt.sign(payload, 'secretKey');
        //log event
        Log.newLog('User has logged in', user._id)
        res.status(200).send({token});
      }
    }
  })
});



// Get all users
userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get all members
userRoute.route('/get-members').get((req, res) => {
  User.find({ role:'member'}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get all instructors
userRoute.route('/get-instructors').get((req, res) => {
  User.find({ role:'instructor'}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get all instructors not in the course
userRoute.route('/get-instructors-not-assigned-in-course/:id').get((req, res) => {
  User.find({"courses.course": {$ne:req.params.id}, "role":"instructor"}, (error, data) => {
    if (error){
      return next(error)
    }else{
      res.json(data)
    }
  })
});

// Get single user
userRoute.route('/read-user/:id').get((req, res, next) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update user
userRoute.route('/update/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      //console.log(error)
    } else {
      console.log('User successfully updated!')
      //log event
      Log.newLog('User profile updated!', data._id)
      res.json(data)
    }
  })
})

// Delete user
userRoute.route('/delete-user/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //log event
      Log.newLog('User deleted! UserID:'+req.params.id)
      res.status(200).json({
        msg: data
      })
    }
  })
})

//get the list of all sessions attended by a member-------------------------------------------------------------------------
userRoute.route('/member-get-attended-sessions').post((req, res) => {
  var outData = []
  var userData = {}
  var feedbackSent = []

  User.findById(req.body.subject).populate('sessions').populate('feedback')
    .then(
      function(userData) {

        //get the sessions where feedback was already submitted
        for (var fb of userData.feedback){
          feedbackSent.push(String(fb.session))
        }

        for (var session of userData.sessions){
          var outSession = {}
          outSession.session_id = session._id
          outSession.date = session.date
          outSession.course_id = session.course
          outSession.start_time = session.start_time
          outSession.end_time = session.end_time
          //check if feedback was already sent for the specific session
          if( feedbackSent.includes(String(session._id))){
            outSession.feedback_sent = true
          } else {
            outSession.feedback_sent = false
          }

          //push to outdata array
          outData.push(outSession)
        }

        return User.findById(req.body.subject).populate('courses.course')

      }
    )
    .then(
      function(userData){
        //iterate through the outgoing data array to check for every course ID and add the course name
        for (var out of outData){
          for (var course of userData.courses) {
            if (String(out.course_id) == String(course.course._id)) {
              out.course_name = course.course.name
              break
            }
          }
        }

        res.json(outData)
      }
    )
    .catch(
      function(err) {
        console.log(err)
      }
    )
})



// Get course details of an instructor-------------------------------------------------------------------------------------------
userRoute.route('/instructor-get-course-details').post((req, res) => {
  User.findById(req.body.subject).populate('courses.course').exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get course details of an member-------------------------------------------------------------------------------------------
userRoute.route('/member-get-course-details').post((req, res) => {
  User.findById(req.body.subject).populate('courses.course').populate('courses.membership').exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data.courses)
    }
  })
})


module.exports = userRoute;
