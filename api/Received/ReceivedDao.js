import receivedSchema from "./ReceivedSchema.js";
import fabricsSchema from "../Schema/FabricSchema.js";

export default class ReceivedDao {
  model = receivedSchema;
  fabricModel = fabricsSchema;

  insertReceived = (receivedData) => {
    return new this.model(receivedData).save();
  };

  insertFabrics = async (receivedFabricsData) => {
    return this.fabricModel.insertMany(receivedFabricsData);
  };

  getAllReceived = () => {
    return this.model
      .find()
      .populate([
        { path: "partyId", select: "name" },
        { path: "agentId", select: "name" },
        { path: "fabricsId" },
      ]);

    // return this.model.find()
    // .populate('partyId',{name:1})
    // .populate('agentId',{name:1})
    // .populate([{
    //   path: 'fabricsId',
    //   transform: doc => doc == null ? null : doc
    // }]);
  };

  getReceivedById = (receivedId) => {
    return this.model
      .findOne({ _id: receivedId })
      .populate([
        { path: "partyId", select: "name" },
        { path: "agentId", select: "name" },
        { path: "fabricsId" },
      ]);
  };

  updateReceived = (id, data) => {
    return this.model.findOneAndUpdate( { _id: id },
      { name: partyData?.name, contact: partyData?.contact },
      { new: true })

    // return this.model.updateOne(
    //   { _id: id, "fabricDetails._id": data?.fabricDetails._id }, //Finding Product with the particular price
    //   {
    //     partyId:data?.partyId,
    //     agentId:data?.agentId,
    //     receivedDate:data?.receivedDate,
    //     suTotal:data?.suTotal,
    //     discount:data?.discount,
    //     paymentCharges:data?.paymentCharges,
    //     total:data?.total,
    //     $set: {
    //       "fabricDetails.$.fabricType": data?.fabricDetails.fabricType,
    //       "fabricDetails.$.designNo": data?.fabricDetails.designNo,
    //       "fabricDetails.$.lotQty": data?.fabricDetails.lotQty,
    //       "fabricDetails.$.qtyInLot": data?.fabricDetails.qtyInLot,
    //       "fabricDetails.$.perPiecePrice": data?.fabricDetails.perPiecePrice,
    //       "fabricDetails.$.total": data?.fabricDetails.total,
    //     },
    //   },
    //   { new: true }
    // );
  };
}
