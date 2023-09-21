import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";


export class CommentController extends BaseController{
    constructor(){
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('/:commentId', this.removeComment)
    }

    async createComment(req,res,next){
        try {
            let ticketBody = req.body
            ticketBody.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(ticketBody)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }


    async removeComment(req,res,next){
        try {
            
            const comment = await commentsService.removeComment(req.params.commentId, req.userInfo.id)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }



}