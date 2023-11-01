import agentSchema from "./AgentSchema.js";

export const insertAgentDao = (data) => {
  return agentSchema(data).save();
};

export const getAllAgentDao = ({ page, perPage, sortObj, search }) => {
  console.log("search:", search);
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

export const getAgentByIdDao = (id) => {
  return agentSchema.find({ _id: id });
};

export const getAgentByPartyDao = (id) => {
  return agentSchema.find({ partyId: id });
};

export const updateAgentDao = (id, data) => {
  const { name, contact, partyId } = data;
  return agentSchema.findOneAndUpdate(
    { _id: id },
    { name, contact, partyId },
    { new: true }
  );
};

export const deleteAgentDao = (id) => {
  return agentSchema.findOneAndDelete({ _id: id });
};

export const updateAgentStatusDao = (id, status) => {
  return agentSchema.findOneAndUpdate({ _id: id }, { status }, { new: true });
};

