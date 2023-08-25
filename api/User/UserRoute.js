import UserController from "./UserController.js";

export default function userRoute(router){
    const userController = new UserController()

    router.route('/signup').post(userController.insertUser)
    router.route('/users').get(userController.getAllUsers)
}