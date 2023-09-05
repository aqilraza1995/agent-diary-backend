import httpStatus from "http-status";
import generateJsonResponse from "../../helper/response.js";
import AgentDao from "./AgentDao.js";

export default class AgentController {
  agentDao = new AgentDao();

  insertAgent = async (req, res) => {
    try {
      const { name, contact, partyId } = req.body;
      if (!name && !contact ) {
        return res
          .status(400)
          .json({ message: "Please fill all required fields." });
      } else {
        const agents = await this.agentDao.getAllAgent();
        const existAgent = agents.find((item) => item?.contact === contact);
        if (existAgent) {
          return res.status(401).json({ message: "Agent is already exist." });
        } else {
          const agent = await this.agentDao.insertAgent(req.body);
          return res.status(201).json({ message: "Agent inserted.", agent });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  getAllAgent = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;

      const agents = await this.agentDao.getAllAgent();
      const response = generateJsonResponse(
        { agents, total: agents?.length, perPage, page },
        httpStatus.OK,
      );

      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  getAgentById = async (req, res) => {
    try {
      const agentDetail = await this.agentDao.getAgentById(
        req.params.id,
        req.body
      );
      return res.status(200).json(agentDetail);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  updateParty = async (req, res) => {
    try {
      const { name, contact, partyId } = req.body;
      if (!name && !contact ) {
        return res
          .status(400)
          .json({ message: "Please fill all required fields." });
      } else {
        const agents = await this.agentDao.getAllAgent();
        const existAgent = agents.find((item) => item?.contact === contact);
        if (existAgent) {
          return res
            .status(400)
            .json({ message: "Contact number is already exist." });
        } else {
          const agent = await this.agentDao.updateAgent(
            req.params.id,
            req.body
          );
          return res.status(200).json({ message: "Agent updated.", agent });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  deleteAgent = async (req, res) => {
    try {
      const agent = await this.agentDao.deleteAgent(req.params.id);
      return res.status(200).json({ message: "Agent deleted.", agent });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

}