const { Router } = require('express');
const NotificationController = require('../../controllers/NotificationController');
const router = Router();

router.get('/', NotificationController.index); 
router.delete('/:notificationId', NotificationController.delete); 

module.exports = router;
