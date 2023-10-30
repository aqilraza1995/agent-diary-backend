import ReceivedController from "./ReceivedController.js";
import auth from "../../middleware/auth.js";

export default function receivedRoute(router) {
  const receivedController = new ReceivedController();

  router.route("/add-received").post(auth, receivedController.insertReceived);
  router.route("/received").get(auth, receivedController.getAllReceived);
  router.route("/received/:id").get(auth, receivedController.getReceivedById);
  router.route("/update-received/:id").put(auth, receivedController.updateReceived);
  // router.route("/received/:id/fabrics/:demo").get(auth, receivedController.getReceivedById);
}
