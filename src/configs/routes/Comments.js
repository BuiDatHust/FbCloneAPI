const { Router } = require('express')
const router = Router()
const CommmentController = require('../../controllers/CommentControllers')

router.post('/', CommmentController.create) // tao moi binh luan
router.put('/:commentId', CommmentController.update) // sua binh luan
router.get('/:type/:id', CommmentController.show) // xem chi tiet binh luan
router.delete('/:commentId', CommmentController.delete) // xoa binh luan

module.exports = router
