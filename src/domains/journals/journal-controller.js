import { createdResponse, successResponse } from "../../utils/response.js";

import journalService from "./journal-service.js";


class JournalController {
    async create(req, res){
        const {title, content} = req.body;
        const userId = req.user.user_id;
        const journal = await journalService.create({title, content, userId});
        if(!journal){
            throw Error("Failed create journal")
        }
        return createdResponse(res, journal);
    }

    async show(req, res){
        const journal_id  =  parseInt(req.params.journal_id);
        const user_id = req.user.user_id

        
        const journal = await journalService.getById(user_id, journal_id);
        
        if(!journal){
            throw Error("failed to get journal")
        }
        return successResponse(res, journal)
    }
    
    async index(req, res){
        const user_id = req.user.user_id
        const {page=1, limit=10, timeframe} = req.query;
        
        const offset = (page-1)*limit;
        const journal = await journalService.getAll(user_id, timeframe, {offset, limit});

        if(!journal){
            throw Error("Failed to get journal")
        }
        return successResponse(res, journal);
    }
    
    async update(req, res){
        const journal_id  =  parseInt(req.params.journal_id);
        const {title, content} = req.body;
        const journal = await journalService.update({title, content}, journal_id)
        if(!journal){
            throw Error("Failed update journal")
        }
        return successResponse(res, journal);
    }
    
    async delete(req, res){
        const journal_id  =  parseInt(req.params.journal_id);
        const {user_id} = req.user;
        
        const journal = await journalService.delete(journal_id, user_id);
        if(!journal){
            throw Error("Failed delete journal")
        }
        return successResponse(res, journal);
    }

    async getAllDataJournal(req, res){
        const {timeframe = "week"} = req.query;
        const journal = await journalService.getAllDataJournal(timeframe);
        if(!journal){
            throw Error("Failed to get journal data")
        }
        return successResponse(res, journal);
    }

    async getJournalStats(req, res){
        const {timeframe = "week"} = req.query;
        const {user_id} = req.user;
        const stats = await journalService.getStatistics(user_id, timeframe);
        if(!stats){
            throw Error("Failed to get journal statistics")
        }
        return successResponse(res, stats);
    }

    async getMoodStats(req, res){
        const {timeframe = "week"} = req.query;
        const {user_id} = req.user;
        const stats = await journalService.getMoodByTimeframe(user_id, timeframe);
        if(!stats){
            throw Error("Failed to get journal mood statistics")
        }
        return successResponse(res, stats);
    }
}

export default new JournalController();