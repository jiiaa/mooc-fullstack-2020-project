const staticRouter = require('express').Router();
const path = require('path');

staticRouter.get('', async (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = staticRouter;
