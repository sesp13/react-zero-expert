const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUser,
  renewToken,
  loginUser,
} = require('../controllers/authController');
const { fieldValidator } = require('../middlewares/fieldValidator');

/* BASE PATH /api/auth */
const router = Router();

router.post(
  '/',
  [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password should have min 6 characters').isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  loginUser
);

router.post(
  '/new',
  [
    check('name', 'The name is required').notEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password should have min 6 characters').isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  createUser
);

router.get('/renew', renewToken);

module.exports = router;
