// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Student, Company, Admin } = require('../models');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'supersecret';

const registerUser = (Model, role) => async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Model.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: `${role} registered successfully` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = (Model, role) => async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Model.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role }, SECRET, { expiresIn: '1d' });
        res.json({ token, [`${role}Id`]: user.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.post('/student/register', registerUser(Student, 'student'));
router.post('/student/login', loginUser(Student, 'student'));

router.post('/company/register', registerUser(Company, 'company'));
router.post('/company/login', loginUser(Company, 'company'));

router.post('/admin/register', registerUser(Admin, 'admin'));
router.post('/admin/login', loginUser(Admin, 'admin'));

module.exports = router;