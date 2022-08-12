import { MongoClient } from 'mongodb';

const USERNAME = process.env.USERNAME;

const PASSWORD = process.env.PASSWORD;

const DATABASE = process.env.DATABASE;

const CLUSTER = process.env.CLUSTER;

const url = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.tyk3d.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

export async function connect() {
    return await MongoClient.connect(url);
}

export async function insert(client, collection, document) {
    await client.db().collection(collection).insertOne(document);
}

export async function find(client, collection, filter = {}, sort = { _id: 1 }) {
    return await client.db().collection(collection).find(filter).sort(sort).toArray();
}

export async function update(client, collection, document, updated) {
    return await client.db().collection(collection).updateOne({ _id: document._id }, { $set: updated });
}

export async function _delete(client, collection, document) {
    return await client.db().collection(collection).deleteOne({ _id: document._id });
}
