const { Router } = require('express')
const router = Router()
const PostController = require('../../controllers/PostControllers')

router.get('/:userId', PostController.index) // danh sach bai viet
router.post('/', PostController.create) // tao moi bai viet
router.put('/:postId', PostController.update) // sua bai viet
router.get('/:postId', PostController.show) // xem chi tiet bai viet
router.delete('/:postId', PostController.delete) // xoa bai viet

module.exports = router
