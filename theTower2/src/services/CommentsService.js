import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class CommentsService{
    
    async createComment(ticketBody) {
        const comment = await dbContext.Comment.create(ticketBody)
        await comment.populate('creator')
        return comment
    }
    
    async getComments(eventId) {
        const comment = await dbContext.Comment.find({eventId}).populate('creator event')
        return comment

        
    }

    async removeComment(commentId, userId) {
        const comment = await dbContext.Comment.findById(commentId).populate('creator')

        if(userId != comment.creatorId){
            throw new Forbidden('NOT yours')
        }
        
        comment.remove()

        
    }



}




export const commentsService = new CommentsService()