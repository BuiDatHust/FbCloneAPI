const settings = require('../configs/settings')
const {
  singleImageUpload,
  singleVideoUpload,
  singleFileUpload,
} = require('../helpers/uploadMedia')
const s3Storage = require('../initializers/s3Storage')
const { sendError, sendSuccess } = require('../libs/response')

exports.show = async (req, res) => {
  try {
    const key = req.params.path
    const s3ObjectHeader = await s3Storage.headObject(key)
    res.writeHead(200, {
      'Content-Type': s3ObjectHeader.ContentType,
      'Content-Length': s3ObjectHeader.ContentLength,
      'Content-Disposition': `attachment; filename=${encodeURI(
        key.split('/').pop()
      )}`,
      'Accept-Ranges': s3ObjectHeader.AcceptRanges,
    })
    const s3Object = await s3Storage.getObject(key)
    s3Object
      .on('httpData', (chunk) => {
        res.write(chunk)
      })
      .on('httpDone', () => {
        res.end()
      })
      .send()
    sendSuccess(res, { files: result })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.createImage = async (req, res) => {
  try {
    const files = req.files
    const result = []
    for (const file of files) {
      const resultItem = {
        name: file.originalname,
        source: undefined,
      }
      resultItem.source = `${
        settings.imageStorageHost
      }/${await singleImageUpload(file)}`
      result.push(resultItem)
    }
    sendSuccess(res, { files: result })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.createFile = async (req, res) => {
  try {
    const files = req.files
    const result = []
    for (const file of files) {
      const resultItem = {
        name: file.originalname,
        source: undefined,
      }
      if (file.mimetype.split('/')[0] === settings.prefix.imageMime) {
        resultItem.source = `${settings.imageStorageHost}/${singleImageUpload(
          file
        )}`
      } else if (file.mimetype.split('/')[0] === settings.prefix.videoMime) {
        resultItem.source = `${settings.videoStorageHost}/${singleVideoUpload(
          file
        )}`
      } else {
        resultItem.source = `${settings.fileStorageHost}/${
          (await singleFileUpload(file)).url.src
        }`
      }
      result.push(resultItem)
    }
    sendSuccess(res, { files: result })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}
