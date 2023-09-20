import { dbContext } from "../db/DbContext.js"



class TicketsService{
   
    async createTicket(ticketBody) {
        const ticket = (await dbContext.Tickets.create(ticketBody))
        await ticket.populate('event')
        await ticket.populate('profile','-email')
        return ticket
    }



     async getMyEvents(userId) {
        const myEvents = await dbContext.Tickets.find({accountId: userId}).populate({path: 'event', populate: {path: 'creator ticketCount', select: '-email'}})
        return myEvents
    }

}


export const ticketsService = new TicketsService()