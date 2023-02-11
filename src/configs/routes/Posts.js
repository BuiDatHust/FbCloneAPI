const { Router } = require('express')
const router = Router()
const PostController = require('../../controllers/PostControllers')
const passport = require('../../middlewares/passport')

router.get('/user/:userId', PostController.index) // danh sach bai viet
router.post('/',passport.authenticate('jwt', {session: false}), PostController.create) // tao moi bai viet
router.put('/:postId',passport.authenticate('jwt', {session: false}), PostController.update) // sua bai viet
router.get('/:postId', PostController.show) // xem chi tiet bai viet
router.delete('/:postId',passport.authenticate('jwt', {session: false}), PostController.delete) // xoa bai viet

module.exports = router
