import { AppState } from "../AppState"
import { EventComment } from "../models/EventComment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
EventComment



class CommentsService{

    async createComment(commentData){
        const res = await api.post('api/comments', commentData)
        logger.log('creating comment', res.data)
        const newComment = new EventComment(res.data)
        AppState.eventComments.push(newComment)
    }
    

    async getCommentByEvent(eventId){
        const res= await api.get(`api/events/${eventId}/comments`)
        logger.log('getting comments by eventID',res.data)
        AppState.eventComments = res.data

    }

    async removeComments(id){
        const res = await api.delete(`api/comments/${id}`)
        logger.log('deleting comment', res.data)
       
        let indexRemove = AppState.eventComments.findIndex(c => c.id == id)
        AppState.eventComments.splice(indexRemove,1)
    }

   
}


export const commentsService = new CommentsService()