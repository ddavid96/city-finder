import express from 'express';
import { json } from 'body-parser';
import { cityRouter } from './routes/city';
import { connect } from './utils/mongoUtils';
import rateLimit from 'express-rate-limit'

const app = express();


const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 5,
    standardHeaders: true,
})

app.use(json());
app.use(limiter);
app.use(cityRouter);

connect();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});