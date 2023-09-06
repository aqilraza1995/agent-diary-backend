import AuthController from "./AuthController.js";
// import auth from "../../middleware/auth.js";

export default function authRoute(router) {
  const authController = new AuthController();

  router.route("/sign-in").post(authController.signIn);
  router.route("/forget-password").post(authController.forgetPassword);
}
