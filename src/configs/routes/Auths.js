const { Router } = require('express');
const router = Router();
const AuthController = require('../../controllers/AuthControllers');

router.post('/sign_up', AuthController.signUp); // dang ky tai khoan
router.post('/sign_in', AuthController.signIn); //dang nhap tai khoan
router.patch('/sign_out', AuthController.signOut); // dang xuat tai khoan
router.patch('/sign_out_all', AuthController.signOut); // dang xuat tai khoan tren moi thiet bi

module.exports = router;
