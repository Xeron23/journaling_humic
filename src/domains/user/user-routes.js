import userController from "./user-controller.js";

import tryCatch from "../../utils/tryCatcher.js";
import authTokenMiddleware from "../../middlewares/auth-token-middleware.js";
import BaseRoutes from "../../base_classes/base-route.js";

class UserRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [
            authTokenMiddleware.authenticate,
            authTokenMiddleware.authorizeUser(["admin"]),
            tryCatch(userController.getAllUsers)
        ]);
    }
}

export default new UserRoutes().router;