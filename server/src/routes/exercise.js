const express = require('express');
const {Exercise} = require("../models/exercise");
const exerciseRouter = express.Router();

exerciseRouter
    .get('/exercise/:chosen', async (req, res) => {
        const exercise = await Exercise.findBySet(req.params.chosen);
        res.json(exercise);
    })

module.exports = {
    exerciseRouter,
}