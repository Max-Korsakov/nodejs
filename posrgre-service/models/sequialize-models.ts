import Seq from "sequelize";
import { sequelize } from "../constants";

const DataTypes = Seq.DataTypes


export const User = sequelize.define(
  "User",
  {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: Seq.UUIDV4,
      primaryKey: true
    },

    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
  },
  {
    tableName: 'users'
  }
);

export const Group = sequelize.define(
  "Group",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Seq.UUIDV4,
      primaryKey: true
    },

    permissions: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    tableName: 'groups'
  }
);

export const UsersGroup = sequelize.define(
    "UserGroup",
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model:User,
            key: 'id'
        }
      },
      groupId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model:Group,
            key: 'id',
        }
      }
    },
    {
      tableName: 'usergroups'
    }
  );

Group.belongsToMany(User, {through:UsersGroup, 
  onDelete: 'CASCADE',
})
User.belongsToMany(Group, {through:UsersGroup, 
  onDelete: 'CASCADE',
})

