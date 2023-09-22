import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentsService{

    

    async getCommentByEvent(commentId){
        const res= await api.get(`api/events/${commentId}/comments`)
        logger.log(res.data)
        AppState.comments = res.data

    }

   
}


export const commentsService = new CommentsService()