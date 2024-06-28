import Session from "./Session";
import User from "./User";

User.hasMany(Session);
Session.belongsTo(User);

export { Session, User };
