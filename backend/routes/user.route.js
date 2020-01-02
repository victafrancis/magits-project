const express = require('express');
const app = express();
const userRoute = express.Router();

// user model
let User = require('../model/User');


//register a User
userRoute.route('/register').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
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




module.exports = userRoute;