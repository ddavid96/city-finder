import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/suggestion', [], (req: Request, res: Response) => {
    return res.send('test response');
});

export { router as suggestionRouter };