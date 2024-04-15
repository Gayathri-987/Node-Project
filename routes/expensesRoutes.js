const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

router.get('/', expensesController.getAllExpenses);
router.get('/:uuid', expensesController.getExpenseByUUID);
router.post('/', expensesController.createExpense);
router.put('/:uuid', expensesController.updateExpense);
router.delete('/:uuid', expensesController.deleteExpense);

module.exports = router;
