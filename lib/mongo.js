const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.DbUser);
const PASSWORD = encodeURIComponent(config.DbPassword);
const DB_NAME = encodeURIComponent(config.DbName);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.DbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
        this.dbName = DB_NAME;
    }

    async connect() {
        if(!this.db) {
            await new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    this.db = this.client.db(this.dbName);
                    console.log("connected");
                    resolve(true)
                });
            });
        }
        return this.db;
    }

    getAll(collection, query){
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        })
    }

    get(collection, id){
        return this.connect().then(db => {
            return db.collection(collection).findOne({_id:ObjectId(id)});
        })
    }

    create(collection, data){
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    update(collection, id, data){
        return this.connect().then(db => {
            return db.collection(collection).updateOne({__id: ObjectId(id)}, {$set: data}, { upsert: true});
        }).then(result => result.upsertedId || id);
    }

    delete(collection, id){
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ __id: ObjectId(id)});
        }).then(() => id );
    }
}

module.exports = MongoLib;