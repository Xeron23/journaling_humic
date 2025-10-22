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
        const journal = await journalService.getAll(user_id);
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
}

export default new JournalController();