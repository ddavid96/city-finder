import express from 'express';
import { json } from 'body-parser';
import { cityRouter } from './routes/city';
import { connect } from './utils/mongoUtils';

const app = express();
app.use(json());
app.use(cityRouter);

connect();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});