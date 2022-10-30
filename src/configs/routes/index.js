const { Router } = require('express');
const AuthRouter = require('./Auths');
const UserRouter = require('./Users');
const PasswordRouter = require('./Passwords');
const UploadRouter = require('./Uploads');
const PostRouter = require('./Posts')
const CommentRouter = require('./Comments')
const passport = require('../../middlewares/passport');

const router = Router();

router.use('/password', PasswordRouter);
router.use('/auth', AuthRouter);
router.use('/user', passport.authenticate('jwt', {session: false}), UserRouter);
router.use('/upload',  passport.authenticate('jwt', {session: false}), UploadRouter);
router.use('/post',  passport.authenticate('jwt', {session: false}), PostRouter);
router.use('/comment',  passport.authenticate('jwt', {session: false}), CommentRouter);

module.exports = router;
