import agentSchema from "./AgentSchema.js";

export const insertAgentDao = (data) => {
  return agentSchema(data).save();
};

export const getAllAgentDao = ({ page, perPage, sortObj, search }) => {
  console.log("search:", search)
  return agentSchema
    .find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort(sortObj)
    .populate("partyId", { name: 1 });
};

export const getAgentListDao = () => {
  return agentSchema.find({});
};

export const getAgentByIdDao =(id)=>{
  return agentSchema.find({_id:id})
}

export const getAgentByPartyDao =(id)=>{
  return agentSchema.find({partyId:id})
}


// import agentSchema from "./AgentSchema.js";

// export default class AgentDao {
//   model = agentSchema;

//   insertAgent = (agentData) => {
//     return new this.model(agentData).save();
//   };

//   getAllAgent = ({ page, perPage, sortObj }) => {
//     return this.model
//       .aggregate([
//         {
//           $lookup: {
//             from: "parties",
//             localField: "partyId",
//             foreignField: "_id",
//             as: "partyId",
//           },
//         },
//         { $unwind: "$partyId" },
//         { $project: { partyId: { name: 1 }, name: 1, contact: 1, status: 1 } },
//       ])
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .sort(sortObj);
//   };

//   getAgentById = (agentId) => {
//     return this.model.findOne({ _id: agentId });
//   };

//   updateAgent = (agentId, partyData) => {
//     const { name, contact, partyId } = partyData;
//     return this.model.findOneAndUpdate(
//       { _id: agentId },
//       { name: name, contact: contact, partyId: partyId },
//       { new: true }
//     );
//   };

//   deleteAgent = (agentId) => {
//     return this.model.findOneAndDelete({ _id: agentId });
//   };

//   getAgentList = () => {
//     return this.model.find({}, { _id: 1, name: 1, contact: 1 });
//   };

//   getAgentByParty = (partyId) => {
//     return this.model.aggregate([
//       { $match: { $expr: { $eq: ["$partyId", { $toObjectId: partyId }] } } },
//       {
//         $lookup: {
//           from: "parties",
//           localField: "partyId",
//           foreignField: "_id",
//           as: "partyId",
//         },
//       },
//       { $unwind: "$partyId" },
//       { $project: { partyId: { name: 1 }, name: 1, contact: 1, status: 1 } },
//     ]);
//   };

//   updateStatus = (agentId, status) => {
//     return this.model.findOneAndUpdate({ _id: agentId }, { status });
//   };
// }
