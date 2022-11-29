const { Router } = require('express');
const router = Router();
const NewfeedControllers = require('../../controllers/NewfeedControllers')

router.get('/more', NewfeedControllers.getMore);
router.get('/new', NewfeedControllers.getNew);

module.exports = router;
