import AuthDao from "./AuthDao.js";
import bCrypt from "bcrypt";
import crypto from "crypto";

export default class AuthController {
  authDao = new AuthDao();

  signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email && !password) {
        return res
          .status(400)
          .json({ message: "Email and Password is Required" });
      } else {
        const user = await this.authDao.signIn(email);
        if (user?._id) {
          const isMatch = await bCrypt.compare(password, user?.password);
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
          } else {
            const token = user?.tokens
            return res.status(200).json({ message: "Login SuccessFull. : ", token});
          }
        } else {
          return res.status(400).json({ message: "Invalid email or password." });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await this.authDao.signIn(email);
      if (!user) {
        return res
          .status(404)
          .json({ message: "There is no user with that email." });
      } else {
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000;

        // const mailOption = {
        //     from:process.env
        // }

        return res.status(200).json({ message: "valid User " });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
