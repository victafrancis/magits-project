//this is our api.js
const express = require('express');
const app = express();
const sessionRoute = express.Router();

// models
let Session = require('../model/Session');
let Course = require('../model/Course')
let User = require('../model/User')
let Membership = require('../model/Membership')

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


//get sessions by course
sessionRoute.route('/get-session-by-course').get((req, res) => {
  Session.find({course: req.body._id}, (error, sessionData) => {
    if (error) {return next(error)}

    res.json(sessionData)
  })
})


//check in a member to a session------------------------------------------------------------------------------------
sessionRoute.route('/session-check-in-member').put((req, res) => {
  var msg = new Object();

  User.findById(req.body.subject, (error, memberData) => {
    if (error) {
      //if error return user not found
      msg.message = "User not found!";
      res.json(msg);
      return;
    }

    //check if ID returned a member. If not return user not found message
    if (memberData.role != "member"){
      msg.message = "User is not a member! Please scan a member ID!";
      res.json(msg);
      return;
    }

    //If member is returned, we'll need to check the sessions that are
    //open based on the courses that the member is registered to
    //Iterate through courses array to find the open sessions
    // console.log(memberData.courses)
    for (var course of memberData.courses) {
      console.log(course.course)
      Course.findById(course.course, (error, courseData) => {
        if (error) {return error}

        //find all open sessions
        Session.find({open: true}, (error, sessionData) => {
          if (error) {return next(error)}

          //find open session that matches the course of the member
          for (var session of sessionData){
            if (String(session.course) == String(course.course)) {

              //find out the membership of the member if subscription or session-based
              Membership.findById(course.membership, (error, membershipData) => {
                if (error) {return error}

                console.log(membershipData.membership_type)
              })
            }
          }

        })

      })
    }

    console.log('final log msg')
    res.json(memberData)
  })
})

module.exports = sessionRoute;
