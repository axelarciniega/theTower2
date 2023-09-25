import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class TicketsService{


    async createTicket(data){
        const res = await api.post(`api/tickets`,data)
        logger.log('got ticket', res.data)
        AppState.tickets.push(new Ticket(res.data))
        logger.log(AppState.myTickets, 'my tickets that I have')
        AppState.activeEvent.capacity--

    }

    async returnTicket(ticketId){
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('-ticket', res.data)
        let indexRemove = AppState.tickets.findIndex(t => t.id == ticketId)
        AppState.tickets.splice(indexRemove,1)
        AppState.activeEvent.capacity++
    }



}

export const ticketsService = new TicketsService()