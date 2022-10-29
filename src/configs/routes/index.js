const { Router } = require('express');
const AuthRouter = require('./Auths');
const UserRouter = require('./Users');
const PasswordRouter = require('./Passwords');
const passport = require('../../middlewares/passport');

const router = Router();

router.use('/password', PasswordRouter);
router.use('/auth', AuthRouter);
router.use('/user', passport.authenticate('jwt', {session: false}), UserRouter);

module.exports = router;
