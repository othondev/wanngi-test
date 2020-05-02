require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');

const jsonParser = bodyParser.json();
const { init:initDb } = require('./database/init')
const usersRouter = require('./routes/usersRoute');
const taskRouter = require('./routes/tasksRoute');
const passportMiddleware = require('./middleware/passport')

initDb()
const app = express();

app.use(logger('dev'));
app.use(jsonParser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passportMiddleware.initialize());
app.use(passportMiddleware.session());
app.use(express.static('/usr/local/var/www/html/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use('/users', usersRouter);
app.use('/tasks', taskRouter);

app.use((err, req, res, next)=> {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app;
