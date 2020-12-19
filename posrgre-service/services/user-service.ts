import { User, UserInterface, UserBase, UsersGroup } from '../models';
import { sequelize } from '../constants';
import Seq from 'sequelize';
import { serviceMethodLogger } from '../utils';

export default class PostgreUserService {
    constructor() {}

    @serviceMethodLogger()
    public async getUserByProperty(property: any) {
        try {
            let user = await User.findAll({
                where: {
                    ...property
                }
            });
            return user;
        } catch (error) {
            return error;
        }
    }

    @serviceMethodLogger()
    public async createUser(userData: UserBase) {
        const { login, password, age } = userData;
        try {
            let newUser: any = await User.create({ login, password, age });
            return newUser;
        } catch (error) {
            return error;
        }
    }

    @serviceMethodLogger()
    public async updateUserData(userData: UserInterface, id: string) {
        let updateValuet = {} as UserInterface;
        for (let key in userData) {
            if (userData.hasOwnProperty(key) && (userData as any)[key]) {
                (updateValuet as any)[key] = (userData as any)[key];
            }
        }
        try {
            let updatedUserData = await User.update(updateValuet, {
                where: {
                    id
                }
            });
            return updatedUserData;
        } catch (error) {
            return error;
        }
    }

    @serviceMethodLogger()
    public async softDeleteUser(id: string) {
        let isDeleted = true;
        try {
            let deletedUser = await User.update(
                { isDeleted },
                {
                    where: {
                        id
                    }
                }
            );
            return deletedUser;
        } catch (error) {
            return error;
        }
    }

    @serviceMethodLogger()
    public async getAutoSuggestUsers(loginSubstring: string, limit: number) {
        const property = 'login';
        try {
            let users = await User.findAll({
                where: {
                    isDeleted: {
                        [Seq.Op.not]: true
                    },
                    [property]: {
                        [Seq.Op.substring]: loginSubstring
                    }
                },
                order: [[property, 'DESC']],
                limit
            });
            return users;
        } catch (error) {
            return error;
        }
    }

    @serviceMethodLogger()
    public async addUsersToGroupHandler(groupId: string, userIds: string[]) {
        const t = await sequelize.transaction();
        try {
            await UsersGroup.create(
                {
                    groupId,
                    userId: userIds[0]
                },
                { transaction: t }
            );

            await UsersGroup.create(
                {
                    groupId,
                    userId: userIds[1]
                },
                { transaction: t }
            );
            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            return error;
        }
    }
}
