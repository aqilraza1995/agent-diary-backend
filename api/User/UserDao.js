import userSchema from "./UserSchema.js";


export default class userDao {
    model = userSchema

    insertUser =(userData)=>{
        return new this.model(userData).save()
    }

    getAllUsers = ()=>{
        return this.model.find({})
    }

    getUserById = (userId)=>{
        return this.model.find({_id:userId},{},{new:true})
    }
}