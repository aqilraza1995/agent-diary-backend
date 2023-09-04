import userDao from "./UserDao.js";

export default class UserController {
  userDao = new userDao();

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
      const users = await this.userDao.getAllUsers();
      console.log("ENV variable == :", process.env.TOKEN_KEY);
      return res.status(200).json(users);
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
