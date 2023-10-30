// import auth from "../../middleware/auth.js";
import {
  insertParty,
  getAllParty,
  getPartyList,
  getPartyById,
  partyUpdate,
  updatePartyStatus,
  deleteParty,
} from "./PartyController.js";

export default function partyRoute(router) {
  // const partyController = new PartyController();

  router.route("/add-party").post(insertParty);
  router.route("/parties").get(getAllParty);
  router.route("/party").get(getPartyList);
  router.route("/party/:id").get(getPartyById);
  router.route("/update-party/:id").put(partyUpdate)
  router.route("/update-party-status/:id").patch(updatePartyStatus)
  router.route("/delete-party/:id").delete(deleteParty)

  // router.route("/party/:id").get(auth, partyController.getPartyById);
  // router.route("/party-list").get(auth, partyController.getPartyList);
  // router.route("/update-party/:id").put(auth, partyController.updateParty);
  // router.route("/delete-party/:id").delete(auth, partyController.deleteParty);
  // router.route("/update-party-status/:id").put(auth, partyController.updateStatus);
}

// import PartyController from "./PartyController.js";
// import auth from "../../middleware/auth.js";

// export default function partyRoute(router) {
//   const partyController = new PartyController();

//   router.route("/add-party").post(auth, partyController.insertParty);
//   router.route("/parties").get(auth, partyController.getAllParties);
//   router.route("/party/:id").get(auth, partyController.getPartyById);
//   router.route("/party-list").get(auth, partyController.getPartyList);
//   router.route("/update-party/:id").put(auth, partyController.updateParty);
//   router.route("/delete-party/:id").delete(auth, partyController.deleteParty);
//   router.route("/update-party-status/:id").put(auth, partyController.updateStatus);
// }
