import { Group, GroupBase, UserGroup } from "../models";
import { serviceMethodLogger } from "../utils";

export default class PostgreGroupService {
    constructor() {}

    @serviceMethodLogger()
    public async getGroupById(id: string) {
        try {
            let group = await Group.findAll({
                where: {
                    id,
                },
            });
            if (group.length === 0) throw new Error("Group not found");
            return group;
        } catch (error) {
            return error;
        }
    }

    @serviceMethodLogger()
    public async createGroup(groupData: GroupBase) {
        const { name, permissions } = groupData;
        try {
            let newGroup: any = await Group.create({ name, permissions });
            return newGroup;
        } catch (error) {
            return error;
        }
    }

    @serviceMethodLogger()
    public async updateGroupData(groupData: UserGroup, id: string) {
        let updateValue = {} as UserGroup;
        for (let key in groupData) {
            if (groupData.hasOwnProperty(key) && (groupData as any)[key]) {
                (updateValue as any)[key] = (groupData as any)[key];
            }
        }
        try {
            let updatedGroupData = await Group.update(updateValue, {
                where: {
                    id,
                },
            });
            return updatedGroupData;
        } catch (error) {
            return error;
        }
    }

    @serviceMethodLogger()
    public async hardDeleteGroup(id: string) {
        try {
            let deletedGroup = await Group.destroy({
                where: {
                    id,
                },
                cascade: true,
            });
            return deletedGroup;
        } catch (error) {
            return error;
        }
    }

    @serviceMethodLogger()
    public async getGroupsList() {
        try {
            let groups = await Group.findAll();
            return groups;
        } catch (error) {
            return error;
        }
    }
}
