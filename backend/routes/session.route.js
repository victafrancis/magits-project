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
  console.log("from Backend")
  console.log(req.body)
  Session.create(req.body, (error, data) => {
    if (error) {return next(error)}

    //add session id to course sessions array
    Course.findByIdAndUpdate(req.body.course, {
      $push: {"sessions": data._id}
    }, (error, data, next) => {
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
sessionRoute.route('/get-session-by-course').post((req, res) => {
  // console.log("Route")
  // console.log(req.body);
  Session.find({course: req.body._id}, (error, sessionData) => {
    if (error) {return next(error)}
    // console.log("SessionData:");
    // console.log(sessionData);
    res.json(sessionData)
  })
})

//get current day sessions by course
sessionRoute.route('/get-current-day-session-by-course').post((req, res) => {
  Session.find({course: req.body._id}, (error, sessionData) => {
    if (error) {return error}

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    today.setHours(0,0,0,0)
    var outData = []

    //check sessions that are current day then add to outData array
    for (var sessions of sessionData) {
      if (sessions.date.toDateString()==today.toDateString()){
        outData.push(sessions)
      }
    }


    res.json(outData)
  })
})


//check in a member to a session
sessionRoute.route('/session-check-in-member').post((req, res) => {
  var msg = new Object();
  //create new attendee
  var newAttendee = {member:req.body.subject, time: new Date()};
  var memberData = {};
  var membershipId;
  var remainingSessions;
  var courseId;
  var sessData = {};

  User.findById(req.body.subject)
    .then(
      //if user is found
      function(memData) {
        memberData = memData;

        //check if ID returned a member. If not return user not found message
        if (memberData.role != "member"){
          console.log('line 137')
          msg.message = "User is not a member! Please scan a member ID!";
          res.json(msg);
          return;
        }

        //check if a member is a member of any course
        if (memberData.courses.length == 0){
          console.log('line 145')
          msg.message = "Member is not registered to any course!";
          res.json(msg);
          return;
        }

        //get course list array
        var courseList = memberData.courses.map((course) => {return course.course})
        //return the open session
        return Session.find({open: true, course: { $in: courseList } });

      },
      //if no user found
      function(err) {
        console.log('line155')
        msg.message = "User not found!";
        res.json(msg);
        return;
      }
    )
    .then(
      //if sessions return data, process more information
      function(sessionData) {

        if(sessionData == undefined){return;}
        sessData = sessionData[0]

        //if no data returned
        if(sessionData.length == 0){
          console.log('line168')
          msg.message = "No are currently no open sessions for the registered courses!";
          res.json(msg);
          return;
        }

        //before anything, check if member has already checked in to this session
        for(var attendee of sessionData[0].attendees){
          if(attendee.member == req.body.subject){
            console.log('line 175')
            msg.message = "Member has already checked in!";
            res.json(msg);
            return;
          }
        }

        //find membershipId
        for (var course of memberData.courses){
          //convert objects to string then return membership ID if matched
          if (String(sessionData[0].course) == String(course.course)){
            membershipId = course.membership
            //get remaining sessions if applicable
            remainingSessions = course.sessions_remaining
            //get course id
            courseId = course.course
          }
        }

        //return membership details
        return Membership.findById(membershipId)
      }
    )
    .then(
      function(membershipData){

        if(membershipData == undefined){ return;}

        if(membershipData.membership_type == 'session'){

          //check that if there are no sessions remaining, return an error msg
          if(remainingSessions == 0) {
            msg.message = "Member has no remaining sessions available in their account!";
            res.json(msg);
            return;
          } else {
            remainingSessions -= 1
          }

          //update sessions remaining for the course registered to the user
          User.findOneAndUpdate({
              "_id": req.body.subject,
              "courses.course": courseId
            }, {
              "$set": {
                  "courses.$.sessions_remaining": remainingSessions
              }
            }, function(err, success) {
              if (err) {return err}
              console.log("sessions remaining: " + remainingSessions)
          })

          //push session to user array of sessions and same with session
          User.findByIdAndUpdate(req.body.subject, {
            $push: {"sessions": sessData._id}
          }, (error) => {
            if (error) {return (error);}

            return Session.findByIdAndUpdate(sessData._id, {
              $push: {"attendees": newAttendee}
            }, (error,sesh) => {
              if (error) {return (error);}
              console.log(memberData.firstname + " has successfully checked in!")
              console.log('line 225')
              res.json(sesh);
              return;
            })
          })

        } else {
          //code for subscription membership

          //push session to user array of sessions and same with session
          User.findByIdAndUpdate(req.body.subject, {
            $push: {"sessions": sessData._id}
          }, (error) => {
            if (error) {return (error);}

            Session.findByIdAndUpdate(sessData._id, {
              $push: {"attendees": newAttendee}
            }, (error,sesh) => {
              if (error) {return (error);}
              console.log(memberData.firstname + " has successfully checked in!")
              console.log('line 270')
              res.json(sesh);
              return;
            })
          })

        }
      }
    )
    .catch(err => {console.log(err)})
})


// close a session-------------------------------------------------------------------------------------------------------
sessionRoute.route('/close-session/:id').put((req, res, next) => {
  Session.findByIdAndUpdate(req.params.id, {
    $set: {"open": false}
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Session closed!')
    }
  })
})


// OLD check in a member to a session------------------------------------------------------------------------------------
sessionRoute.route('/old-session-check-in-member').post((req, res) => {
  var msg = new Object();
  //create new attendee
  var newAttendee = {member:req.body.subject, time: new Date()}

  User.findById(req.body.subject, (error, memberData) => {
    if (error) {
      //if error return user not found
      console.log('line 129')
      msg.message = "User not found!";
      res.json(msg);
      return;
    }

    //check if ID returned a member. If not return user not found message
    if (memberData.role != "member"){
      console.log('line 137')
      msg.message = "User is not a member! Please scan a member ID!";
      res.json(msg);
      return;
    }

    //check if a member is a member of any course
    if (memberData.courses.length == 0){
      console.log('line 145')
      msg.message = "Member is not registered to any course!";
      res.json(msg);
      return;
    }

    //If member is returned, we'll need to check the sessions that are
    //open based on the courses that the member is registered to
    //Iterate through courses array to find the open sessions
    // console.log(memberData.courses)
    for (var course of memberData.courses) {
      Course.findById(course.course, (error, courseData) => {
        if (error) {return error}

        //find all open sessions
        Session.find({open: true}, (error, sessionData) => {
          if (error) {return err}

          if(sessionData.length == 0){
            console.log('line 162')
            msg.message = "There are currently no open sessions!";
            res.json(msg);
            return;
          }

          //find open session that matches the course of the member
          for (var session of sessionData){
            console.log("session:"+session.course)
            console.log("course:"+course.course)
            console.log(session.course==course.course)
            if (String(session.course) == String(course.course)) {
              console.log("entered if statement with: ")
              console.log("session:"+session.course)
              console.log("course:"+course.course)
              //before anything, check if member has already checked in to this session
              for(var attendee of session.attendees){
                if(attendee.member == req.body.subject){
                  console.log('line 175')
                  msg.message = "Member has already checked in!";
                  res.json(msg);
                  return;
                }
              }

              //find out the membership of the member if subscription or session-based
              Membership.findById(course.membership, (error, membershipData) => {
                if (error) {return error}

                //if session membership, we need to check how many sessions remaining on account
                // if 0 or less sessions, return that no sessions remaining
                // if more than 0, subtract one session from account
                if(membershipData.membership_type == 'session'){

                  //check that if there are no sessions remaining, return an error msg
                  if(course.sessions_remaining == 0) {
                    console.log('line 193')
                    msg.message = "Member has no sessions available in their account!";
                    res.json(msg);
                    return;
                  }

                  //calculate for remaining sessions
                  remainingSessions = course.sessions_remaining - 1
                  //update sessions remaining for the course registered to the user
                  User.findOneAndUpdate({
                      "_id": req.body.subject,
                      "courses.course": course.course
                    }, {
                      "$set": {
                          "courses.$.sessions_remaining": remainingSessions
                      }
                    }, function(err, success) {
                      if (err) {return err}
                      console.log("sessions remaining: " + remainingSessions)
                  })

                  //push session to user array of sessions and same with session
                  User.findByIdAndUpdate(req.body.subject, {
                    $push: {"sessions": session._id}
                  }, (error) => {
                    if (error) {return (error);}

                    Session.findByIdAndUpdate(session._id, {
                      $push: {"attendees": newAttendee}
                    }, (error,sesh) => {
                      if (error) {return (error);}
                      console.log(memberData.firstname + " has successfully checked in!")
                      console.log('line 225')
                      res.json(sesh);
                      return;
                    })
                  })

                } else {
                  //code for subscription membership

                  //push session to user array of sessions and same with session
                  User.findByIdAndUpdate(req.body.subject, {
                    $push: {"sessions": session._id}
                  }, (error) => {
                    if (error) {return (error);}

                    Session.findByIdAndUpdate(session._id, {
                      $push: {"attendees": newAttendee}
                    }, (error,sesh) => {
                      if (error) {return (error);}
                      console.log(memberData.firstname + " has successfully checked in!")
                      console.log('line 245')
                      res.json(sesh)
                      return;
                    })
                  })

                }

              })
            }
          }

        })

      })
    }

    //set timeout for when there are open sessions for different courses but not for the member's course
    setTimeout(() => {
      msg.message = "There are no open sessions for the member to check-in to!";
      res.json(msg);
      return;
    }, 1500)

  })
})

module.exports = sessionRoute;
