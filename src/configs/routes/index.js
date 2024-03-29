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
const NewfeedRouter = require('./Newfeeds')
const NotificationRouter = require('./Notifications')

const passport = require('../../middlewares/passport');

const router = Router();

router.use('/password', PasswordRouter);
router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/upload',  passport.authenticate('jwt', {session: false}), UploadRouter);
router.use('/post',  PostRouter);
router.use('/comment', CommentRouter);
router.use('/post_reaction',  PostReactionRouter);
router.use('/comment_reaction',  CommentReactionRouter);
router.use('/friend',  passport.authenticate('jwt', {session: false}), FriendRouter)
router.use('/follower', passport.authenticate('jwt', {session: false}), FollowerRouter)
router.use('/message', passport.authenticate('jwt', {session: false}), MessageRouter)
router.use('/chat', passport.authenticate('jwt', {session: false}), ChatRouter)
router.use('/newfeeds', passport.authenticate('jwt', {session: false}), NewfeedRouter)
router.use('/notifications', passport.authenticate('jwt', {session: false}), NotificationRouter)

module.exports = router;
