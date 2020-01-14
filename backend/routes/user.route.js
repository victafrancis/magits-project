const express = require('express');
const app = express();
const userRoute = express.Router();
const jwt = require('jsonwebtoken');

// user model
let User = require('../model/User');


//register a User
userRoute.route('/register').post((req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      console.log(error);
    } 
  });
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

// Get single user
userRoute.route('/read-user/:id').get((req, res) => {
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
      console.log(error)
    } else {
      res.json(data)
      console.log('User successfully updated!')
    }
  })
})

// Delete user
userRoute.route('/delete-user/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRoute;
