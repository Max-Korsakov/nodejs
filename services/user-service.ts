import { v4 as uuidv4 } from "uuid";
import PG from "pg";

import { User, UserBase } from "../models";
import { filterUsersBySubstring, sortUsers, filterActiveUsers } from "../utils";
import { dbOptions } from "../constants";

let users: User[] = [];

const getUserById = async (id: string) => {
  const client = new PG.Client(dbOptions);
  await client.connect();
  try {
    let user = await client.query(`select * from users where id='${id}'`);
    if(user.rows.length === 0) throw new Error('User not found')
    return user.rows
  } catch (error) {
    return new Error('User not found');
  } finally {
    client.end();
  }
};

const createUser = async (userData: UserBase) => {
  const {login, password, age} = userData
  const client = new PG.Client(dbOptions);
  await client.connect();
  try {
    let newUser: any = await client.query(`insert into users (login, password, age) values ('${login}' , '${password}', '${age}') returning *`);
    return newUser.rows
  } catch (error) {
    return new Error('User was not created');
  } finally {
    client.end();
  }
};

const updateUserData = async (userData: User, id: string) => {
  const {login, password, age} = userData
  const client = new PG.Client(dbOptions);
  await client.connect();
  try {
    let updatedUserData = await client.query(`update users set login='${login}', password='${password}', age='${age}' where id='${id}' returning *`);
    return updatedUserData.rows
  } catch (error) {
    return error;
  } finally {
    client.end();
  }
};

const softDeleteUser = async (id: string) => {
  const client = new PG.Client(dbOptions);
  await client.connect();
  try {
    let deletedUser = await client.query(`update users set isdeleted='${true}' where id='${id}' returning *`);
    return deletedUser.rows
  } catch (error) {
    return error;
  } finally {
    client.end();
  }
};

const getAutoSuggestUsers = async (loginSubstring: string, limit: number) => {
  const client = new PG.Client(dbOptions);
  await client.connect();
  try {
    let users = await client.query(`select * from users`);
    const property = "login";
    let activeUsers = filterActiveUsers(users.rows);
    let filteredUsers = filterUsersBySubstring(
      activeUsers,
      loginSubstring,
      property
    );
    let sorterUsers = sortUsers(filteredUsers, property);
    let slicedUsersArray = sorterUsers.slice(0, limit);
    return slicedUsersArray;
  } catch (error) {
    return error;
  } finally {
    client.end();
  }


};

export {
  getUserById,
  createUser,
  updateUserData,
  getAutoSuggestUsers,
  softDeleteUser,
};
