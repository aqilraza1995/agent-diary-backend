import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fabrics = new Schema({
  fabricType: { type: String, required: [true, "Fabric type is required"] },
  designNo: { type: String },
  lotQty: { type: Number },
  qtyInLot: { type: Number },
  perPiecePrice: { type: Number },
  total: { type: Number },
  status: { type: String, default: "Received" },
});

const fabricSchema = mongoose.model("fabrics", fabrics);
export default fabricSchema;
