const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:uuid', userController.getUserByUUID);
router.post('/', userController.createUser);
router.put('/:uuid', userController.updateUser);
router.delete('/:uuid', userController.deleteUser);

module.exports = router;
