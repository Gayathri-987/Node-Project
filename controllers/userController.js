const { User } = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (err) {
            console.error('Error fetching all users:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async getUserByUUID(req, res) {
        const uuid = req.params.uuid;
        try {
            const user = await User.findOne({ where: { uuid } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(user);
        } catch (err) {
            console.error('Error fetching user by UUID:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async createUser(req, res) {
        const { username, email, role, password } = req.body;
        try {
            const user = await User.create({ username, email, role, passwordHash: password });
            return res.json(user);
        } catch (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async updateUser(req, res) {
        const uuid = req.params.uuid;
        const { username, email, role } = req.body;
        try {
            let user = await User.findOne({ where: { uuid } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            user.username = username;
            user.email = email;
            user.role = role;
            await user.save();
            return res.json(user);
        } catch (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async deleteUser(req, res) {
        const uuid = req.params.uuid;
        try {
            const user = await User.findOne({ where: { uuid } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.destroy();
            return res.json({ message: 'User deleted!' });
        } catch (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = userController;
