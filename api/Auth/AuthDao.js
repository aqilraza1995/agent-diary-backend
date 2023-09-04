import userSchema from "../User/UserSchema.js";

export default class AuthDao {
  model = userSchema;

  signIn = async (email) => {
    return await this.model.findOne({ email }, {});
  };

  getUserByEmail = async (email) =>{
    return await this.model.find({ email }, {})
  }
}
