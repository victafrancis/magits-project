//this is our api.js
const express = require('express');
const app = express();
const membershipRoute = express.Router();

// membership model
let Membership = require('../model/Membership');
//User model
let User = require('../model/User');


// Add Membership
membershipRoute.route('/add-membership').post((req, res, next) => {
  Membership.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
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

// add member to a membership
membershipRoute.route('/register-user-to-membership/:id').put((req, res, next) => {
  console.log("req user_id: "+req.body.user_id);

  //find membership and push member id to Membership members array
  membership.findByIdAndUpdate(req.params.id, {
    $push: {"members": req.body.user_id}
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {

      //find user and push membership ID to user memberships array
      User.findByIdAndUpdate(req.body.user_id, {
        $push: {"memberships": req.params.id}
      }, (error, data) => {
        if (error) {
          return next(error);
          console.log(error)
        } else {
          console.log('Membership added to member!')
        }
      })

      res.json(data)
      console.log('Member successfully enrolled!')
    }
  })
})

// Delete membership
membershipRoute.route('/delete-membership/:id').delete((req, res, next) => {
  Membership.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = membershipRoute;
