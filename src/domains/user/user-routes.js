import userController from "./user-controller.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";

import tryCatch from "../../utils/tryCatcher.js";
import authTokenMiddleware from "../../middlewares/auth-token-middleware.js";
import BaseRoutes from "../../base_classes/base-route.js";
import { userSchema } from "./user-schema.js";

class UserRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [
            authTokenMiddleware.authenticate,
            authTokenMiddleware.authorizeUser(["admin"]),
            validateCredentials(userSchema, 'query'),
            tryCatch(userController.getAllUsers)
        ]);
    }
}

export default new UserRoutes().router;