import express from "express"
import userRoute from "./api/User/UserRoute.js"
import authRoute from "./api/Auth/AuthRoute.js"
import partyRoute from "./api/Party/PartyRoute.js"

export default function setRoute (app){

    const router = express.Router()

    userRoute(router)
    authRoute(router)
    partyRoute(router)

    app.use('/api', router)
}