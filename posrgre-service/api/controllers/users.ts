import { Request, Response } from 'express';

import PostgreUserService from '../../services/user-service';
import { errorHandler } from '../../utils';

const userService = new PostgreUserService();

const getUsersList = async (req: Request, res: Response) => {
    const { loginSubstring, limit } = req.query;
    try {
        const requesrResult: any = await userService.getAutoSuggestUsers(
            loginSubstring as string,
            Number(limit)
        );
        if (requesrResult instanceof Error) throw requesrResult;
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const receiveUserById = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        let requesrResult: any = await userService.getUserByProperty({id});
        if (requesrResult instanceof Error) throw requesrResult;
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const receiveUserByLogin = async (req: Request, res: Response) => {
    const login = req.body.login;
    try {
        let requesrResult: any = await userService.getUserByProperty({login});
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const createNewUser = async (req: Request, res: Response) => {
    try {
        console.log('data', req.body);
        let requesrResult: any = await userService.createUser(req.body);
        if (requesrResult instanceof Error) throw requesrResult;
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const updateUser = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    try {
        let requesrResult: any = await userService.updateUserData(req.body, id);
        if (requesrResult instanceof Error) throw requesrResult;
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        let requesrResult: any = await userService.softDeleteUser(id);
        if (requesrResult instanceof Error) throw requesrResult;
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const addUsersToGroup = async (req: Request, res: Response) => {
    const groupId = req.body.groupId;
    const userIds = req.body.userIds;
    try {
        let requesrResult: any = await userService.addUsersToGroupHandler(
            groupId,
            userIds
        );
        if (requesrResult instanceof Error) throw requesrResult;
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

export {
    getUsersList,
    receiveUserById,
    createNewUser,
    deleteUser,
    updateUser,
    addUsersToGroup,
    receiveUserByLogin
};
