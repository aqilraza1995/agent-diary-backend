import mongoose from "mongoose";

const Schema = mongoose.Schema;

let parties = new Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: Boolean, default: false },
});

const partySchema = mongoose.model("parties", parties);
export default partySchema;
