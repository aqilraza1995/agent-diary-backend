import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import corse from "cors";
import dotenv from 'dotenv'

import setRoute from "./route.js";

dotenv.config();
const app = express();
const port = 8000;
app.use(corse());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/agent-diary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
        setRoute(app)
      console.log(`Listing on port : ${port}`);
    });
  });
