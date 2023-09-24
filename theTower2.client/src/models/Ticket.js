import { TowerEvent } from "./TowerEvent"


export class Ticket{
    constructor(data){
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.profile = data.profile
        this.event = data.event ? new TowerEvent(data.event) : null
        this.isAttending = data.isAttending
    
    }
}