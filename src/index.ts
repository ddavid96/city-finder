import express from 'express';
import { json } from 'body-parser';
import { cityRouter } from './routes/city';
import mongoose from 'mongoose';

const app = express();
app.use(json());
app.use(cityRouter);

mongoose.connect('mongodb://database:27017')
    .then(() => { console.log("Connected to database"); })
    .catch((error) => console.error("Error while trying to connect to database: ", error));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});