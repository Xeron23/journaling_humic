import userService from "./user-service.js";
import { successResponse } from "../../utils/response.js";

class UserController {
    async getAllUsers(req, res){
        const users =  await userService.getAllUser();
        return successResponse(res, users);
    }
}

export default new UserController();