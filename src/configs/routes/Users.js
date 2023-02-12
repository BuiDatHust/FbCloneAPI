const { Router } = require('express')
const router = Router()
const UserController = require('../../controllers/UserControllers')
const passport = require('../../middlewares/passport')

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.show
) // xem thong tin ca nhan
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.update
) // cap nhat thong tin ca nhan
router.patch(
  '/change_password',
  passport.authenticate('jwt', { session: false }),
  UserController.changePassword
) // doi mat khau
router.get(
  '/suggest',
  passport.authenticate('jwt', { session: false }),
  UserController.suggestUsers
)
router.get(
  '/block/:type/:userId',
  passport.authenticate('jwt', { session: false }),
  UserController.blockUser
)

// get user profile
router.get(
  '/:id/profile',
  passport.authenticate('jwt', { session: false }),
  UserController.getProfile
)
router.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  UserController.search
)

module.exports = router
