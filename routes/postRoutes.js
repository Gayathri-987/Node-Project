const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:uuid', postController.getPostByUUID);
router.post('/', postController.createPost);
router.put('/:uuid', postController.updatePost);
router.delete('/:uuid', postController.deletePost);

module.exports = router;
