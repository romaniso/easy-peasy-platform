const express = require('express');
const {section, exerciseSet} = require("./config/db");

const app = express();
app.get('/section/:chosen', async (req, res) => {
    const chosenSection = req.params.chosen;
    // I need to create a model object here according to active record pattern
    const sectionId = (await section.findOne({name: chosenSection}))._id;
    const exerciseSets = await (await exerciseSet.find({sectionId})).toArray();

    console.log(exerciseSets);

    res.json(exerciseSets);
    console.log('Section: ', chosenSection);
})

app.listen(5000, 'localhost', () => {
    console.log('Server listening on port http://localhost:5000');
})



