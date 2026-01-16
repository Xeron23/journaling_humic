import userService from "./user-service.js";
import { successResponse } from "../../utils/response.js";

class UserController {
    async getAllUsers(req, res){
        const {timeframe="week"} = req.query;
        const users =  await userService.getAllUser(timeframe);
        return successResponse(res, users);
    }
}

export default new UserController();