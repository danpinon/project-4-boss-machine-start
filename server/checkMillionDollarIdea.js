const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body
  const totalYield = Number(numWeeks) * Number(weeklyRevenue)
  const isMillionDollarIdea = totalYield >= 1000000

  if (!isMillionDollarIdea || isNaN(totalYield)) {
    res.sendStatus(400)
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
