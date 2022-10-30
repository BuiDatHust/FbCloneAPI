const { Router } = require('express')
const router = Router()
const UserController = require('../../controllers/UserControllers')

router.get('/', UserController.show) // xem thong tin ca nhan
router.put('/', UserController.update) // cap nhat thong tin ca nhan
router.patch('/change_password', UserController.changePassword) // doi mat khau

module.exports = router
