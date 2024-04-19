// util/mongodb.js

import { MongoClient } from 'mongodb';

const connectionString = 'your_mongodb_connection_string';

let client;
let db;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db();
    }
    return { db, client };
}

export { connectToDatabase };
