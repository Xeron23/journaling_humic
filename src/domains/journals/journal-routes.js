import BaseRoutes from "../../base_classes/base-route.js";

import journalController from "./journal-controller.js";

import tryCatch from "../../utils/tryCatcher.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";
import { journalSchema, createJournalSchema, updateJournalSchema, getJournalStatsSchema } from "./journal-schema.js";
import authTokenMiddleware from "../../middlewares/auth-token-middleware.js";

class JournalRoutes extends BaseRoutes {
    routes(){
        this.router.post("/", [
            authTokenMiddleware.authenticate,
            validateCredentials(createJournalSchema),
            tryCatch(journalController.create)
        ]);
        this.router.get("/", [
            authTokenMiddleware.authenticate,
            tryCatch(journalController.index)
        ]);
        this.router.get("/admin/data", [
            authTokenMiddleware.authenticate,
            authTokenMiddleware.authorizeUser(["admin"]),
            validateCredentials(getJournalStatsSchema, "query"),
            tryCatch(journalController.getAllDataJournal)
        ]);
        this.router.get("/mood-stats", [
            authTokenMiddleware.authenticate,
            validateCredentials(getJournalStatsSchema, "query"),
            tryCatch(journalController.getMoodStats)
        ]);
        this.router.get("/stats", [
            authTokenMiddleware.authenticate,
            validateCredentials(getJournalStatsSchema, "query"),
            tryCatch(journalController.getJournalStats)
        ]);
        this.router.get("/:journal_id", [
            authTokenMiddleware.authenticate,
            validateCredentials(journalSchema, "params"),
            tryCatch(journalController.show)
        ]);
        this.router.delete("/:journal_id", [
            authTokenMiddleware.authenticate,
            validateCredentials(journalSchema, "params"),
            tryCatch(journalController.delete)
            
        ]);
        this.router.put("/:journal_id", [
            authTokenMiddleware.authenticate,
            validateCredentials(journalSchema, "params"),
            validateCredentials(updateJournalSchema),
            tryCatch(journalController.update)
        ]);
        this.router.get("/history/all", [
            authTokenMiddleware.authenticate,
            authTokenMiddleware.authorizeUser(["admin"]),
            validateCredentials(getJournalStatsSchema, "query"),
            tryCatch(journalController.getHistoryJournal)
        ]);
    }
}

export default new JournalRoutes().router;

