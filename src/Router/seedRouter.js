

const express = require('express');
const { seedUser } = require('../Controller/seedController');
const seedRouter = express.Router();


seedRouter.post("/users",seedUser)

module.exports = seedRouter;