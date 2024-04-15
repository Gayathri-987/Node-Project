'use strict';
const express = require('express');
const { User, Post, Expenses } = require('./models');

const app = express();

app.use(express.json());

// Registration
app.post('/register', async (req, res) => {
    const { username, email, role, password } = req.body;

    try {
        const user = await User.create({ username, email, role, passwordHash: password });

        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password.trim() === user.passwordHash) {
            return res.json({ message: 'Login successful', userId: user.uuid });
        } else {
            return res.status(401).json({ error: 'Invalid password' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Delete user by UUID
app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({ where: { uuid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        return res.json({ message: 'User deleted!' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Update user by UUID
app.put('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const { username, email, role } = req.body;
    try {
        const user = await User.findOne({ where: { uuid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.username = username;
        user.email = email;
        user.role = role;
        await user.save();
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Fetch user by UUID
app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({ where: { uuid } });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Create an expense
app.post('/expenses', async (req, res) => {
    const { uuid, category, amount, date } = req.body;
    if (!uuid || !category || !amount || !date) {
        return res.status(400).json({ error: 'All mandatory fields (uuid, category, amount, date) must be provided' });
    }
    try {
        const expense = await Expenses.create({ uuid, category, amount, date });
        return res.json(expense);
    } catch (error) {
        console.error('Error creating expense:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Fetch expenses by UUID
app.get('/expenses/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const expenses = await Expenses.findAll({ where: { uuid } });
        return res.json(expenses);
    } catch (err) {
        console.error('Error fetching expenses:', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Delete all expenses
app.delete('/expenses', async (req, res) => {
    try {
        await Expenses.destroy({ where: {}, truncate: true });
        return res.json({ message: 'All Expenses deleted!' });
    } catch (err) {
        console.error('Error deleting expenses:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Additional routes for managing notes (if needed)

const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
