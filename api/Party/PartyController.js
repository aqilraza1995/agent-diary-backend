import httpStatus from "http-status";
import partyValidationSchema from "./JoiValidation.js";
import generateJsonResponse from "../../helper/response.js";
import {
  insertPartyDao,
  getAllPartyDao,
  getPartyListDao,
  getPartyByIdDao,
  updatePartyDao,
  deletePartyDao,
  updatePartyStatusDao,
} from "./PartyDao.js";
import { getAgentByPartyDao } from "../Agent/AgentDao.js";

export const insertParty = async (req, res) => {
  try {
    const { error } = partyValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      const partyList = await getPartyListDao();
      const exist =
        partyList?.length &&
        partyList.find((item) => item?.contact === req.body.contact);
      if (exist) {
        return res.status(400).json({ error: "Party is already exist" });
      } else {
        const party = await insertPartyDao(req.body);
        return res.status(201).json({ message: "record inserted :", party });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const getAllParty = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const order = req.query.order;
    const orderBy = req.query.orderBy;
    let sortObj = {};
    sortObj[orderBy] = order === "asc" ? 1 : -1;
    const search = req.query.search;
    const parties = await getAllPartyDao({ page, perPage, sortObj, search });
    const response = generateJsonResponse(
      { parties, total: parties?.length, perPage, page },
      httpStatus.OK
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const getPartyList = async (req, res) => {
  try {
    const parties = await getPartyListDao();
    return res.status(200).json(parties);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const getPartyById = async (req, res) => {
  try {
    const party = await getPartyByIdDao(req.params.id, req.body);
    return res.status(200).json(party);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const partyUpdate = async (req, res) => {
  try {
    const { error } = partyValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      const partyList = await getPartyListDao();
      const exist =
        partyList?.length &&
        partyList.find(
          (item) =>
            item?.contact === req.body.contact && item?._id.valueOf() !== id
        );
      if (exist) {
        return res.status(400).json({ error: "Party is already exist" });
      } else {
        const party = await updatePartyDao(req.params.id, req.body);
        return res.status(200).json({ message: "record updated :", party });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const deleteParty = async (req, res) => {
  try {
    const agent = await getAgentByPartyDao(req.params.id, req.body);
    if (agent.length) {
      return res
        .status(400)
        .json({ error: "This party's agent is exist you can't delete it" });
    } else {
      await deletePartyDao(req.params.id);
      return res.status(200).json({ message: "record deleted" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};

export const updatePartyStatus = async (req, res) => {
  try {
    const data = await updatePartyStatusDao(req.params.id, req.body.status);
    return res.status(200).json({ message: "Status updated", data });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error..." });
  }
};
