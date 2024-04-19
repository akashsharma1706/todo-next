// pages/api/todos/index.js

import { connectToDatabase } from '../../../util/mongodb';

export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    if (req.method === 'GET') {
        const todos = await db.collection('todos').find({}).toArray();
        res.status(200).json(todos);
    } else if (req.method === 'POST') {
        const { text } = req.body;
        await db.collection('todos').insertOne({ text });
        res.status(201).send('Todo created successfully');
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
