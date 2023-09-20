import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class EventsService{
    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        await event.populate('creator')
        return event
    }
    async getEvents(query) {
        const events = await dbContext.Events.find(query).sort('-startAt').populate('creator')
        return events
    }
    
   async getEventById(eventId) {
    const event = (await dbContext.Events.findById(eventId)).populated('creator')
    if(!event){
        throw new BadRequest(`no event at id :${eventId}`)
    }
    return event
} 



}




export const eventsService = new EventsService()