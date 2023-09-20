import userSchema from "./UserSchema.js";

export default class UserDao {
  model = userSchema;

  insertUser = (userData) => {
    return new this.model(userData).save();
  };

  getAllUsers = ({ page, perPage, sortObj }) => {
    return this.model
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort(sortObj);
  };

  getUserList =()=>{
    return this.model.find({}, { _id: 1, name: 1, email:1, password:1, contact: 1 });
  }
  getUserById = (userId) => {
    return this.model.find({ _id: userId }, {}, { new: true });
  };

  updateStatus = (userId, status) => {
    return this.model.findOneAndUpdate({ _id: userId }, { status });
  };
}
