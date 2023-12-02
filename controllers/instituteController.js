const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Institute = require('../models/institute');

// Register a new institute
const registerInstitute = async (req, res) => {
    try {
        const { name, email, password, image } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newInstitute = new Institute({ name, email, password: hashedPassword, image });
        await newInstitute.save();
        res.status(201).json({ message: 'Institute registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login an institute
const loginInstitute = async (req, res) => {
    try {
        const { email, password } = req.body;
        const institute = await Institute.findOne({ email });
        if (!institute) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, institute.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ instituteId: institute._id }, "HELLO", {
            expiresIn: '1h' // Token expiration time
        });

        res.status(200).json({ token, message: "Successfully Login" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get institute by ID
const getInstituteById = async (req, res) => {
    try {
        const { id } = req.params;
        const institute = await Institute.findById(id);
        if (!institute) {
            return res.status(404).json({ error: 'Institute not found' });
        }
        res.status(200).json(institute);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update institute by ID
const updateInstitute = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, image } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedInstitute = await Institute.findByIdAndUpdate(
            id,
            { name, email, password: hashedPassword, image },
            { new: true }
        );
        if (!updatedInstitute) {
            return res.status(404).json({ error: 'Institute not found' });
        }
        res.status(200).json({ message: 'Institute updated successfully', institute: updatedInstitute });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete institute by ID
const deleteInstitute = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInstitute = await Institute.findByIdAndDelete(id);
        if (!deletedInstitute) {
            return res.status(404).json({ error: 'Institute not found' });
        }
        res.status(200).json({ message: 'Institute deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerInstitute,
    loginInstitute,
    getInstituteById,
    updateInstitute,
    deleteInstitute
};
