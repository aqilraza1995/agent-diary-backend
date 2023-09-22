import PartyDao from "./PartyDao.js";
import AgentDao from "../Agent/AgentDao.js";
import generateJsonResponse from "../../helper/response.js";
import httpStatus from "http-status";

export default class PartyController {
  partyDao = new PartyDao();
  agentDao = new AgentDao();

  insertParty = async (req, res) => {
    try {
      const { name, contact, address } = req.body;
      if (!name && !contact && !address) {
        return res
          .status(400)
          .json({ message: "Please insert all fields are required." });
      } else {
        const parties = await this.partyDao.getPartyList();
        const existParty = parties.find((item) => item?.contact === contact);
        if (existParty) {
          return res.status(400).json({ message: "Party is already exist." });
        } else {
          const party = await this.partyDao.insertParty(req.body);
          return res.status(201).json({ message: "Party inserted.", party });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  getAllParties = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const orderBy = req.query.orderBy;
      const order = req.query.order;
      const search = req.query.search;
      let sortObj = {};
      sortObj[orderBy] = order === "asc" ? 1 : -1;

      const parties = await this.partyDao.getAllParty({
        page,
        perPage,
        sortObj,
        search,
      });
      const response = generateJsonResponse(
        { parties, total: parties?.length, perPage, page },
        httpStatus.OK
      );

      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  getPartyById = async (req, res) => {
    try {
      const partyDetail = await this.partyDao.getPartyById(
        req.params.id,
        req.body
      );
      return res.status(200).json(partyDetail);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  getPartyList = async (req, res) => {
    try {
      const parties = await this.partyDao.getPartyList();
      const response = generateJsonResponse({ parties }, httpStatus.OK);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error...", err });
    }
  };

  updateParty = async (req, res) => {
    try {
      const { name, contact } = req.body;
      const id = req.params.id;
      if (!name && !contact) {
        return res
          .status(400)
          .json({ message: "Please fill all required fields." });
      } else {
        const parties = await this.partyDao.getPartyList();
        const existParty = parties.find(
          (item) => item?.contact === contact && item?._id.valueOf() !== id
        );
        if (existParty) {
          return res
            .status(400)
            .json({ message: "Contact number is already exist." });
        } else {
          const party = await this.partyDao.updateParty(
            req.params.id,
            req.body
          );
          return res.status(200).json({ message: "Party updated.", party });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  deleteParty = async (req, res) => {
    try {
      const agents = await this.agentDao.getAgentByParty(
        req.params.id,
        req.body
      );
      if (agents?.length) {
        return res.status(400).json({
          message: "You can't delete this party cause of its child exist.",
        });
      } else {
        const party = await this.partyDao.deleteParty(req.params.id);
        return res.status(200).json({ message: "Party deleted." });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  updateStatus = async (req, res) => {
    try {
      await this.partyDao.updateStatus(req.params.id, req.body.status);
      return res.status(200).json({ message: "Status updated." });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };
}
