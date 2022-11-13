const { Router } = require('express');
const AuthRouter = require('./Auths');
const UserRouter = require('./Users');
const PasswordRouter = require('./Passwords');
const UploadRouter = require('./Uploads');
const PostRouter = require('./Posts')
const CommentRouter = require('./Comments')
const PostReactionRouter = require('./PostReactions')
const CommentReactionRouter = require('./CommentReactions')
const FriendRouter = require('./Friends')
const FollowerRouter = require('./Followers')
const MessageRouter = require('./Messages')
const ChatRouter = require('./Chats')
const passport = require('../../middlewares/passport');

const router = Router();

router.use('/password', PasswordRouter);
router.use('/auth', AuthRouter);
router.use('/user', passport.authenticate('jwt', {session: false}), UserRouter);
router.use('/upload',  passport.authenticate('jwt', {session: false}), UploadRouter);
router.use('/post',  passport.authenticate('jwt', {session: false}), PostRouter);
router.use('/comment',  passport.authenticate('jwt', {session: false}), CommentRouter);
router.use('/post_reaction',  passport.authenticate('jwt', {session: false}), PostReactionRouter);
router.use('/comment_reaction',  passport.authenticate('jwt', {session: false}), CommentReactionRouter);
router.use('/friend',  passport.authenticate('jwt', {session: false}), FriendRouter)
router.use('/follower', passport.authenticate('jwt', {session: false}), FollowerRouter)
router.use('/message', passport.authenticate('jwt', {session: false}), MessageRouter)
router.use('/chat', passport.authenticate('jwt', {session: false}), ChatRouter)

module.exports = router;
