const express = require('express');
const { registerCompany, loginCompany, registerStudent, loginStudent } = require('../controllers/authController');
const router = express.Router();

router.post('/company/register', registerCompany);
router.post('/company/login', loginCompany);
router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);

module.exports = router;