'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const expensesRoutes = require('./routes/expensesRoutes');

const app = express();

app.use(express.json());

// Use routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/expenses', expensesRoutes);

const port = process.env.PORT || 5002;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
