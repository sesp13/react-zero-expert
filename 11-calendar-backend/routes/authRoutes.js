const { Router, request, response } = require('express');
const { createUser, renewToken, loginUser } = require('../controllers/authController');

/* BASE PATH /api/auth */
const router = Router();

router.post('/', loginUser);

router.post('/new', createUser);

router.post('/renew', renewToken);

module.exports = router;
