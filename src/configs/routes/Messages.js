const { Router } = require('express');
const router = Router();
const MessageControllers = require('../../controllers/MessageControllers')

router.get('/:userId', MessageControllers.index);

module.exports = router;
