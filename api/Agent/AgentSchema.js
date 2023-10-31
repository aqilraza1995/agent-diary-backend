import mongoose from "mongoose";

const Schema = mongoose.Schema;

let agents = new Schema({
  name: { type: String },
  contact: { type: String },
  status: { type: Boolean, default: false },
  partyId: {
    type: Schema.Types.ObjectId,
    ref: "parties",
    index: {
      name: 'partyId',
      unique: false,
      partialFilterExpression: { partyId: { $type: "string" } },
    },
  },
});

const agentSchema = mongoose.model("agents", agents);
export default agentSchema;

