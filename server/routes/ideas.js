const express = require('express');
const ideasRouter = express.Router();
const {
  getAllFromDatabase, 
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('../db.js');

const checkMillionDollarIdea = require('../checkMillionDollarIdea.js')

const { checkId } = require('../middlewares.js');
const checkIdea = checkId('ideas', 'idea');

ideasRouter.param('ideaId', checkIdea);

ideasRouter.get('/', (req, res, next) => {
  const allideas = getAllFromDatabase('ideas');
  
  res.status(200).send(allideas);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const { name, description, numWeeks, weeklyRevenue } = req.body

  const minion = addToDatabase('ideas', {
    name,
    description,
    numWeeks: Number(numWeeks),
    weeklyRevenue: Number(weeklyRevenue),
  });
  
  res.status(201).send(minion);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.status(200).send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  if (req.idea) {
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    const id = req.idea.id

    const updatedMinion = updateInstanceInDatabase('ideas', {
      id,
      name,
      description,
      numWeeks: Number(numWeeks),
      weeklyRevenue: Number(weeklyRevenue),
    })
    res.status(200).send(updatedMinion);
  }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  if (req.idea) {
    const id = req.idea.id

    deleteFromDatabasebyId('ideas', id)
    res.status(204).send();
  }
});

module.exports = ideasRouter;
