const { Router } = require('express');
const router = Router();
const AuthController = require('../../controllers/AuthControllers');
const passport = require('../../middlewares/passport');

router.post('/sign_up', AuthController.signUp); // dang ky tai khoan
router.patch('/sign_in', AuthController.signIn); //dang nhap tai khoan
router.patch('/sign_out', passport.authenticate('jwt', {session: false}), AuthController.signOut); // dang xuat tai khoan tren thiet bi hien tai
router.patch('/sign_out_all', passport.authenticate('jwt', {session: false}), AuthController.signOut); // dang xuat tai khoan tren moi thiet bi

module.exports = router;
