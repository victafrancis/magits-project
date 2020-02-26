let Log = require('./model/Logs')

//function to create a new log
const newLog = (event, user_id=undefined) => {
  var date = new Date()
  var logContent = event
  var body = {user: user_id, log: logContent}

  Log.create(body, function (err, data) {
    if (err) return handleError(err);

    console.log("Successfully logged event! Log ID:" + data._id)
    return
  });
}

exports.newLog = newLog

