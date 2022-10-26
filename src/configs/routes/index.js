const { Router } = require('express');
const AuthRouter = require('./Auths');
const UserRouter = require('./Users');
const PasswordRouter = require('./Passwords');

const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/password', PasswordRouter);

module.exports = router;
