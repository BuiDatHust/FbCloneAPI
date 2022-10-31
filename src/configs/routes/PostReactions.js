const { Router } = require('express')
const router = Router()
const PostReactionController = require('../../controllers/PostReactionControllers')

router.get('/:postId', PostReactionController.index) // danh sach bai viet
router.post('/', PostReactionController.create) // tao moi bai viet
router.delete('/:postReactionId', PostReactionController.delete) // sua bai viet

module.exports = router
