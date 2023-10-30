import mongoose from "mongoose";

const Schema = mongoose.Schema;

const received = new Schema({
  partyId: {
    type: Schema.Types.ObjectId,
    ref: "parties",
    index: {
      name: "partyId",
      unique: false,
      partialFilterExpression: { partyId: { $type: "string" } },
    },
  },
  agentId: {
    type: Schema.Types.ObjectId,
    ref: "agents",
    index: {
      name: "agentId",
      unique: false,
      partialFilterExpression: { agentId: { $type: "string" } },
    },
  },
  receivedDate: { type: Date },
  fabricsId: [
    {
      type: Schema.Types.ObjectId,
      ref: "fabrics",
      index: {
        name: "fabricsId",
        unique: false,
        partialFilterExpression: { fabricsId: { $type: "string" } },
      },
    },
  ],
  suTotal: Number,
  discount: Number,
  paymentCharges: Number,
  total: Number,
});

const receivedSchema = mongoose.model("received", received);
export default receivedSchema;
