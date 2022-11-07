const { Router } = require('express')
const router = Router()
const FollowerController = require('../../controllers/FollowerControllers')

router.get('/', FollowerController.index)
router.post('/:userId', FollowerController.create)

module.exports = router 