import express from "express"
import userRoute from "./api/User/UserRoute.js"
import authRoute from "./api/Auth/AuthRoute.js"
import partyRoute from "./api/Party/PartyRoute.js"
import agentRoute from "./api/Agent/AgentRoute.js"
import receivedRoute from "./api/Received/ReceivedRoute.js"

export default function setRoute (app){

    const router = express.Router()

    userRoute(router)
    authRoute(router)
    partyRoute(router)
    agentRoute(router)
    receivedRoute(router)

    app.use('/api', router)
}