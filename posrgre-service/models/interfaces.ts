import Joi from "joi";

export interface UserBase {
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface UserInterface extends UserBase {
  id: string;
}

type Permission = 'READ' | 'DELETE' | 'WRITE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupBase {
  name: string;
  permissions: Permission;
}

export interface UserGroup extends GroupBase {
  id: string;
}

export const userBodySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"))
    .required(),
  age: Joi.number().min(4).max(130).required(),
});
