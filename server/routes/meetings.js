const express = require('express');
const meetingsRouter = express.Router();
const {
  getAllFromDatabase, 
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase
} = require('../db.js');

const { checkId } = require('../middlewares.js');
const checkMeeting = checkId('meetings', 'meeting');

meetingsRouter.get('/', (req, res, next) => {
  res.status(200).send(getAllFromDatabase('meetings'));
})

meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = createMeeting()
  const meetingAdded = addToDatabase('meetings', newMeeting);
  res.status(201).send(meetingAdded)
})

meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send()
})

module.exports = meetingsRouter


