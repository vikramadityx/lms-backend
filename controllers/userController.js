const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserRole = require('../models/userRole')

const registerUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // const existingRole = await UserRole.findById(role);
        // console.log(existingRole, "asd")
        // if (!existingRole) {
        //     return res.status(400).json({ error: 'Invalid role' });
        // }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: 0, error: 'Invalid credentials' });
        } else {
            return res.status(200).json({ success: 1, message: "Successfully Login", role: user.role });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const registerUsersInBulk = async (req, res) => {
    try {
        const { emailList } = req.body;

        // Check if the email list is provided
        if (!emailList || !Array.isArray(emailList) || emailList.length === 0) {
            return res.status(400).json({ error: 'Invalid email list' });
        }

        // Find the student role by roleName 'Student'
        const studentRole = await UserRole.findOne({ roleName: 'Student' });

        if (!studentRole) {
            return res.status(400).json({ error: 'Student role not found' });
        }

        const hashedPasswords = await Promise.all(emailList.map(async (email) => {
            const hashedPassword = await bcrypt.hash(email, 10);
            return hashedPassword;
        }));
        const users = emailList.map((email, i) => ({
            email,
            password: hashedPasswords[i],
            role: studentRole._id
        }));

        console.log(users)

        await User.insertMany(users);

        res.status(201).json({ message: 'Users registered successfully with the role "Student"' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid current password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
    registerUsersInBulk,
    updatePassword
};
