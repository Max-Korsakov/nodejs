import express, { Router } from 'express';
import passport from 'passport';

import { routeLogger, routeErrorHandler } from '../../utils';

import {
    createNewGroup,
    deleteGroup,
    receiveGroupById,
    getAllGroups,
    updateGroup
} from '../controllers/groups';

const groupRouter: Router = express.Router();

groupRouter.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(createNewGroup))
);
groupRouter.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(deleteGroup))
);
groupRouter.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(receiveGroupById))
);
groupRouter.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(getAllGroups))
);
groupRouter.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    routeLogger(routeErrorHandler(updateGroup))
);

export { groupRouter };
