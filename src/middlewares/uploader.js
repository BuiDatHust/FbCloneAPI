const multer = require('multer');

const memoryStorage = multer.memoryStorage();

const withoutSavingUploader = multer({ storage: memoryStorage });

module.exports = {
  withoutSavingUploader,
};
