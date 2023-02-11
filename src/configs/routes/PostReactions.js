const { Router } = require('express')
const router = Router()
const PostReactionController = require('../../controllers/PostReactionControllers')
const passport = require('../../middlewares/passport')

router.get(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  PostReactionController.index
) // danh sach bai viet
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  PostReactionController.create
) // tao moi bai viet
router.delete(
  '/:postReactionId',
  passport.authenticate('jwt', { session: false }),
  PostReactionController.delete
) // sua bai viet

module.exports = router
