const { Post } = require('../models');

const postController = {
    async getAllPosts(req, res) {
        try {
            const posts = await Post.findAll();
            return res.json(posts);
        } catch (err) {
            console.error('Error fetching all posts:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async getPostByUUID(req, res) {
        const uuid = req.params.uuid;
        try {
            const post = await Post.findOne({ where: { uuid } });
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            return res.json(post);
        } catch (err) {
            console.error('Error fetching post by UUID:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async createPost(req, res) {
        const { title, body, userId } = req.body;
        try {
            const post = await Post.create({ title, body, userId });
            return res.json(post);
        } catch (err) {
            console.error('Error creating post:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async updatePost(req, res) {
        const uuid = req.params.uuid;
        const { title, body } = req.body;
        try {
            let post = await Post.findOne({ where: { uuid } });
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            post.title = title;
            post.body = body;
            await post.save();
            return res.json(post);
        } catch (err) {
            console.error('Error updating post:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async deletePost(req, res) {
        const uuid = req.params.uuid;
        try {
            const post = await Post.findOne({ where: { uuid } });
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            await post.destroy();
            return res.json({ message: 'Post deleted!' });
        } catch (err) {
            console.error('Error deleting post:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = postController;
