import partySchema from "./PartySchema.js";

export const insertPartyDao = (partyData) => {
  return partySchema(partyData).save();
};

export const getAllPartyDao = ({ page, perPage, sortObj }) => {
  return partySchema
    .find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort(sortObj);
};

export const getPartyListDao = () => {
  return partySchema.find({});
};

export const getPartyByIdDao = (id) => {
  return partySchema.findOne({ _id: id }, {}, { new: true });
};

export const updatePartyDao = (id, data) => {
  return partySchema.findOneAndUpdate(
    { _id: id },
    { name: data?.name, contact: data?.contact, address: data?.address },
    { new: true }
  );
};

export const deletePartyDao = (id) => {
  return partySchema.findOneAndDelete({ _id: id });
};

export const updatePartyStatusDao = (id, status) => {
  return partySchema.findOneAndUpdate({ _id: id }, { status }, { new: true });
};

// export default {insertPartyDao, getAllPartyDao}

// import partySchema from "./PartySchema.js";

// export default class PartyDao {
//   model = partySchema;

//   insertParty = (partyData) => {
//     return new this.model(partyData).save();
//   };

//   getAllParty = ({ page, perPage, sortObj }) => {
//     return this.model
//       .find()
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .sort(sortObj);
//   };

//   getPartyById = (partyId) => {
//     return this.model.findOne({ _id: partyId }, {}, { new: true });
//   };

//   getPartyList = () => {
//     return this.model.find({}, { _id: 1, name: 1, contact: 1 });
//   };

//   updateParty = (partyId, partyData) => {
//     return this.model.findOneAndUpdate(
//       { _id: partyId },
//       { name: partyData?.name, contact: partyData?.contact },
//       { new: true }
//     );
//   };

//   deleteParty = (partyId) => {
//     return this.model.findOneAndDelete({ _id: partyId });
//   };

//   updateStatus = (partyId, status) => {
//     return this.model.findOneAndUpdate({ _id: partyId }, { status });
//   };
// }
