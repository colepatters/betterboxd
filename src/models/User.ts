import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import bcrypt from "bcrypt";
import Session from "./Session";

class User extends Model {
  static async getFromSessionToken(token: string): Promise<User | null> {
    if (!token) return null;

    const session = await Session.findOne({ where: { token } });
    if (!session) return null;

    const user = User.findOne({
      where: { id: session.dataValues.UserId },
      attributes: { exclude: ["password"] },
    });
    if (!user) return null;

    return user;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.addHook("beforeCreate", async (user: any) => {
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
});

export default User;
