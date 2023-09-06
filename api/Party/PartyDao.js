import partySchema from "./PartySchema.js";

export default class PartyDao {
  model = partySchema;

  insertParty = (partyData) => {
    return new this.model(partyData).save();
  };

  getAllParty = ({ page, perPage, sortObj }) => {
    return this.model
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort(sortObj);
  };

  getPartyById = (partyId) => {
    return this.model.find({ _id: partyId }, {}, { new: true });
  };

  getPartyList = () => {
    return this.model.find({}, { _id: 1, name: 1 });
  };

  updateParty = (partyId, partyData) => {
    return this.model.findOneAndUpdate(
      { _id: partyId },
      { name: partyData?.name, contact: partyData?.contact },
      { new: true }
    );
  };

  deleteParty = (partyId) => {
    return this.model.findOneAndDelete({ _id: partyId });
  };
}
