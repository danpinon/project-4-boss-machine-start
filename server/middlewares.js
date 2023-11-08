const { getFromDatabaseById } = require('./db.js');

const checkId = (modelType, reqName, status = 404) => (req, res, next, id) => {
  const modelId = getFromDatabaseById(modelType, id);

  if (modelId) {
    req[reqName] = modelId;
    next()
  } else {
    res.status(status).send('incorrect id')
  }
}

module.exports = {
  checkId
} 