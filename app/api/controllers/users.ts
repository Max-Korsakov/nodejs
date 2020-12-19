import { Request, Response } from 'express';

import { errorHandler } from '../../utils';
import { BASES } from '../../constants';
import { getService, callService } from '../../utils';

const getUsersList = async (req: Request, res: Response) => {
    const { loginSubstring, limit } = req.query;
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'get',
            url: `http://${ip}:${port}/api/users`,
            params: {
                loginSubstring,
                limit
            }
        });
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const receiveUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'get',
            url: `http://${ip}:${port}/api/users/${id}`
        });
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const authService = await getService(BASES.AUTH_SERVICE);
        const responce = await callService({
            method: 'post',
            url: `http://${authService.ip}:${authService.port}/login`,
            data: req.body
        });
        res.status(200).json(responce);
    } catch (e) {
        console.log(e.response.data);
        errorHandler(res, req, e, e.response.status);
    }
};

const createNewUser = async (req: Request, res: Response) => {
    try {
        const authService = await getService(BASES.AUTH_SERVICE);
        const passwordWithSolt = await callService({
            method: 'post',
            url: `http://${authService.ip}:${authService.port}/register`,
            data: req.body
        });
        console.log('creating user salt', passwordWithSolt);
        const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
        const requestResult = await callService({
            method: 'post',
            url: `http://${ip}:${port}/api/users`,
            data: {
                login: req.body.login,
                password: passwordWithSolt,
                age: req.body.age
            }
        });
        res.status(200).json(requestResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const updateUser = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'put',
            url: `http://${ip}:${port}/api/users/${id}`,
            data: req.body
        });
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'delete',
            url: `http://${ip}:${port}/api/users/${id}`
        });
        res.status(200).json(requesrResult);
    } catch (e) {
        errorHandler(res, req, e);
    }
};

const addUsersToGroup = async (req: Request, res: Response) => {
    const { ip, port } = await getService(BASES.POSTGRESQL_SERVICE);
    try {
        const requesrResult = await callService({
            method: 'post',
            url: `http://${ip}:${port}/api/users`,
            data: req.body
        });
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
    loginUser
};
