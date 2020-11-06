import { Request, Response } from "express";

import { getUserById, createUser, softDeleteUser, getAutoSuggestUsers } from "../services";

const getUsersList = async  (req: Request, res: Response)=> {
  const { loginSubstring, limit } = req.query
  try {
    const userList = await getAutoSuggestUsers(loginSubstring as string, Number(limit))
    if (!userList) throw new Error("Users not found");
    res.status(200).json(userList);
  } catch (e) {
    console.log(e);
  }
};

const receiveUserById =async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let user =await getUserById(id);
    if (!user) throw new Error("User not found");
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

const createNewUser =async (req: Request, res: Response) => {
  try {
    let newUser = await createUser(req.body);
    if (!newUser) throw new Error("User was not created");
    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
  }
};

const updateUser =async (req: Request, res: Response) => {
  try {
    let newUserData = await createUser(req.body);
    if (!newUserData) throw new Error("User was not updated");
    res.status(200).json(newUserData);
  } catch (e) {
    console.log(e);
  }
};


const deleteUser =async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let newUser = await softDeleteUser(id);
    if (!newUser) throw new Error("User was not created");
    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
  }
};

export { getUsersList, receiveUserById, createNewUser, deleteUser, updateUser };
