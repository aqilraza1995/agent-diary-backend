import mongoose from "mongoose";

const Schema = mongoose.Schema;

let parties = new Schema({
  name: { type: String },
  contact: { type: String },
  status: { type: Boolean, default: false },
});

const partySchema = mongoose.model("parties", parties);
export default partySchema;
