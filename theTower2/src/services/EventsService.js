import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class EventsService{
    
    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        await event.populate('creator ticketCount')
        return event
    }
    async getEvents(query) {
        const events = await dbContext.Events.find(query).sort('-startAt').populate('creator ticketCount')
        return events
    }
    
   async getEventById(eventId) {
    const event = (await dbContext.Events.findById(eventId)).populate('creator ticketCount')
    if(!event){
        throw new BadRequest(`no event at id :${eventId}`)
    }
    return event
} 


    async editEvent(eventId, updates) {
        const originalEvent = await dbContext.Events.findById(eventId)
        if(!originalEvent) throw new Error(`unable to find event at ${eventId}`)

        originalEvent.name = updates.name || originalEvent.name
        originalEvent.description = updates.description || originalEvent.description
        originalEvent.coverImg = updates.coverImg || originalEvent.coverImg
        originalEvent.location = updates.location || originalEvent.location
        originalEvent.capacity = updates.capacity || originalEvent.capacity
        originalEvent.startDate = updates.startDate || originalEvent.startDate
        originalEvent.type = updates.type || originalEvent.type
        
        

        await originalEvent.save()
        return originalEvent
       
    }



}




export const eventsService = new EventsService()