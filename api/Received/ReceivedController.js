import httpStatus from "http-status";
import generateJsonResponse from "../../helper/response.js";

import ReceivedDao from "./ReceivedDao.js";

export default class ReceivedController {
  receivedDao = new ReceivedDao();

  insertReceived = async (req, res) => {
    try {
      const {
        partyId,
        agentId,
        receivedDate,
        fabricsDetails,
        subTotal,
        discount,
        paymentCharges,
        total,
      } = req.body;
      if (
        !partyId &&
        !receivedDate &&
        !subTotal &&
        !discount &&
        !paymentCharges &&
        !total
      ) {
        return res.status(400).json({ error: "All fields are required" });
      } else {
        const fabrics = await this.receivedDao.insertFabrics(fabricsDetails);
        const part = receivedDate.split("-");
        const myDate = new Date(part[0], part[1] - 1, part[2]);
        let value = {
          partyId,
          agentId,
          receivedDate,
          subTotal,
          discount,
          paymentCharges,
          total,
          fabricsId: [],
        };

        fabrics?.length &&
          fabrics.map((item) => value.fabricsId.push(item?._id));

        const receivedData = await this.receivedDao.insertReceived(value);
        return res
          .status(201)
          .json({ message: "Record inserted .", receivedData });
      }
    } catch (err) {
      return res.status(500).json({ error: "Internal server error...", err });
    }
  };

  getAllReceived = async (req, res) => {
    try {
      const received = await this.receivedDao.getAllReceived();
      return res.status(200).json({ received });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error..." });
    }
  };

  getReceivedById = async (req, res) => {
    try {
      const received = await this.receivedDao.getReceivedById(
        req.params.id,
        req.body
      );
      return res.status(200).json(received);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error..." });
    }
  };

  // updateReceived = async (req, res) => {
  //   try {
  //     const {
  //       partyId,
  //       agentId,
  //       receivedDate,
  //       fabricDetails,
  //       subTotal,
  //       discount,
  //       paymentCharges,
  //       total,
  //     } = req.body;
  //     let detailsId = [];
  //     let flag = false;

  //     if (
  //       (!partyId &&
  //         !receivedDate &&
  //         !subTotal &&
  //         !discount &&
  //         !paymentCharges &&
  //         !total &&
  //         !Array.isArray(fabricDetails)) ||
  //       !fabricDetails?.length
  //     ) {
  //       return res.status(400).json({ error: "All fields are required." });
  //     }
  //     for (const fabric of fabricDetails) {
  //       if (
  //         !fabric._id ||
  //         !fabric.fabricType ||
  //         !fabric.designNo ||
  //         !fabric.lotQty ||
  //         !fabric.qtyInLot ||
  //         !fabric.perPiecePrice ||
  //         !fabric.total
  //       ) {
  //         return res.status(400).json({
  //           error: "Each fabric details must have required.",
  //         });
  //       }
  //       detailsId.push(fabric._id);
  //     }

  //     const exist = await this.receivedDao.getReceivedById(req.params.id);
  //     if (!exist) {
  //       return res.status(400).json({ error: "Received is not exist." });
  //     } else {
  //       exist.fabricsId?.length &&
  //         exist.fabricsId.map((item) => {
  //           if (!detailsId.includes(item?._id.valueOf())) {
  //             flag = true;
  //             return res
  //               .status(400)
  //               .json({ error: "Received fabric details id is not exist." });
  //           }
  //         });
  //     }

  //     if (!flag) {
  //       const received = await this.receivedDao.updateReceived(
  //         req.params.id,
  //         req.body
  //       );
  //       return res
  //         .status(200)
  //         .json({ message: "Update successful.", received });
  //     }
  //   } catch (err) {
  //     return res.status(500).json({ error: "Internal server error..." });
  //   }
  // };

  updateReceived = async (req, res) => {
    try {
      const {
        partyId,
        agentId,
        receivedDate,
        fabricDetails,
        subTotal,
        discount,
        paymentCharges,
        total,
      } = req.body;
      let detailsId = [];
      let flag = false;

      if (
        (!partyId &&
          !receivedDate &&
          !subTotal &&
          !discount &&
          !paymentCharges &&
          !total &&
          !Array.isArray(fabricDetails)) ||
        !fabricDetails?.length
      ) {
        return res.status(400).json({ error: "All fields are required." });
      }
      for (const fabric of fabricDetails) {
        if (
          !fabric._id ||
          !fabric.fabricType ||
          !fabric.designNo ||
          !fabric.lotQty ||
          !fabric.qtyInLot ||
          !fabric.perPiecePrice ||
          !fabric.total
        ) {
          return res.status(400).json({
            error: "Each fabric details must have required.",
          });
        }
        detailsId.push(fabric._id);
      }

      const exist = await this.receivedDao.getReceivedById(req.params.id);
      if (!exist) {
        return res.status(400).json({ error: "Received is not exist." });
      } else {
        exist.fabricsId?.length &&
          exist.fabricsId.map((item) => {
            if (!detailsId.includes(item?._id.valueOf())) {
              flag = true;
              return res
                .status(400)
                .json({ error: "Received fabric details id is not exist." });
            }
          });
      }

      if (!flag) {
        const received = await this.receivedDao.updateReceived(
          req.params.id,
          req.body
        );
        return res
          .status(200)
          .json({ message: "Update successful.", received });
      }
    } catch (err) {
      return res.status(500).json({ error: "Internal server error..." });
    }
  };

}
