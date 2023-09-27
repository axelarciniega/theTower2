import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class TicketsService{
   
    
    async createTicket(ticketBody) {
        const ticket = (await dbContext.Tickets.create(ticketBody))
        await ticket.populate('event')
        await ticket.populate('profile','-email')
        return ticket
    }

    

    async getMyTickets(userId) {
        const myTickets = await dbContext.Tickets.find({accountId: userId}).populate({path: 'event', populate: {path: 'creator ticketCount', select: '-email'}})
        return myTickets
    }

    async getEventTickets(eventId) {
        const ticket = await dbContext.Tickets.find({eventId: eventId})
        .populate('event profile')
        return ticket
    }


       async removeTicket(ticketId, userId) {
          const ticket = await dbContext.Tickets.findById(ticketId).populate('event')
          const event = await dbContext.Events.findById(ticket.eventId)
          if(userId != ticket.accountId){
            throw new Forbidden('Not yours!')
          }

        //   event.capacity++
        //   await event.save()
          await ticket.remove()

          

       }

        

}


export const ticketsService = new TicketsService()