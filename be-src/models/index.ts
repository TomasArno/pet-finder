import { User } from "./user";
import { Pet } from "./pet";
import { Auth } from "./auth";

User.hasMany(Pet);
Pet.belongsTo(User);
Auth.belongsTo(User);

export { User, Auth, Pet };
