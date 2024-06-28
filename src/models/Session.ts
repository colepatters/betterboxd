import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { DateTime } from "luxon";
import { Response } from "express";

class Session extends Model {
  hasExpired() {
    const expires = DateTime.fromISO(this.dataValues.expires);

    if (DateTime.now() > expires) {
      return false;
    } else return true;
  }

  createCookie(res: Response) {
    res.cookie("_session", this.dataValues.token, {
      // ms * s * min * hr * day (30 days)
      maxAge: 1000 * 60 * 60 * 24 * 30,

      // SESSION AGE DEV 10 SECOND
      // maxAge: 10000,
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
  }
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.UUID,
    },
    expires: {
      type: DataTypes.STRING,
      comment: "UTC ISO String",
    },
    clientName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Session",
  }
);

Session.addHook("beforeCreate", async function (session: any) {
  session.expires = DateTime.now().toUTC().toISO();
  session.token = crypto.randomUUID();
});

export default Session;
