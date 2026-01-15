import prisma from "../../config/db.js";
import BaseError from "../../base_classes/base-error.js";


class UserService {
    async getAllUser(){
        const users = await prisma.user.findMany();
        return users;
    }
}

export default new UserService();