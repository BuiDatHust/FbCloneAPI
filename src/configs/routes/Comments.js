const { Router } = require('express')
const router = Router()
const CommmentController = require('../../controllers/CommentControllers')
const passport = require('../../middlewares/passport')

router.post('/', passport.authenticate('jwt', {session: false}), CommmentController.create) // tao moi binh luan
router.put('/:commentId', passport.authenticate('jwt', {session: false}), CommmentController.update) // sua binh luan
router.get('/:type/:id', CommmentController.show) // xem chi tiet binh luan
router.delete('/:commentId', passport.authenticate('jwt', {session: false}), CommmentController.delete) // xoa binh luan

module.exports = router
