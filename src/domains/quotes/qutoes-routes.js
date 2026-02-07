import BaseError from "../../base_classes/base-error.js";

import quotesController from "./quotes-controller.js";

import tryCatch from "../../utils/tryCatcher.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";

import AuthMiddleware from "../../middlewares/auth-token-middleware.js"
import BaseRoutes from "../../base_classes/base-route.js";
import { createQuoteLogSchema, quoteGetAll, quoteRecomendation, quoteSchema } from "./quotes-schema.js";

class QuoteRoutes extends BaseRoutes{
    routes(){
            this.router.post("/log", [
                AuthMiddleware.authenticate,
                validateCredentials(createQuoteLogSchema),
                tryCatch(quotesController.createLog)
            ]);
            this.router.get("/", [
                AuthMiddleware.authenticate,
                validateCredentials(quoteGetAll, 'query'),
                tryCatch(quotesController.show)
            ]);
            this.router.get("/recomendation", [
                AuthMiddleware.authenticate,
                validateCredentials(quoteRecomendation, 'query'),
                tryCatch(quotesController.recomendation)
            ]);
            this.router.get("/:quoteId", [
                AuthMiddleware.authenticate,
                validateCredentials(quoteSchema, "params"),
                tryCatch(quotesController.index)
            ]);
    }
}

export default new QuoteRoutes().router;