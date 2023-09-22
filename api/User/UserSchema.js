import mongoose from "mongoose";
import bCrypt from "bcrypt";

const Schema = mongoose.Schema;

let users = new Schema({
  name: {type:String},
  contact: {type:String},
  email: {type:String},
  password: {type:String},
  status:{type:Boolean, default: false},
  tokens: String,

});

users.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bCrypt.hash(this.password, 10);
  }
  next();
});

const userSchema = mongoose.model("users", users);
export default userSchema;
