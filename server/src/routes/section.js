const express = require('express');
const {ExerciseSet} = require("../models/exerciseSet.js");
const sectionRouter = express.Router();

sectionRouter
    .get('/:chosen', async (req, res) => {
        const exerciseSets = await ExerciseSet.findBySection(req.params.chosen);
        res.json(exerciseSets);
    })

module.exports = {
    sectionRouter,
}