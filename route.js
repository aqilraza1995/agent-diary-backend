import express from "express"
import userRoute from "./api/User/UserRoute.js"

export default function setRoute (app){

    const router = express.Router()

    userRoute(router)

    app.use('/api', router)
}