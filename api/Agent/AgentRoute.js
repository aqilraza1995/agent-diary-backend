import AgentController from "./AgentController.js";
import auth from "../../middleware/auth.js";

export default function agentRoute(router){
    const agentController = new AgentController()

    router.route('/add-agent').post(auth, agentController.insertAgent)
    router.route('/agents').get(auth, agentController.getAllAgent)
    router.route('/agent-list').get(auth, agentController.getAgentList)
    router.route('/agent/:id').get(auth, agentController.getAgentById)
    router.route('/agent-by-party/:id').get(auth, agentController.getAgentByParty)
    router.route('/update-agent/:id').put(auth, agentController.updateParty)
    router.route('/delete-agent/:id').delete(auth, agentController.deleteAgent)
}