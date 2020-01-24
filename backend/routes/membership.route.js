//this is our api.js
const express = require('express');
const app = express();
const membershipRoute = express.Router();

// models
let Membership = require('../model/Membership');
let User = require('../model/User');
let Course = require('../model/Course');


// Add Membership, id is the course id where we want to add the membership
membershipRoute.route('/add-membership/:id').post((req, res, next) => {

  var newMem = req.body;
  newMem.course = req.params.id;

  Course.findById(req.params.id, (error, courseData) => {
    if (error) { return next(error) }

    //if there are no current subscription membership
    if(courseData.subscription_membership == null && newMem.membership_type == "subscription"){
      Membership.create(newMem, (error, memData) => {
        if (error) { return next(error) }

        courseData.subscription_membership = memData._id;
        courseData.save();
      })
    }

    //if there are no current session membership
    if(courseData.session_membership == null && newMem.membership_type == "session"){
      Membership.create(newMem, (error, memData) => {
        if (error) { return next(error) }

        courseData.session_membership = memData._id;
        courseData.save();
      })
    }
    res.json(courseData)
  })


});

// Get all membership
membershipRoute.route('/').get((req, res) => {
  Membership.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single membership
membershipRoute.route('/read-membership/:id').get((req, res) => {
  Membership.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get members of membership
membershipRoute.route('/membership-members/:id').get((req, res) => {
  Membership.findById(req.params.id).populate('members').exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data.members)
    }
  })
})

// Update membership
membershipRoute.route('/update/:id').put((req, res, next) => {
  console.log(req.body);

  Membership.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Membership successfully updated!')
    }
  })
})

// // add member to a membership
// membershipRoute.route('/register-user-to-membership/:id').put((req, res, next) => {
//   console.log("req user_id: "+req.body.user_id);

//   //find membership and push member id to Membership members array
//   membership.findByIdAndUpdate(req.params.id, {
//     $push: {"members": req.body.user_id}
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {

//       //find user and push membership ID to user memberships array
//       User.findByIdAndUpdate(req.body.user_id, {
//         $push: {"memberships": req.params.id}
//       }, (error, data) => {
//         if (error) {
//           return next(error);
//           console.log(error)
//         } else {
//           console.log('Membership added to member!')
//         }
//       })

//       res.json(data)
//       console.log('Member successfully enrolled!')
//     }
//   })
// })

// Delete membership
membershipRoute.route('/delete-membership/:id').delete((req, res, next) => {
  //find membership id and delete
  Membership.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {return next(error);}

    //delete the membership type associated to the course
    if (data.membership_type == "session") {
      //find course ID attached to membership and delete from there
      Course.findByIdAndUpdate(data.course, {
        $unset: { "session_membership" : "" }
      }, (error, data) => {
        if (error) {
          console.log(error);
          return next(error);
        }
      })
    }
    if (data.membership_type == "subscription") {
      //find course ID attached to membership and delete from there
      Course.findByIdAndUpdate(data.course, {
        $unset: { "subscription_membership" : "" }
      }, (error, data) => {
        if (error) {
          console.log(error);
          return next(error);
        }
      })
    }

    res.status(200).json({
      msg: data
    })
  })
})

module.exports = membershipRoute;
