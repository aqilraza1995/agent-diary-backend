import partySchema from "./PartySchema.js";

export default class partyDao {
  model = partySchema;

  insertParty = (partyData) => {
    return new this.model(partyData).save();
  };

  getAllParty = () => {
    return this.model.find({});
  };

  getPartyById = (partyId) => {
    return this.model.find({ _id: partyId }, {}, { new: true });
  };
}
