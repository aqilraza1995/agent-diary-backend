import httpStatus from "http-status";
import generateJsonResponse from "../../helper/response.js";
import UserDao from "./UserDao.js";

export default class UserController {
  userDao = new UserDao();

  insertUser = async (req, res) => {
    try {
      const { name, contact, email, password } = req.body;
      if (!name && !contact && !email && !password) {
        return res
          .status(400)
          .json({ message: "Please fill all required fields." });
      } else {
        const users = await this.userDao.getAllUsers();
        const existUser = users.find((item) => item?.email === email);
        if (existUser) {
          return res.status(401).json({ message: "User is already exist." });
        } else {
          const user = await this.userDao.insertUser(req.body);
          return res.status(201).json({ message: "User inserted.", user });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const orderBy = req.query.orderBy;
      const order = req.query.order;
      let sortObj = {};
      sortObj[orderBy] = order === "asc" ? 1 : -1;

      const users = await this.userDao.getAllUsers({ page, perPage, sortObj });
      const response = generateJsonResponse(
        { users, total: users?.length, perPage, page },
        httpStatus.OK
      );
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };

  getUserById = async (req, res) => {
    try {
      const userDetail = await this.userDao.getUserById(
        req.params.id,
        req.body
      );
      return res.status(200).json(userDetail);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error..." });
    }
  };
}
