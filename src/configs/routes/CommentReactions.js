const { Router } = require('express')
const router = Router()
const CommentReactionController = require('../../controllers/CommentReactionControllers')
const passport = require('../../middlewares/passport')

router.get('/:commentId',passport.authenticate('jwt', {session: false}), CommentReactionController.index) // danh sach bai viet
router.post('/', CommentReactionController.create) // tao moi bai viet
router.delete('/:commentReactionId', CommentReactionController.delete) // sua bai viet

module.exports = router
