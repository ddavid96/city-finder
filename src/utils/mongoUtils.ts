import { Db, MongoClient } from 'mongodb';

let client: MongoClient;
let db: Db;

const connect = () => {
    client = new MongoClient('mongodb://database:27017');
    client.connect().then(() => {
        client.db('test').collection('cities').createIndex({ location: '2dsphere' });
        db = client.db('test');
        console.log('Connected to database');
    });
};

export {
    connect,
    client,
    db
}