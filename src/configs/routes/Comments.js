const { Router } = require('express')
const router = Router()
const CommmentController = require('../../controllers/CommentControllers')

router.get('/', CommmentController.index) // danh sach bai viet
router.post('/', CommmentController.create) // tao moi bai viet
router.put('/:commentId', CommmentController.update) // sua bai viet
router.get('/:commentId', CommmentController.show) // xem chi tiet bai viet
router.delete('/:commentId', CommmentController.delete) // xoa bai viet

module.exports = router
