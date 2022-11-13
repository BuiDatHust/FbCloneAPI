const { Router } = require('express');
const router = Router();
const ChatControllers = require('../../controllers/ChatControllers')

router.get('/', ChatControllers.index);

module.exports = router;
