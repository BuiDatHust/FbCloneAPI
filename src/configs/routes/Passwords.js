const { Router } = require('express');
const router = Router();
const PasswordController = require('../../controllers/PasswordControllers')

router.get('/create', PasswordController.create); // gui otp quen mat khau
router.put('/new', PasswordController.newPassword);  // tao moi mat khau sau khi quen mat khau
router.patch('/verify_code', PasswordController.verifyCode) // xac nhan ma otp

module.exports = router;
