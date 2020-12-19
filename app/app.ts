import express from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
const Strategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

import { userRouter, groupRouter } from './api/routes';

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'dev-jwt';

passport.use(
    new Strategy(opts, (jwt_payload: any, done: any) => {
        if (jwt_payload.userId) {
            return done(null, jwt_payload.userId);
        }
        return done(null, false);
    })
);

const application = () => {
    const app: express.Application = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/api/users', userRouter);
    app.use('/api/groups', groupRouter);

    return app;
};

export default application;
