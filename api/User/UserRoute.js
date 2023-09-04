import UserController from "./UserController.js";
import auth from "../../middleware/auth.js";

export default function userRoute(router){
    const userController = new UserController()

    router.route('/sign-up').post( userController.insertUser)
    router.route('/users').get(auth, userController.getAllUsers)
    router.route('/users/:id').get(auth, userController.getUserById)
}