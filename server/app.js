const express = require('express');
const {sectionRouter} = require("./src/routes/section");
const {exerciseRouter} = require("./src/routes/exercise");

const app = express();

app.use(sectionRouter);
app.use(exerciseRouter);

app.listen(5000, 'localhost', () => {
    console.log('Server listening on port http://localhost:5000');
})



