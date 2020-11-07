import express, { Router } from "express";
import EJV from "express-joi-validation";

import {
  getUsersList,
  receiveUserById,
  createNewUser,
  deleteUser,
  updateUser,
} from "../controllers/users";
import { userBodySchema } from "../models";

const userRouter: Router = express.Router();
const validator = EJV.createValidator();

userRouter.post("/", validator.body(userBodySchema), createNewUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", receiveUserById);
userRouter.get("/", getUsersList);
userRouter.put("/:id", validator.body(userBodySchema), updateUser);

export { userRouter };
