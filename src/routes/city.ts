import express, { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import { db } from '../utils/mongoUtils';

const router = express.Router();

interface IQuery {
    q: String,
    latitude: number,
    longitude: number,
    radius: number,
    sort: number,
}

const queryStringValidators = [
    query('q').isString().isLength({ min: 1 }),
    query('latitude').isFloat({ min: -90, max: 90 }),
    query('longitude').isFloat({ min: -180, max: 180 }),
    query('radius').isNumeric(),
    query('sort').optional().isIn(['name', 'distance']),
];

router.get('/suggestions', queryStringValidators, (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { q, longitude, latitude, radius, sort } = req.query as unknown as IQuery;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    db.collection('cities')
        .aggregate([{
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [Number(longitude), Number(latitude)],
                },
                maxDistance: Number(radius),
                distanceField: "distance",
                "distanceMultiplier": 0.001,
                spherical: true,
                query: {
                    name: {
                        $regex: `^${q}`,
                        $options: 'i',
                    },
                },
            }
        }])
        .sort({ [`${sort}`]: 1 })
        .toArray()
        .then((cities) => res.json({ suggestions: cities }))
        .catch((error) => res.status(500).json({ error }));
});

export { router as cityRouter };