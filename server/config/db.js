const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017/');

const db = client.db('easy-peasy-db');
const section = db.collection('section');
const exerciseSet = db.collection('exercise_set');
const exercise = db.collection('exercise');
const cheatsheet = db.collection('cheatsheet');

module.exports = {
    db,
    client,
    section,
    exerciseSet,
    exercise,
    cheatsheet,
};