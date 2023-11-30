const express = require('express');
const {section} = require("./config/db");

const app = express();
app.get('/section/:chosen', async (req, res) => {
    const chosenSection = req.params;
    // const sections = await section.find();
    // console.log(await sections.toArray());
    res.send("Backend side");
    console.log('Section: ', chosenSection);
})

app.listen(5000, 'localhost', () => {
    console.log('Server listening on port http://localhost:5000');
})



