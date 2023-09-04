import PartyDao from "./PartyDao.js";

export default class PartyController {
  partyDao = new PartyDao();

  insertParty = async (req, res) => {
    try {
      const { name, contact, } = req.body;
      if (!name && !contact) {
        return res
          .status(400)
          .json({ message: "Please fill all required fields." });
      } else {
        const parties = await this.partyDao.getAllParty();
        const existParty = parties.find((item) => item?.name === name);
        if (existParty) {
          return res.status(401).json({ message: "Party is already exist." });
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
      const parties = await this.partyDao.getAllParty();
      return res.status(200).json(parties);
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
}
