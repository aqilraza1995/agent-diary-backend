import auth from "../../middleware/auth.js";
import { insertAgent, getAllAgent, getAgentList, getAgentById, getAgentByParty } from "./AgentController.js";

export default function agentRoute(router) {
  router.route("/add-agent").post(insertAgent);
  router.route("/agents").get(getAllAgent);
  router.route("/agent-list").get(getAgentList);
  router.route("/agent/:id").get(getAgentById);
  router.route("/agent-by-party/:id").get(getAgentByParty);
 
  // router.route('/update-agent/:id').put(auth, agentController.updateParty)
  // router.route('/delete-agent/:id').delete(auth, agentController.deleteAgent)
  // router.route("/update-agent-status/:id").put(auth, agentController.updateStatus);
}

// import AgentController from "./AgentController.js";
// import auth from "../../middleware/auth.js";

// export default function agentRoute(router){
//     const agentController = new AgentController()

//     router.route('/add-agent').post(auth, agentController.insertAgent)
//     router.route('/agents').get(auth, agentController.getAllAgent)
//     router.route('/agent-list').get(auth, agentController.getAgentList)
//     router.route('/agent/:id').get(auth, agentController.getAgentById)
//     router.route('/agent-by-party/:id').get(auth, agentController.getAgentByParty)
//     router.route('/update-agent/:id').put(auth, agentController.updateParty)
//     router.route('/delete-agent/:id').delete(auth, agentController.deleteAgent)
//     router.route("/update-agent-status/:id").put(auth, agentController.updateStatus);
// }
