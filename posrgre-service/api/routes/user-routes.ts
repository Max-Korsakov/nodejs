import express, { Router } from 'express';
import EJV from 'express-joi-validation';
import { routeLogger, routeErrorHandler } from '../../utils';

import {
    getUsersList,
    receiveUserById,
    createNewUser,
    deleteUser,
    updateUser,
    addUsersToGroup,
    receiveUserByLogin
} from '../controllers/users';

const userRouter: Router = express.Router();

userRouter.post('/', routeLogger(routeErrorHandler(createNewUser)));
userRouter.post('/assign', routeLogger(routeErrorHandler(addUsersToGroup)));
userRouter.delete('/:id', routeLogger(routeErrorHandler(deleteUser)));
userRouter.get('/:id', routeLogger(routeErrorHandler(receiveUserById)));
userRouter.get('/', routeLogger(routeErrorHandler(getUsersList)));
userRouter.put('/:id', routeLogger(routeErrorHandler(updateUser)));
userRouter.post('/findbylogin', routeLogger(routeErrorHandler(receiveUserByLogin)));

export { userRouter };
