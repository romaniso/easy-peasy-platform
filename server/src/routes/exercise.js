const express = require('express');
const {Exercise} = require("../models/exercise.ts");
const {Cheatsheet} = require("../models/cheatsheet.ts");
const {Reading} = require("../models/reading.ts");
const exerciseRouter = express.Router();

exerciseRouter
    .get('/:chosen', async (req, res) => {
        const exercises = await Exercise.findBySet(req.params.chosen);
        const cheatsheet = await Cheatsheet.findBySetName(req.params.chosen);
        const reading = await Reading.findBySet(req.params.chosen);
        res.json({exercises, cheatsheet, reading});
    })

module.exports = {
    exerciseRouter,
}