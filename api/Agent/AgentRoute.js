import auth from "../../middleware/auth.js";
import {
  insertAgent,
  getAllAgent,
  getAgentList,
  getAgentById,
  getAgentByParty,
  updateAgent,
  deleteAgent,
  updateAgentStatus,
} from "./AgentController.js";

export default function agentRoute(router) {
  router.route("/add-agent").post(insertAgent);
  router.route("/agents").get(getAllAgent);
  router.route("/agent-list").get(getAgentList);
  router.route("/agent/:id").get(getAgentById);
  router.route("/agent-by-party/:id").get(getAgentByParty);
  router.route("/update-agent/:id").put(updateAgent);
  router.route("/delete-agent/:id").delete(deleteAgent);
  router.route("/update-agent-status/:id").patch(updateAgentStatus);
}
