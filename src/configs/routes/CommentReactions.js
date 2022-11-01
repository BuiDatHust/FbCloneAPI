const { Router } = require('express')
const router = Router()
const CommentReactionController = require('../../controllers/CommentReactionControllers')

router.get('/:commentId', CommentReactionController.index) // danh sach bai viet
router.post('/', CommentReactionController.create) // tao moi bai viet
router.delete('/:commentReactionId', CommentReactionController.delete) // sua bai viet

module.exports = router
