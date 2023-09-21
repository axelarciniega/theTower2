import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"

import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class EventsService{

    async getEvents(){
        const res = await api.get('api/events')
        logger.log(res.data)
        AppState.towerEvents = res.data.map(event => new TowerEvent(event))
    }

    async getEventById(eventId){
        const res = await api.get(`api/events/${eventId}`)
        logger.log(res.data, 'got one event')
        AppState.activeEvent = new TowerEvent(res.data)

    }

    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        logger.log('creating event', res.data)
        const newEvent = new TowerEvent(res.data)
        AppState.towerEvents.unshift(newEvent)
        return newEvent
    }

    async cancelEvent(eventId){
        const res = await api.delete(`api/events/${eventId}`)
        logger.log('deleting', res.data)
        AppState.activeEvent.isCanceled = true
    }






}

export const eventsService = new EventsService()