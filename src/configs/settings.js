require('dotenv').config();

module.exports = {
  defaultPerPage: '12',
  jwt: {
    secret: process.env.JWT_SECRET || 'DAF857A1240D46FED4FDEA13016F2FC126C4D4C1C84056B082A176238C166BD7',
    ttl: 60 * 60 * 24 * 1000,
  },
  sessionSecret: 'bUfxkJXG5xOtaOqRyTmXqWGl4ZxNSyAPbJGVfc7DKix2lyBMJn6TtmKQER52q2eC',
  preSignExpiration: 60 * 60 * 2,
  prefix: {
    imageMime: 'image',
    videoMime: 'video',
    fileMime: 'application',
  },
};