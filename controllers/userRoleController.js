const UserRole = require('../models/userRole');

// Create a new user role
const createUserRole = async (req, res) => {
    try {
        const { roleName, permissions } = req.body;
        const newUserRole = new UserRole({ roleName, permissions });
        await newUserRole.save();
        res.status(201).json({ message: 'User role created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUserRoles = async (req, res) => {
    try {
        const userRoles = await UserRole.find();
        res.status(200).json(userRoles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const userRole = await UserRole.findById(id);
        if (!userRole) {
            return res.status(404).json({ error: 'User role not found' });
        }
        res.status(200).json(userRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { roleName, permissions } = req.body;
        const updatedUserRole = await UserRole.findByIdAndUpdate(id, { roleName, permissions }, { new: true });
        if (!updatedUserRole) {
            return res.status(404).json({ error: 'User role not found' });
        }
        res.status(200).json({ message: 'User role updated successfully', userRole: updatedUserRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUserRole = await UserRole.findByIdAndDelete(id);
        if (!deletedUserRole) {
            return res.status(404).json({ error: 'User role not found' });
        }
        res.status(200).json({ message: 'User role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUserRole,
    getAllUserRoles,
    getUserRoleById,
    updateUserRole,
    deleteUserRole
};
