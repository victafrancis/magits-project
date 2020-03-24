const express = require('express');
const app = express();
const logRoute = express.Router();

// Model
let Log = require('../model/Logs');

// get all logs
logRoute.route('/get-logs').get((req, res, next) => {
    Log.find((error, data) => {
        if(error){
            return next(error)
        }else{
            return res.json(data);
        }
    });
});

module.exports = logRoute;