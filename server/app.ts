import * as express from 'express';
const cors = require('cors');
import {sectionRouter} from "./src/routes/section";
import {exerciseRouter} from "./src/routes/exercise";

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));

app.use('/section', sectionRouter);
app.use('/exercise', exerciseRouter);

app.listen(5000, 'localhost', () => {
    console.log('Server listening on port http://localhost:5000');
})



