const { Router } = require('express');
const router = Router();
const PasswordController = require('../../controllers/PasswordControllers')

router.get('/new', PasswordController.newPassword);  // tao moi mat khau sau khi quen mat khau
router.post('/create', PasswordController.create); // gui yeu cau quen mat khau

module.exports = router;
