import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";



export class EventsController extends BaseController{
    constructor(){
        super('api/events')
        this.router
        .get('', this.getEvents)
        .get('/:eventId', this.getEventById)
        .get('/:id/tickets', this.getEventTickets)
        .get('/:eventId/comments', this.getComments)
        .use(Auth0Provider.getAuthorizedUserInfo)  //NOTE USE
        .post('', this.createEvent)
        .put('/:eventId', this.editEvent)
        .delete('/:eventId', this.cancelEvent)
    }

    async createEvent(req, res, next){
        try {
            let eventBody = req.body
            eventBody.creatorId = req.userInfo.id
            const event = await eventsService.createEvent(eventBody)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }




    async getEvents(req, res, next){
        try {
            const events = await eventsService.getEvents(req.query)
            res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next){
        try {
            const event = await eventsService.getEventById(req.params.eventId)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next){
        try {
            const updates = req.body
            const eventId = req.params.eventId
            const event = await eventsService.editEvent(eventId,updates,req.userInfo.id)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req,res,next){
        try {
            const tickets = await ticketsService.getEventTickets(req.params.id)
            res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getComments(req, res, next){
        try {
            const comment = await commentsService.getComments(req.params.eventId)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req,res,next){
        try {
            const event = await eventsService.cancelEvent(req.params.eventId, req.userInfo.id)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }



}