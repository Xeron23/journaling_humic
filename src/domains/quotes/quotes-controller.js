import { createdResponse, successResponse } from "../../utils/response.js";
import quotesService from "./quotes-service.js";


class QuoteController {
    async createLog(req, res){
        const userId = req.user.user_id;
        const {action='click', quoteId}= req.body;
        const quote = await quotesService.quoteLog({userId, quoteId, action});
        if(!quote){
            throw Error("failed to creae quote log");
        }
        return createdResponse(res, quote);
    }
    // {offset, limit, category}
    async show(req, res){
        const {page=1, limit=10, category=null, search_query}= req.query;
        const offset = (page-1)*limit;
        let quote;
        if(search_query){
            quote = await quotesService.search({offset, limit, search_query});
        }else {
            quote = await quotesService.getAllQuote({offset, limit, category});
        }
        return successResponse(res, quote);
    }

    async index(req, res){
        const {quoteId} = req.params;
        const id = parseInt(quoteId);
        const quote = await quotesService.getById(id);
        if(!quote){
            throw Error("Failed ot get quote");
        }
        return successResponse(res, quote)
    }
    
    async recomendation(req, res){
        const {category='JOY'} = req.query;
        const userId = req.user.user_id;
        const quote = await quotesService.recomendation({userId, category});
        if(!quote){
            throw Error("Failed ot get quote recomendation");
        }
         return successResponse(res, quote);
    }
}

export default new QuoteController();