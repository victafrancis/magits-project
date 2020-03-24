let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port
const courseRoute = require('../backend/routes/course.route')
const userRoute = require('../backend/routes/user.route')
const announcementRoute = require('../backend/routes/announcement.route')
const feedbackRoute = require('../backend/routes/feedback.route')
const scheduleRoute = require('../backend/routes/schedule.route')
const sessionRoute = require('../backend/routes/session.route')
const membershipRoute = require('../backend/routes/membership.route')
const logRoute = require('../backend/routes/logs.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/angular8-meanstack-angular-material')));
app.use('/', express.static(path.join(__dirname, 'dist/angular8-meanstack-angular-material')));
app.use('/course', courseRoute)
app.use('/user', userRoute)
app.use('/announcement', announcementRoute)
app.use('/feedback', feedbackRoute)
app.use('/schedule', scheduleRoute)
app.use('/session', sessionRoute)
app.use('/membership', membershipRoute)
app.use('/logs', logRoute)


// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
