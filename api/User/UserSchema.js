import mongoose from "mongoose";
import bCrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;
const SECRET_KEY = "MYNAMEISSHAIKHMOHAMMADAQILRAZA";

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

users.pre("save", function (next) {
  let token = jwt.sign({ _id: this._id }, SECRET_KEY);
  this.tokens = token;
  next();
});

const userSchema = mongoose.model("users", users);
export default userSchema;
