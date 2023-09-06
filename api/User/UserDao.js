import userSchema from "./UserSchema.js";

export default class UserDao {
  model = userSchema;

  insertUser = (userData) => {
    return new this.model(userData).save();
  };

  getAllUsers = ({ page, perPage, sortObj }) => {
    return this.model.find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort(sortObj);
  };

  getUserById = (userId) => {
    return this.model.find({ _id: userId }, {}, { new: true });
  };
}
