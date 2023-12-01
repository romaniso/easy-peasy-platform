const express = require('express');
const {Exercise} = require("../models/exercise");
const exerciseRouter = express.Router();

exerciseRouter
    .get('/exercise/:chosen', async (req, res) => {
        const exercises = await Exercise.findBySet(req.params.chosen);
        res.json(exercises);
    })

module.exports = {
    exerciseRouter,
}