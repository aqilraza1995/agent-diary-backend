import agentSchema from "./AgentSchema.js";

export default class AgentDao {
  model = agentSchema;

  insertAgent = (agentData) => {
    return new this.model(agentData).save();
  };

  getAllAgent = () => {
    return this.model.aggregate([
      {
        $lookup: {
          from: "parties",
          localField: "partyId",
          foreignField: "_id",
          as: "partyId",
        },
      },
      { $unwind: "$partyId" },
      { $project: { partyId: { name: 1 }, name: 1, contact: 1, status: 1 } },
    ]);
  };

  getAgentById = (agentId) => {
    return this.model.aggregate([
      { $match: { $expr: { $eq: ["$_id", { $toObjectId: agentId }] } } },
      {
        $lookup: {
          from: "parties",
          localField: "partyId",
          foreignField: "_id",
          as: "partyId",
        },
      },
      { $unwind: "$partyId" },
      { $project: { partyId: { name: 1 }, name: 1, contact: 1, status: 1 } },
    ]);
  };

  updateAgent = (agentId, partyData) => {
    const { name, contact, partyId } = partyData;
    return this.model.findOneAndUpdate(
      { _id: agentId },
      { name: name, contact: contact, partyId: partyId },
      { new: true }
    );
  };

  deleteAgent = (agentId) => {
    return this.model.findOneAndDelete({ _id: agentId });
  };

  getAgentByParty = (partyId) => {
    return this.model.aggregate([
      { $match: { $expr: { $eq: ["$partyId", { $toObjectId: partyId }] } } },
      {
        $lookup: {
          from: "parties",
          localField: "partyId",
          foreignField: "_id",
          as: "partyId",
        },
      },
      { $unwind: "$partyId" },
      { $project: { partyId: { name: 1 }, name: 1, contact: 1, status: 1 } },
    ]);
  };
}
