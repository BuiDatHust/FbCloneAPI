const { Router } = require('express')
const router = Router()
const UserController = require('../../controllers/UserControllers')
const { route } = require('./Auths')

router.get('/', UserController.show) // xem thong tin ca nhan
router.put('/', UserController.update) // cap nhat thong tin ca nhan
router.patch('/change_password', UserController.changePassword) // doi mat khau

// get user profile
router.get('/:id/profile', UserController.getProfile)

module.exports = router
