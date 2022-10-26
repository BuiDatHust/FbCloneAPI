import { redisClient } from '../initializers/redis';

const settings = require('../configs/settings');
const { Passport } = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const UserServices = require('../services/UserServices');

const passport = new Passport();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: settings.jwt.secret,
  passReqToCallback: true,
};

const jwtStrategy = new Strategy(jwtOptions, async (req, payload, next) => {
  try {
    const user = await UserServices.findOne({ id: payload.id });
    if (!user) return next(null, null);
    const currentUserTokens = await redisClient.lRange(
      `${UserRepository.WHITELIST_ACCESS_TOKEN_PATTERN}${payload.deviceId}_${user.id}`,
      0,
      -1
    );
    const validToken = currentUserTokens.find((token) => {
      const jsonToken = JSON.parse(token);
      return (
        jsonToken.token === req.get('authorization').replace('Bearer ', '')
      );
    });
    if (!validToken) return next(null, null);
    req.currentUser = user;
    next(null, user);
  } catch (error) {
    console.log(error);
    next(null, false);
  }
});

passport.use(jwtStrategy);

export { passport };
