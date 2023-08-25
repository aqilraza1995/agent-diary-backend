import mongoose from "mongoose";
import bCrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema
const SECRET_KEY = "MYNAMEISSHAIKHMOHAMMADAQILRAZA"

let users = new Schema({
    name:String,
    contact:String,
    email:String,
    password:String
})

users.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bCrypt.hash(this.password, 10)
    }
    next();
})


const userSchema = mongoose.model("users", users)
export default userSchema