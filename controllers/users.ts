import { Request, Response } from "express";

import {
  getUserById,
  createUser,
  softDeleteUser,
  getAutoSuggestUsers,
  updateUserData
} from "../services";
import { errorHandler } from "../utils";

const getUsersList = async (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query;
  try {
    const requesrResult = await getAutoSuggestUsers(
      loginSubstring as string,
      Number(limit)
    );
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res, e);
  }
};

const receiveUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    let requesrResult = await getUserById(id);
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res, e);
  }
};

const createNewUser = async (req: Request, res: Response) => {
  try {
    let requesrResult = await createUser(req.body);
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res, e);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id: any = req.params.id;
  try {
    let requesrResult: any = await updateUserData(req.body, id);
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res, e);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let requesrResult: any = await softDeleteUser(id);
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res, e);
  }
};

export { getUsersList, receiveUserById, createNewUser, deleteUser, updateUser };
