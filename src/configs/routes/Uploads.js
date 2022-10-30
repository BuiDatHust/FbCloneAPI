const { Router } = require('express');
const router = Router();
const { withoutSavingUploader } = require('../../middlewares/uploader');
const UploadController = require('../../controllers/UploadControllers')

router.get('/:path', UploadController.show ) // xem chi tiet 1 media(neu la file thi tai ve)
router.post('/image', withoutSavingUploader.array('files'), UploadController.createImage); // tai len anh
router.post('/file', withoutSavingUploader.array('files'), UploadController.createFile); // tai len file/anh/video

module.exports = router;
