const { Router } = require('express')
const router = Router()
const FriendController = require('../../controllers/FriendControllers')

router.get('/', FriendController.index)
router.get('/requested/:type', FriendController.indexRequest)
router.get('/:userId', FriendController.indexSameFriend)
router.post('/:userId', FriendController.create)
router.patch('/approve/:friendRequestId', FriendController.approved)
router.patch('/reject/:friendRequestId', FriendController.reject)

module.exports = router
