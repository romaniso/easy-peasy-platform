const express = require('express');
const {section, exerciseSet} = require("./config/db");
const {sectionRouter} = require("./src/routes/section");

const app = express();

app.use(sectionRouter);

app.listen(5000, 'localhost', () => {
    console.log('Server listening on port http://localhost:5000');
})



