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






}

export const eventsService = new EventsService()