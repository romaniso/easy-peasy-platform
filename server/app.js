const express = require('express');
const {section} = require("./config/db");

const app = express();
app.get('/', async (req, res) => {
    // const sections = await section.find();
    // console.log(await sections.toArray());
    res.send("Backend side");
})

app.listen(5000, 'localhost', () => {
    console.log('Server listening on port http://localhost:5000');
})



