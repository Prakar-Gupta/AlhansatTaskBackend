const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

// Create a new task
router.post('/', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO tasks (name) VALUES (?)';
    db.query(query, [name], (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ id: results.insertId, name });
        }
    });
});

// Update a task by ID
router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const { name, status } = req.body;
    const query = 'UPDATE tasks SET name = ?, status = ? WHERE id = ?';
    db.query(query, [name, status, taskId], (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else if (results.affectedRows === 0) {
            res.status(404).json('Task not found');
        } else {
            res.json({ id: taskId, name, status });
        }
    });
});

// Delete a task by ID
router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [taskId], (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else if (results.affectedRows === 0) {
            res.status(404).json('Task not found');
        } else {
            res.json('Task deleted successfully');
        }
    });
});

module.exports = router;
