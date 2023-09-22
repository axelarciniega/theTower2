import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class TicketsService{


    async createTicket(data){
        const res = await api.post(`api/tickets`,data)
        logger.log('got ticket', res.data)
        AppState.myTickets.push(new Ticket(res.data))

    }

    async returnTicket(ticketId){
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('-ticket', res.data)
        let indexRemove = AppState.tickets.findIndex(t => t.id == ticketId)
        AppState.tickets.splice(indexRemove,1)
    }



}

export const ticketsService = new TicketsService()