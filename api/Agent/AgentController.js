import httpStatus from "http-status";

import generateJsonResponse from "../../helper/response.js";
import {
  insertAgentDao,
  getAllAgentDao,
  getAgentListDao,
  getAgentByIdDao,
  getAgentByPartyDao,
  updateAgentDao,
  deleteAgentDao,
  updateAgentStatusDao,
} from "./AgentDao.js";
import agentJoiValidation from "./AgentJoiValidation.js";

export const insertAgent = async (req, res) => {
  try {
    const { error } = agentJoiValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      const agent = await getAgentListDao();
      const exist =
        agent?.length &&
        agent.find((item) => item?.contact === req.body.contact);

      if (exist) {
        return res.status(400).json({ error: "Agent is already exist" });
      } else {
        const agentData = await insertAgentDao(req.body);
        return res
          .status(201)
          .json({ message: "Record inserted :", agentData });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const getAllAgent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const order = req.query.order;
    const orderBy = req.query.orderBy;
    const search = req.query.search;
    let sortObj = {};
    sortObj[orderBy] = order === "asc" ? 1 : -1;

    const agents = await getAllAgentDao({ page, perPage, search, sortObj });
    const response = generateJsonResponse(
      { agents, total: agents?.length, page, perPage },
      httpStatus.OK
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const getAgentList = async (req, res) => {
  try {
    const agents = await getAgentListDao();
    return res.status(200).json(agents);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const getAgentById = async (req, res) => {
  try {
    const agents = await getAgentByIdDao(req.params.id, req.body);
    return res.status(200).json(agents);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const getAgentByParty = async (req, res) => {
  try {
    const agents = await getAgentByPartyDao(req.params.id, req.body);
    return res.status(200).json(agents);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const updateAgent = async (req, res) => {
  try {
    const { error } = agentJoiValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      const agentList = await getAgentListDao();
      const exist =
        agentList?.length &&
        agentList.find(
          (item) =>
            item?.contact === req.body.contact && item?._id.valueOf() !== id
        );
      if (exist) {
        return res.status(400).json({ error: "Agent is already exist" });
      } else {
        const agent = await updateAgentDao(req.params.id, req.body);
        return res.status(200).json({ message: "record updated :", agent });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    await deleteAgentDao(req.params.id);
    return res.status(200).json({ message: "Agent is deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const updateAgentStatus = async (req, res) => {
  try {
    await updateAgentStatusDao(req.params.id, req.body.status);
    return res.status(200).json({ message: "Status updated" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};