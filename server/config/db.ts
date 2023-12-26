import {Collection, Db, MongoClient, Document} from 'mongodb';

export const client: MongoClient = new MongoClient('mongodb://127.0.0.1:27017/');

export const db: Db = client.db('easy-peasy-db');
export const section: Collection<Document> = db.collection('section');
export const exerciseSet: Collection<Document>  = db.collection('exercise_set');
export const exercise: Collection<Document>  = db.collection('exercise');
export const cheatsheet: Collection<Document>  = db.collection('cheatsheet');
export const reading: Collection<Document>  = db.collection('reading');