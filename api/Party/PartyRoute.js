import PartyController from "./PartyController.js";
import auth from "../../middleware/auth.js";

export default function partyRoute(router) {
  const partyController = new PartyController();

  router.route("/add-party").post(auth, partyController.insertParty);
  router.route("/parties").get(auth, partyController.getAllParties);
  router.route("/party/:id").get(auth, partyController.getPartyById);
  router.route("/party-list").get(auth, partyController.getPartyList);
  router.route("/update-party/:id").put(auth, partyController.updateParty);
  router.route("/delete-party/:id").delete(auth, partyController.deleteParty);
  router.route("/update-party-status/:id").put(auth, partyController.updateStatus);
}
