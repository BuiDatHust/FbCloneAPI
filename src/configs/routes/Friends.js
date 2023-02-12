const { Router } = require('express')
const router = Router()
const FriendController = require('../../controllers/FriendControllers')

router.get('/list/:userId', FriendController.index)
router.get('/requested/:type', FriendController.indexRequest)
router.get('/:userId', FriendController.indexSameFriend)
router.post('/:userId', FriendController.create)
router.patch('/approve/:userId', FriendController.approved)
router.patch('/reject/:userId', FriendController.reject)

// cancel friend request
router.delete('/:userId', FriendController.indexCancelRequest)

module.exports = router
