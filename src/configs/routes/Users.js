const { Router } = require('express');
const router = Router();
const UserController = require('../../controllers/UserControllers')

router.get('/', UserController.show); // xem thong tin ca nhan
router.post('/update', UserController.update); // cap nhat thong tin ca nhan
router.post('/change_password', UserController.changePassword); // doi mat khau

module.exports = router;
