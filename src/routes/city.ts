import express, { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import mongoose, { Schema } from 'mongoose';

const router = express.Router();

interface IQuery {
    q: String,
    latitude: number,
    longitude: number,
    radius: number,
    sort: number,
}

const CitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    }
});

CitySchema.index({ location: '2dsphere' });

const CityModel = mongoose.model('cities', CitySchema);

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
    // CityModel
    //     .aggregate()
    //     .near({
    //         near: [longitude, latitude],
    //         distanceField: 'distance',
    //         query: { name: { $regex: `^${q}`, $options: 'i' } },
    //     })
    //     .then((cities) => res.json({ suggestions: cities }))
    //     .catch((error) => res.status(500).json({ error }));
    CityModel
        .find({
            name: new RegExp(`^${q}`, 'i'),
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius,
                },
            },
        })
        .select('name location distance')
        .then((cities) => res.json({ suggestions: cities }))
        .catch((error) => res.status(500).json({ error }));
});

export { router as cityRouter };