const { Expenses } = require('../models');

const expensesController = {
    async getAllExpenses(req, res) {
        try {
            const expenses = await Expenses.findAll();
            return res.json(expenses);
        } catch (err) {
            console.error('Error fetching all expenses:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async getExpenseByUUID(req, res) {
        const uuid = req.params.uuid;
        try {
            const expense = await Expenses.findOne({ where: { uuid } });
            if (!expense) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            return res.json(expense);
        } catch (err) {
            console.error('Error fetching expense by UUID:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async createExpense(req, res) {
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
    },

    async updateExpense(req, res) {
        const uuid = req.params.uuid;
        const { category, amount, date } = req.body;
        try {
            let expense = await Expenses.findOne({ where: { uuid } });
            if (!expense) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            expense.category = category;
            expense.amount = amount;
            expense.date = date;
            await expense.save();
            return res.json(expense);
        } catch (err) {
            console.error('Error updating expense:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async deleteExpense(req, res) {
        const uuid = req.params.uuid;
        try {
            const expense = await Expenses.findOne({ where: { uuid } });
            if (!expense) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            await expense.destroy();
            return res.json({ message: 'Expense deleted!' });
        } catch (err) {
            console.error('Error deleting expense:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = expensesController;
