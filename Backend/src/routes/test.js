const express = require('express')
const router = express.Router()
const db = require('../db.js')

const COLLECTION = 'tests'

// Get all
router.get('/', async (req, res) => {
    try {
        const database = await db.connect2db();
        const tests = await database.collection(COLLECTION).find({}).toArray();
        res.json(tests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Get one 
router.get('/:id', async (req, res) => {
    try {
        const database = await db.connect2db();
        const test = await database.collection(COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
        if (!test) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(test);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Create one
router.post('/', async (req, res) => {
    try {
        const database = await db.connect2db();
        const result = await database.collection(COLLECTION).insertOne(req.body);
        res.status(201).json({ success: true, id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Update one
router.patch('/:id', async (req, res) => {
    try {
        const database = await db.connect2db();
        const result = await database.collection(COLLECTION).updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json({ success: true, modified: result.modifiedCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Delete one
router.delete('/:id', async (req, res) => {
    try {
        const database = await db.connect2db();
        const result = await database.collection(COLLECTION).deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json({ success: true, deleted: result.deletedCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router