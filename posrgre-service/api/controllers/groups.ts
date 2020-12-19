import { Request, Response } from "express";

import  PostgreGroupService from "../../services/group-service";
import { errorHandler } from "../../utils";

const groupService = new PostgreGroupService()
const getAllGroups = async (req: Request, res: Response) => {
  try {
    const requesrResult: any = await groupService.getGroupsList()
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res,req, e);
  }
};

const receiveGroupById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let requesrResult: any = await groupService.getGroupById(id);
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res,req, e);
  }
};

const createNewGroup = async (req: Request, res: Response) => {
  try {
    let requesrResult: any = await groupService.createGroup(req.body);
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res,req, e);
  }
};

const updateGroup = async (req: Request, res: Response) => {
  const id: any = req.params.id;
  try {
    let requesrResult: any = await groupService.updateGroupData(req.body, id);
    console.log(requesrResult);
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res,req, e);
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let requesrResult: any = await groupService.hardDeleteGroup(id);
    if (requesrResult instanceof Error) throw requesrResult;
    res.status(200).json(requesrResult);
  } catch (e) {
    errorHandler(res,req, e);
  }
};

export { getAllGroups, receiveGroupById, createNewGroup, deleteGroup, updateGroup };
