const express = require('express');
const minionsRouter = express.Router();
const {
  getAllFromDatabase, 
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getFromDatabaseById,
} = require('../db.js');

const { checkId } = require('../middlewares.js');
const checkMinion = checkId('minions', 'minion');

minionsRouter.param('minionId', checkMinion);

minionsRouter.get('/', (req, res, next) => {
  const allMinions = getAllFromDatabase('minions');
  
  res.status(200).send(allMinions);
});

minionsRouter.post('/', (req, res, next) => {
  const { name, title, salary, weaknesses } = req.body

  const minion = addToDatabase('minions', {
    name,
    title,
    salary: Number(salary),
    weaknesses,
  });
  
  res.status(201).send(minion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.status(200).send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  if (req.minion) {
    const { name, title, salary, weaknesses } = req.body;
    const id = req.minion.id

    const updatedMinion = updateInstanceInDatabase('minions', {
      id,
      name,
      title,
      salary: Number(salary),
      weaknesses,
    })
    res.status(200).send(updatedMinion);
  }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  if (req.minion) {
    const id = req.minion.id

    deleteFromDatabasebyId('minions', id)
    res.status(204).send();
  }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
  const work = getAllFromDatabase('work').filter((singleWork) => {
    return singleWork.minionId === req.minion.id;
  });
  res.send(work);
})

minionsRouter.post('/:minionId/work', (req, res, next) => {
  const { title, description, hours } = req.body
  const newWork = addToDatabase('work', {
    title,
    description,
    hours: Number(hours),
    minionId: req.minion.id
  })
  res.status(201).send(newWork);
})

const checkWork = checkId('work', 'work');

minionsRouter.param('workId', checkWork);

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.work.id !== req.body.minionId) {
    res.status(400).send();
  } else {
    const workToUpdate = req.body
  
    const updatedWork = updateInstanceInDatabase('work', workToUpdate)
    res.status(201).send(updatedWork);
  }
})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    if (req.work) { 
      deleteFromDatabasebyId('work', req.work.id)
      res.status(204).send()
    } else {
      res.status(500).send()
    }
  })
module.exports = minionsRouter;
