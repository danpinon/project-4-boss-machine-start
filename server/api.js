const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./routes/minions.js');
const ideasRouter = require('./routes/ideas.js');
const meetingsRouter = require('./routes/meetings.js');

apiRouter.use('/minions', minionsRouter)
apiRouter.use('/ideas', ideasRouter)
apiRouter.use('/meetings', meetingsRouter)

module.exports = apiRouter;
