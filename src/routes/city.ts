import express, { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';

const router = express.Router();

const queryStringValidators = [
    query('q').isLength({min: 1}),
    query('latitude').optional().isFloat(),
    query('longitude').optional().isFloat(),
    query('radius').optional().isInt({min: 0}),
    query('sort').optional().isIn(['name', 'distance']),
];

router.get('/suggestions', queryStringValidators, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    return res.json({suggestions: ['Paris', 'London', 'New York']});
});

export { router as cityRouter };