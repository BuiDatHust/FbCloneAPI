const configs = require('../configs/configs');
const settings = require('../configs/settings')
const aws = require('aws-sdk');

class S3StorageService {
  constructor () {
    this.s3 = new aws.S3(configs.s3);
  }

  async getDownloadableUrl (key) {
    const url = this.s3.getSignedUrl('getObject', {
      Bucket: configs.s3.params.Bucket,
      Key: key,
      Expires: settings.preSignExpiration,
    });
    return url;
  }

  async headObject (key) {
    const header = await this.s3.headObject({
      Bucket: configs.s3.params.Bucket,
      Key: key,
    }).promise();
    return header;
  }

  async getObject (key) {
    const object = this.s3.getObject({
      Bucket: configs.s3.params.Bucket,
      Key: key,
    });
    return object;
  }
}

module.exports = new S3StorageService();
