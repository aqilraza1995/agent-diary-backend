import PartyController from "./PartyController.js";
import auth from "../../middleware/auth.js";

export default function partyRoute(router) {
  const partyController = new PartyController();

  router.route("/add-party").post(auth, partyController.insertParty);
  router.route("/parties").get(auth, partyController.getAllParties);
  router.route("/party/:id").get(auth, partyController.getPartyById);
}
