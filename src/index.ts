import express from 'express';
import { json } from 'body-parser';
import { suggestionRouter } from './routes/city';

const app = express();
app.use(json());
app.use(suggestionRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});