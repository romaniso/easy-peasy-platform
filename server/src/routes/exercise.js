const express = require('express');
const {Exercise} = require("../models/exercise.js");
const {Cheatsheet} = require("../models/cheatsheet.js");
const {Reading} = require("../models/reading.js");
const exerciseRouter = express.Router();

exerciseRouter
    .get('/:chosen', async (req, res) => {
        const exercises = await Exercise.findBySet(req.params.chosen);
        const cheatsheet = await Cheatsheet.findBySet(req.params.chosen);
        const reading = await Reading.findBySet(req.params.chosen);
        res.json({exercises, cheatsheet, reading});
    })

module.exports = {
    exerciseRouter,
}