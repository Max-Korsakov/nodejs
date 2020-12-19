import express, { Router } from 'express';
import EJV from 'express-joi-validation';
import passport from 'passport';

import { routeLogger, routeErrorHandler } from '../../utils';
import {
    getUsersList,
    receiveUserById,
    createNewUser,
    deleteUser,
    updateUser,
    addUsersToGroup,
    loginUser
} from '../controllers/users';
import { userBodySchema } from '../../models';

const userRouter: Router = express.Router();
const validator = EJV.createValidator();

userRouter.post('/login', routeLogger(routeErrorHandler(loginUser)));

userRouter.post(
    '/register',
    validator.body(userBodySchema),
    routeLogger(routeErrorHandler(createNewUser))
);
userRouter.post(
    '/assign',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(addUsersToGroup))
);
userRouter.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(deleteUser))
);
userRouter.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(receiveUserById))
);
userRouter.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(getUsersList))
);
userRouter.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(updateUser))
);

export { userRouter };
