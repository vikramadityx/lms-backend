const jwt = require('jsonwebtoken');
const Institute = require('../models/institute');

const verifyInstitute = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, 'HELLO'); // Verify the access token using your secret key
        const institute = await Institute.findById(decoded.instituteId);
        if (!institute) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }
        req.institute = institute;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized access' });
    }
};

module.exports = { verifyInstitute };