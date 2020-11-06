import { v4 as uuidv4 } from "uuid";

import { User, UserBase } from "../models";
import { filterUsersBySubstring, sortUsers, filterActiveUsers } from "../utils";

let users: User[] = [];

const getUserById = async (id: string) => {
  return users.find((user: User) => {
    if (user.id === id && !user.isDeleted) {
      return user;
    }
  });
};

const createUser = async (userData: UserBase) => {
  const newUser = {
    ...userData,
    idDeleted: false,
    id: uuidv4(),
  };
  users.push(newUser);

  return newUser;
};

const updateUser = async (userData: User) => {
  const userIndex = users.findIndex((u) => !u.isDeleted && u.id === userData.id);

  if (userIndex < 0) {
    return null;
  }
  users[userIndex] = userData;
  return userData;
};

const softDeleteUser = async (id: string) => {
    const userIndex = users.findIndex((u) => !u.isDeleted && u.id === id);
  
    if (userIndex < 0) {
      return false;
    }
    users[userIndex].isDeleted = true;
    return true;
  };

const getAutoSuggestUsers = async (loginSubstring: string, limit: number) => {
  const property = "login";
  let activeUsers = filterActiveUsers(users)
  let filteredUsers = filterUsersBySubstring(activeUsers, loginSubstring, property);
  let sorterUsers = sortUsers(filteredUsers, property);
  let slicedUsersArray = sorterUsers.slice(0, limit);
  return slicedUsersArray;
};

export { getUserById, createUser, updateUser, getAutoSuggestUsers,softDeleteUser };
