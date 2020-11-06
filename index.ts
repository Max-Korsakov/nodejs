import express from 'express';
//import * as cors from "cors";
import bodyParser from 'body-parser'
import {userRouter} from './routes/user-routes.js';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//app.use(cors());

app.use('/api/users', userRouter);

app.listen(3000, function () {
console.log('App is listening on port 3000!');
});